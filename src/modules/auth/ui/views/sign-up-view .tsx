"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { OctagonAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Alert, AlertTitle} from "@/components/ui/alert";
import{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import {FaGoogle, FaGithub} from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUpSchema, type SignUpSchema } from "@/modules/auth/schemas";


export const SignUpView = () => {

  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error,setError] = useState<string | null>(null);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =  (data: SignUpSchema) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/dashboard");
        },
        onError: ({error}) => {
          setError(error.message);
        }
      }
    )
  };
  const onSocial =  (provider: "github" | "google") => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({error}) => {
          setError(error.message);
        }
      }
    )
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 rounded-3xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.05),0_20px_60px_rgba(0,0,0,0.6)]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col item-center md:items-start text-center md:text-left mb-2">
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Let&apos;s get you started
                  </h1>
                  <p className="text-slate-400">
                    Create your account setup
                  </p>
                </div>
                <div className="grid gap-4">
                    <FormField 
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 font-medium">Name</FormLabel>
                          <FormControl>
                            <Input type="name" placeholder="John Doe" {...field} className="border-white/10 bg-white/5 text-white placeholder-slate-500 hover:border-white/20 focus-visible:ring-[#10b981] transition-all rounded-xl py-5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                  </div>
                <div className="grid gap-4">
                    <FormField 
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="something@gmail.com" {...field} className="border-white/10 bg-white/5 text-white placeholder-slate-500 hover:border-white/20 focus-visible:ring-[#10b981] transition-all rounded-xl py-5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                  </div>
                <div className="grid gap-4">
                    <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 font-medium">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} className="border-white/10 bg-white/5 text-white placeholder-slate-500 hover:border-white/20 focus-visible:ring-[#10b981] transition-all rounded-xl py-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                </div>
                <div className="grid gap-4">
                    <FormField 
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} className="border-white/10 bg-white/5 text-white placeholder-slate-500 hover:border-white/20 focus-visible:ring-[#10b981] transition-all rounded-xl py-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                </div>

                {!!error && (
                  <Alert className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl mt-2">
                    <OctagonAlert className="h-4 w-4 text-red-500" />
                    <AlertTitle className="text-red-500 ml-2">
                     {error}
                      </AlertTitle>
                  </Alert>
                )}
                <Button className="w-full bg-[#10b981] hover:bg-[#0ea572] text-white font-bold rounded-xl py-6 text-base shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.3)] transition-all cursor-pointer mt-2" type="submit" disabled={pending}>
                  Sign Up
                </Button>
                
                <div className="after:border-white/10 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mt-2">
                  <span className="bg-[#06090e] text-slate-400 relative z-10 px-4">
                    Or continue with
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button disabled={pending} type="button" variant="outline" className="w-full rounded-xl py-5 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer" onClick={() => onSocial("google")}>
                    <FaGoogle className="w-4 h-4 mr-2" /> Google
                  </Button>
                  <Button disabled={pending} type="button" variant="outline" className="w-full rounded-xl py-5 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer" onClick={() => onSocial("github")}>
                    <FaGithub className="w-4 h-4 mr-2" /> GitHub
                  </Button>
                </div>
                <div className="text-center md:text-left text-sm text-slate-400 mt-2">
                  Already have an account? {" "}
                  <Link href={"/sign-in"} className="text-[#10b981] font-semibold hover:text-[#0ea572] transition-colors">
                   Sign in instead
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          {/* Side Branding */}
          <div className="bg-gradient-to-br from-[#0c1017] to-[#040608] border-l border-white/[0.05] relative hidden md:flex flex-col gap-y-6 items-center justify-center p-12 text-center overflow-hidden">
             {/* Inner glow orb */}
             <div className="absolute rounded-full blur-[100px] w-64 h-64 bg-[#10b981]/[0.08] pointer-events-none" />
             
             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4edea3] to-[#10b981] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10">
                <Image src="/logo.svg" alt="ConvoGenius Logo" className="w-10 h-10 invert" width={40} height={40} />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-3">Convo<span className="text-[#10b981]">Genius</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                  Transform your workflow with intelligent 1-on-1 video meetings.
                </p>
             </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
