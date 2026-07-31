import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AITutorProps {
  lessonTitle?: string;
  lessonContent?: string;
  taskDescription?: string;
  userCode?: string;
  deviceName?: string | null;
}

export default function AITutor({
  lessonTitle,
  lessonContent,
  taskDescription,
  userCode,
  deviceName,
}: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI tutor. Ask me questions about this lesson, request hints, or ask me to review your code. I'm here to help you learn!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!supabase) {
        throw new Error("Backend not configured");
      }
      const conversationHistory = messages.concat(userMessage);
      const { data, error } = await supabase.functions.invoke("tutor", {
        body: {
          messages: conversationHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: {
            lessonTitle,
            lessonContent,
            taskDescription,
            userCode,
            deviceName,
          },
        },
      });
      if (error) throw error;

      const content = (data as { content?: string } | null)?.content;
      if (!content) throw new Error("Empty response");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The AI tutor isn't connected yet. The rest of the app works fine — to enable me, deploy the Supabase Edge Function: run `npx supabase secrets set SAMBANOVA_API_KEY=...` and `npx supabase functions deploy tutor` in your project (full steps in supabase/functions/tutor/index.ts).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-cs-700">
      {/* Header */}
      <div className="px-4 py-3 bg-cs-800 border-b border-cs-700 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-accent-muted flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div>
          <span className="text-sm font-medium text-cs-100">AI Tutor</span>
          <p className="text-[10px] text-cs-400">Powered by SambaNova via Supabase</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cs-900/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-accent" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-md"
                  : "bg-cs-800 text-cs-200 rounded-bl-md border border-cs-700"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-cs-700 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-cs-400" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-cs-800 rounded-2xl rounded-bl-md px-4 py-3 border border-cs-700">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-cs-800 border-t border-cs-700">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question, get a hint, or request code review..."
            rows={1}
            className="flex-1 bg-cs-700 text-cs-100 placeholder:text-cs-500 text-sm rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
