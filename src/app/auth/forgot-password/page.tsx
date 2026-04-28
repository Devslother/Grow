"use client";

import { AuthInput } from "@/components/ui/AuthInput";
import { AuthLogoEye } from "@/components/ui/AuthLogoEye";
import { AUTH_DEMO_MESSAGES, isAuthDemoMode } from "@/lib/auth-demo";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // whether to show the post-submit state
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!isValid) return;

    if (isAuthDemoMode) {
      setSubmitted(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true); // switch content
    } catch (error) {
      console.error("Forgot password error:", error);
      setEmailError("Something went wrong. Please try again.");
    }
  };

  const handleTryAgain = () => {
    setSubmitted(false);
    setEmail("");
    setEmailError("");
  };

  return (
    <main className="w-full px-4 flex flex-col items-center">
      <div className="mx-auto w-[500px] bg-[#1A1A1A] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] p-[30px] flex flex-col gap-6">
        <AuthLogoEye />
        <h1 className="font-sans-serif text-2xl font-bold text-center text-secondary-purple">
          Forgot Password
        </h1>
        <p className="font-sans-serif text-sm text-gray-400 font-bold text-center">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        {!submitted && (
          <form
            onSubmit={onSubmit}
            className="flex flex-col p-5 gap-6 border-[1px] border-[#3A3A3A] rounded-[12px]"
          >
            <AuthInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // clear error
              }}
              error={emailError}
              placeholder="m@example.com"
            />

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center px-4 py-2 rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {/* screen after submission */}
        {submitted && (
          <div className="flex flex-col p-6 gap-4 border-[1px] border-[#3A3A3A] rounded-[12px]">
            <h2 className="font-sans-serif text-lg font-bold">
              {isAuthDemoMode
                ? "Password reset unavailable in demo"
                : "Check your email"}
            </h2>
            <p className="font-sans-serif text-sm text-gray-400 font-bold">
              {isAuthDemoMode
                ? AUTH_DEMO_MESSAGES.forgotPassword
                : "We've sent you a password reset link. Please check your inbox."}
            </p>

            <button
              type="button"
              onClick={handleTryAgain}
              className="h-[44px] w-full rounded-md px-4 bg-transparent border border-[#3A3A3A] text-gray-400 font-sans-serif text-sm font-bold"
            >
              Try again with a different email
            </button>
          </div>
        )}

        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-sans-serif text-sm text-gray-400 font-bold">
            Remembered your password?
          </p>
          <Link
            href="/auth/login"
            className="font-sans-serif text-sm text-secondary-purple font-bold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
