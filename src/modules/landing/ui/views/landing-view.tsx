"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  SparklesIcon,
  VideoIcon,
  BrainIcon,
  MicIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  BarChart3Icon,
  MenuIcon,
  XIcon,
  QuoteIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────── NOISE GRAIN SVG (Subtle) ─────────────────────────── */
const GrainOverlay = () => (
  <svg className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.012] mix-blend-screen">
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.6"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

/* ─────────────────────────── GLOW ORB ─────────────────────────── */
const GlowOrb = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full blur-[150px] pointer-events-none ${className}`}
  />
);

/* ─────────────────────────── NAVBAR ─────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06090e]/60 backdrop-blur-2xl border-b border-white/[0.04] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4edea3] to-[#10b981] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow">
            <Image
              src="/logo.svg"
              alt="ConvoGenius"
              width={20}
              height={20}
              className="invert"
            />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Convo
            <span className="bg-gradient-to-r from-[#4edea3] to-[#10b981] bg-clip-text text-transparent">
              Genius
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-medium outline-none focus-visible:text-[#10b981]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in" className="outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-xl">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-xl text-sm font-medium cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" className="outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-xl">
            <Button className="bg-gradient-to-r from-[#10b981] to-[#0ea572] hover:opacity-90 text-white font-semibold rounded-xl px-5 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all text-sm cursor-pointer border border-[#10b981]/50">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 hover:bg-white/[0.04] rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XIcon className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#06090e]/95 backdrop-blur-xl border-t border-white/[0.04] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-slate-300 hover:text-white transition-colors py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/[0.04] space-y-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block">
                  <Button
                    variant="ghost"
                    className="w-full text-slate-300 hover:bg-white/[0.04] justify-start rounded-xl cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="block">
                  <Button className="w-full bg-[#10b981] hover:bg-[#0ea572] text-white font-semibold rounded-xl cursor-pointer">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ─────────────────────────── HERO (Text Centric) ─────────────────────────── */
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#06090e]" />
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#10b981]/[0.035] rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366f1]/[0.035] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full flex flex-col items-center justify-center flex-1">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1e293b]/40 backdrop-blur-md border border-white/5 text-[#10b981] text-sm font-semibold tracking-wide uppercase shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            AI-Powered Video Conferencing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.08] tracking-tight mb-8 max-w-5xl text-balance mx-auto"
        >
          <span className="text-white">Where AI Meets</span>
          <br />
          <span className="bg-gradient-to-r from-[#10b981] to-[#6366f1] bg-clip-text text-transparent">
            Every Conversation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-normal text-balance"
        >
          Transform your workflow with intelligent 1-on-1 video meetings. Your personal AI agent summarizes, advises, and tracks insights in real-time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-3xl mx-auto"
        >
          <Link href="/sign-up" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-2xl">
            <Button className="w-full sm:w-auto bg-[#10b981] hover:bg-[#0ea572] text-white font-bold rounded-2xl px-12 py-8 text-lg shadow-[0_4px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_40px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer">
              Start Free Trial
              <ArrowRightIcon className="w-6 h-6 ml-2" />
            </Button>
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-2xl">
             <Button variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-white/5 border-white/10 text-white font-semibold rounded-2xl px-10 py-8 text-lg transition-all cursor-pointer">
                See How It Works
             </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ─────────────────────────── SOCIAL PROOF / STATS ─────────────────────────── */
const SocialProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "10,000+", label: "Users Empowered" },
    { value: "2M+", label: "Meetings Analyzed" },
    { value: "99.9%", label: "Transcription Accuracy" },
    { value: "10x", label: "Workflow Speed" },
  ];

  return (
    <section ref={ref} className="relative py-16 border-y border-white/[0.04] bg-[#06090e]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-10"
        >
          Trusted by innovative teams worldwide
        </motion.p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 group-hover:text-[#10b981] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── FEATURES ─────────────────────────── */
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: BrainIcon,
      title: "AI Meeting Agents",
      description: "Dedicated AI proxies that attend, record, and optimize every interaction autonomously.",
    },
    {
      icon: MicIcon,
      title: "Real-Time Transcription",
      description: "High-fidelity speech-to-text with precise speaker identification globally.",
    },
    {
      icon: BarChart3Icon,
      title: "Smart Analytics",
      description: "Analyze sentiment, participation levels, and actionable insights instantly.",
    },
    {
      icon: VideoIcon,
      title: "HD Video Calls",
      description: "Crystal clear ultra-low latency video infrastructure for seamless connection.",
    },
    {
      icon: MessageSquareIcon,
      title: "Contextual Chat",
      description: "Persistent chat threads with your agent linked directly to meeting moments.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "End-to-end encryption and compliance standards prioritizing your privacy.",
    },
  ];

  return (
    <section id="features" ref={ref} className="relative py-28 bg-[#06090e] overflow-hidden">
      <GlowOrb className="w-[600px] h-[600px] bg-[#10b981]/[0.02] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#10b981] font-semibold tracking-wide uppercase text-sm mb-4 block">
            Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-white">
            The intelligence layer for<br className="max-md:hidden" /> your daily workflow
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Powerful features built natively for high-performance individuals and distributed teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-[#10b981]/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-6 border border-white/[0.05] group-hover:bg-[#10b981]/10 group-hover:border-[#10b981]/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-slate-300 group-hover:text-[#10b981] transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */
const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      num: "01",
      title: "Create Your AI Agent",
      description: "Define personality and meeting focus for your custom virtual assistant.",
      icon: BrainIcon,
    },
    {
      num: "02",
      title: "Start a Meeting",
      description: "Launch HD calls with one click. Your AI joins automatically to listen and learn.",
      icon: VideoIcon,
    },
    {
      num: "03",
      title: "Get Intelligent Insights",
      description: "Receive instant summaries, clips, and action items right in your inbox.",
      icon: BarChart3Icon,
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="relative py-28 bg-[#090d14] border-y border-white/[0.02] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6366f1] font-semibold tracking-wide uppercase text-sm mb-4 block">
            Simple Setup
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white">
            Three steps to smarter syncs
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative lg:gap-12">
          {/* Connecting dashed line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#10b981]/20 to-transparent border-t border-dashed border-white/10 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#06090e] border-[3px] border-white/5 flex items-center justify-center mx-auto mb-8 shadow-xl relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#10b981]/10 to-[#6366f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <step.icon className="w-8 h-8 text-[#10b981] relative z-10" />
                
                {/* Float Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#10b981] text-[#06090e] text-sm font-bold flex items-center justify-center border-4 border-[#090d14]">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-base text-slate-400 leading-relaxed font-normal px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── PRICING ─────────────────────────── */
const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for exploring the platform",
      features: ["40 min meeting limit", "1 Custom AI Agent", "Basic AI Transcription", "Community support"],
      cta: "Get Started Menu",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For professionals who need more",
      features: [
        "Unlimited duration",
        "Unlimited AI Agents",
        "Advanced AI Summary",
        "Custom Agent Instructions",
        "Priority support",
        "Analytics dashboard",
      ],
      cta: "Start Pro Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored to your organization",
      features: [
        "Unlimited AI interactions",
        "On-premise deployments",
        "24/7 Priority support",
        "Custom API access",
        "SSO & SCIM",
        "Dedicated CSM",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" ref={ref} className="relative py-28 bg-[#06090e] overflow-hidden">
      <GlowOrb className="w-[800px] h-[800px] bg-[#6366f1]/[0.015] bottom-[-20%] left-[-10%]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#10b981] font-semibold tracking-wide uppercase text-sm mb-4 block">
            Flexible Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white">
            Pricing for limitless growth
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-normal">
            Choose the perfect plan for your productivity and team needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 lg:p-10 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#090d14] border-2 border-[#10b981]/50 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative transform md:-translate-y-4"
                  : "bg-white/[0.01] border border-white/[0.05] hover:border-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#10b981] text-[#06090e] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8 border-b border-white/5 pb-8">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px] font-normal">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-slate-400 font-medium">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base">
                    <CheckIcon className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up" className="mt-auto outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl block">
                <Button
                  className={`w-full rounded-xl py-6 font-bold text-base transition-all cursor-pointer ${
                    plan.highlighted
                      ? "bg-[#10b981] text-white hover:bg-[#0ea572] shadow-lg"
                      : "bg-white/5 text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── TESTIMONIAL ─────────────────────────── */
const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" ref={ref} className="relative py-28 bg-[#090d14] overflow-hidden border-t border-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl bg-[#06090e] border border-white/[0.05] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Ambient glow inside */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#10b981]/[0.05] to-transparent pointer-events-none" />

            <QuoteIcon className="w-12 h-12 text-[#10b981]/40 mb-8" />

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-snug mb-10 tracking-tight">
              &quot;ConvoGenius hasn&apos;t just changed our meetings &mdash; it&apos;s changed how we think as a company. The AI summaries capture nuance that I used to miss, allowing me to focus entirely on the person in front of me.&quot;
            </blockquote>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#10b981] flex items-center justify-center text-[#06090e] font-bold text-xl relative">
                <Image src="/placeholder-user.jpg" alt="Marcus Chen" width={64} height={64} className="rounded-full object-cover" unoptimized />
                <div className="absolute inset-0 rounded-full border border-white/20" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Marcus Chen
                </h4>
                <p className="text-slate-400 font-medium">
                  Director of Engineering, NexaFlow AI
                </p>
              </div>
            </div>
            
            {/* Stars align right desktop */}
            <div className="md:absolute bottom-16 right-16 flex gap-1 mt-6 md:mt-0">
               {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-[#10b981] fill-[#10b981]" />
               ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────── CTA Section ─────────────────────────── */
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#06090e] overflow-hidden">
      <GlowOrb className="w-[800px] h-[800px] bg-[#10b981]/[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
            Ready to Upgrade<br/> Your Meetings?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Join 10,000+ professionals already using ConvoGenius to unlock the intelligence of their personal AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sign-up" className="outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-2xl w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#10b981] hover:bg-[#0ea572] text-white font-bold rounded-2xl px-12 py-8 text-lg shadow-[0_4px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_40px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none cursor-pointer">
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-6 font-medium">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────── FOOTER ─────────────────────────── */
const Footer = () => {
  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Enterprise"] },
    { title: "Resources", links: ["Security", "Documentation", "Help Center", "Blog"] },
    { title: "Company", links: ["About Us", "Careers", "Terms", "Privacy"] },
  ];

  return (
    <footer className="bg-[#040608] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4edea3] to-[#10b981] flex items-center justify-center">
                <Image src="/logo.svg" alt="ConvoGenius" width={18} height={18} className="invert" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Convo<span className="text-[#10b981]">Genius</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-8">
              Empowering individuals with intelligent AI agents for every conversation to make work easier and smarter.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#10b981]/50 hover:bg-[#10b981]/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base text-slate-400 hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#10b981]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 font-medium tracking-wide">
            © {new Date().getFullYear()} ConvoGenius AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Terms", "Privacy", "Cookies"].map((legal) => (
              <a key={legal} href="#" className="text-sm text-slate-500 hover:text-white transition-colors font-medium">
                {legal}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────── MAIN VIEW ─────────────────────────── */
export const LandingView = () => {
  return (
    <div className="bg-[#06090e] min-h-screen text-slate-200 overflow-x-hidden selection:bg-[#10b981]/30 selection:text-white">
      <GrainOverlay />
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};
