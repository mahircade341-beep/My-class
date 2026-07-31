import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Code2,
  Brain,
  Trophy,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ChevronDown,
  BookOpen,
  Terminal,
  Zap,
} from "lucide-react";

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCodeLines() {
  const lines = [
    'const student = { name: "You", passion: "coding" };',
    'function learn(skill) { return mastery; }',
    "while (!graduate) { code(); learn(); }",
    'console.log("Hello, World! 👋");',
    "let success = practice(100); // => true",
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cs-700/50 bg-cs-800/40 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
        </div>
        <span className="text-xs text-cs-500 font-mono">welcome.js</span>
      </div>
      <div className="space-y-2.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
            className="font-mono text-sm"
          >
            <span className="text-cs-500 select-none">{`${i + 1}`.padStart(2, " ")}  </span>
            <span className="text-cs-300">{line}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute bottom-6 left-6 w-2.5 h-5 bg-accent/80 rounded-sm"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}

const features = [
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description: "Progress from absolute zero to advanced through carefully crafted levels with real-world projects.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Terminal,
    title: "Built-in Code Editor",
    description: "Write and run real JavaScript code directly in your browser with our Monaco-powered editor.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Brain,
    title: "AI Tutor",
    description: "Get instant help from our AI tutor. Ask questions, request code reviews, or get hints when you're stuck.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Trophy,
    title: "Certificates",
    description: "Earn printable certificates for each completed level to showcase your achievements.",
    color: "from-amber-500 to-orange-500",
  },
];

const levels = [
  { name: "Zero", desc: "Start from scratch", color: "#6366f1" },
  { name: "Beginner", desc: "Build foundations", color: "#22c55e" },
  { name: "Intermediate", desc: "Level up", color: "#f59e0b" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-cs-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

        {/* Animated code rain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[10px] font-mono text-cs-700/20"
              style={{ left: `${(i / 20) * 100}%` }}
              animate={{
                y: ["-100%", "100vh"],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            >
              {["{", "}", "=>", "()", "[]", "//", "/*", "*/", "&&", "||"][i % 10]}
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-bold text-cs-100">CodeSchool</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-muted border border-accent/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs text-accent font-medium">Free interactive coding platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cs-100 mb-6 tracking-tight"
          >
            Learn to Code
            <br />
            <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
              From Zero to Hero
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-cs-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Master software engineering through interactive lessons, real-time code execution,
            guided projects, and an AI tutor that's always there to help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/auth">
              <Button variant="primary" size="xl" className="animate-pulse-glow">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="secondary" size="xl">
                <GraduationCap className="w-5 h-5" />
                View Curriculum
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 sm:gap-16 flex-wrap"
          >
            {[
              { label: "Interactive Lessons", value: "12+" },
              { label: "Levels", value: "3" },
              { label: "AI-Powered", value: "✓" },
              { label: "Free Forever", value: "100%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-cs-100">{stat.value}</div>
                <div className="text-xs text-cs-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-cs-500" />
        </motion.div>
      </section>

      {/* Code Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted border border-accent/20 mb-4">
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs text-accent font-medium">Interactive Learning</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cs-100 mb-4">
                  Write Real Code,
                  <br />
                  <span className="text-accent">Get Instant Feedback</span>
                </h2>
                <p className="text-cs-400 leading-relaxed mb-6">
                  Every lesson includes a built-in code editor where you can write, run, and test
                  JavaScript code. No setup, no installations — just you, the editor, and your
                  growing skills.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["No setup required", "Real-time execution", "Sandboxed & safe", "Multiple languages"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-cs-800 text-cs-400 border border-cs-700"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
              <AnimatedCodeLines />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-cs-100 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-cs-400 max-w-2xl mx-auto">
                A complete learning platform designed to take you from complete beginner to confident developer.
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FadeInSection key={feature.title} delay={i * 0.1}>
                <div className="group relative p-6 rounded-2xl bg-cs-800/50 border border-cs-700/50 hover:border-cs-600/50 transition-all duration-300">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-cs-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-cs-400 leading-relaxed">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-cs-100 mb-4">Your Learning Path</h2>
              <p className="text-cs-400 max-w-2xl mx-auto">
                A carefully structured curriculum that builds on itself. Each level prepares you for the next.
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {levels.map((level, i) => (
              <FadeInSection key={level.name} delay={i * 0.1}>
                <div
                  className="relative p-6 rounded-2xl bg-cs-800/50 border border-cs-700/50 hover:border-cs-600/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: level.color }}
                    />
                    <div>
                      <span className="text-sm font-bold text-cs-100" style={{ color: level.color }}>
                        Level {i}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-cs-100 mb-1">{level.name}</h3>
                  <p className="text-sm text-cs-400">{level.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-cs-100 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-cs-400 mb-8 max-w-xl mx-auto">
              Join CodeSchool for free and start learning to code today. No credit card required.
            </p>
            <Link to="/auth">
              <Button variant="primary" size="xl" className="animate-pulse-glow">
                Get Started Free
                <Zap className="w-5 h-5" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cs-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-cs-400">CodeSchool</span>
          </div>
          <p className="text-xs text-cs-500">Built with ❤️ for learners everywhere</p>
        </div>
      </footer>
    </div>
  );
}
