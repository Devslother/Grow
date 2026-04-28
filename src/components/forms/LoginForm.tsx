// LoginForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleLogo from "@/public/icons/Googlelogo.svg";
import { AUTH_DEMO_MESSAGES, isAuthDemoMode } from "@/lib/auth-demo";
import { AuthInput } from "../ui/AuthInput";

const POST_LOGIN_REDIRECT_URL = "https://postiz.com/agent";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [demoNotice, setDemoNotice] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotice("");

    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPassError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPassError("");
    }

    if (!isValid) return;

    if (isAuthDemoMode) {
      setEmailError("");
      setPassError("");
      setDemoNotice(AUTH_DEMO_MESSAGES.signIn);
      return;
    }

    try {
      // Controlled NextAuth authentication without auto-redirect
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // If error from next-auth -> show it in UI
      if (res?.error) {
        setPassError("Invalid email or password");
        return;
      }

      // If authentication successful -> redirect manually
      window.location.href = POST_LOGIN_REDIRECT_URL;
    } catch (error) {
      console.error("Login request failed:", error);
      setPassError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setDemoNotice("");

    if (isAuthDemoMode) {
      setEmailError("");
      setPassError("");
      setDemoNotice(AUTH_DEMO_MESSAGES.google);
      return;
    }

    try {
      await signIn("google", {
        callbackUrl: POST_LOGIN_REDIRECT_URL,
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setPassError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5 gap-6">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-md bg-white"
      >
        <GoogleLogo />
        <span className="font-sans-serif text-base font-bold text-black">
          Continue with Google
        </span>
      </button>

      {demoNotice && (
        <p className="rounded-md border border-[#3A3A3A] bg-[#222222] px-3 py-2 text-xs font-sans-serif font-bold text-gray-300">
          {demoNotice}
        </p>
      )}

      <AuthInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(""); // clear error
          setDemoNotice("");
        }}
        error={emailError}
        placeholder="m@example.com"
      />

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label className="text-sm text-white font-bold">Password</label>

          <Link
            href="/auth/forgot-password"
            className="text-xs text-white hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <AuthInput
          hideLabel
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPassError(""); // clear error
            setDemoNotice("");
          }}
          error={passError}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full flex items-center justify-center px-[18px] py-[10px] rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold"
      >
        Sign in
      </button>
    </form>
  );
}
