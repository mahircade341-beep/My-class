// ============================================================
// CodeSchool AI Tutor — Supabase Edge Function
//
// Calls SambaNova's free Llama API. Your SAMBANOVA_API_KEY is
// stored as a Supabase secret and never exposed to the browser.
//
// Deploy once:
//   npx supabase login
//   npx supabase link --project-ref <your-project-ref>
//   npx supabase secrets set SAMBANOVA_API_KEY=sk-...
//   npx supabase functions deploy tutor
// ============================================================

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers":
    "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are an expert coding tutor for CodeSchool, an interactive learning platform. Your role is to help students learn programming concepts by:

1. Answering questions about the lesson material
2. Giving hints (not complete solutions) when students are stuck
3. Reviewing student code and providing constructive feedback
4. Explaining programming concepts clearly and simply

IMPORTANT RULES:
- NEVER write complete solutions for students - guide them to figure it out
- Ask leading questions to help students discover answers themselves
- Be encouraging and patient - the student is learning
- Explain concepts with simple analogies when helpful
- If the student asks about something outside the lesson, briefly answer and redirect to the topic at hand`;

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });

  try {
    const apiKey = Deno.env.get("SAMBANOVA_API_KEY");
    if (!apiKey) {
      return json({
        content:
          "The AI tutor is not configured yet. Set the SAMBANOVA_API_KEY secret on your Supabase project (see supabase/functions/tutor/index.ts).",
      });
    }

    const { messages, context } = await req.json();

    let system = SYSTEM_PROMPT;
    if (context?.lessonTitle) system += `\n\nCurrent Lesson: ${context.lessonTitle}`;
    if (context?.lessonContent) {
      system += `\n\nLesson Content:\n${String(context.lessonContent).slice(0, 2000)}`;
    }
    if (context?.taskDescription) system += `\n\nCurrent Task: ${context.taskDescription}`;
    if (context?.userCode) system += `\n\nStudent's Current Code:\n${context.userCode}`;
    if (context?.deviceName) {
      system += `\n\nThe student is learning on a ${context.deviceName} device. When giving setup instructions, terminal commands, or keyboard shortcuts, tailor them to that device (e.g. macOS Terminal/Homebrew, Windows PowerShell/WSL, Android Termux/Acode).`;
    }

    const res = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.3-70B-Instruct",
        messages: [
          { role: "system", content: system },
          ...(Array.isArray(messages) ? messages : []),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      console.error("SambaNova API error:", res.status, await res.text());
      return json({
        content:
          "Sorry, the AI service is having trouble right now. Please try again in a moment.",
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;

    return json({
      content: content ?? "Sorry, I received an empty response. Please try again.",
    });
  } catch (err) {
    console.error("tutor error:", err);
    return json({
      content: "Sorry, something went wrong with the AI tutor. Please try again.",
    });
  }
});
