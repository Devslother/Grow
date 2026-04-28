// RegisterForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleLogo from "@/public/icons/Googlelogo.svg";
import { registerUser } from "@/lib/api/auth-client";
import { AUTH_DEMO_MESSAGES, isAuthDemoMode } from "@/lib/auth-demo";
import { AuthInput } from "../ui/AuthInput";

const POST_LOGIN_REDIRECT_URL = "https://postiz.com/agent";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [demoNotice, setDemoNotice] = useState("");

  // whether to show "email sent" screen
  const [submitted, setSubmitted] = useState(false);

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

    if (confirmPassword !== password) {
      setConfirmPassError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPassError("");
    }

    if (companyName.trim().length < 3) {
      setCompanyNameError("Company name must be at least 3 characters");
      isValid = false;
    } else {
      setCompanyNameError("");
    }

    if (!isValid) return;

    if (isAuthDemoMode) {
      setEmailError("");
      setPassError("");
      setConfirmPassError("");
      setCompanyNameError("");
      setDemoNotice(AUTH_DEMO_MESSAGES.signUp);
      return;
    }

    try {
      const registerResult = await registerUser({ email, password, companyName });

      if (!registerResult.ok) {
        if (registerResult.status === 409) {
          setEmailError("User with this email already exists");
        } else {
          setPassError(registerResult.error);
        }
        return;
      }

      // If everything successful -> automatically log in user
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        // If auto-login failed, show successful registration message
        setSubmitted(true);
      } else {
        // If auto-login successful -> redirect to external agent
        window.location.href = POST_LOGIN_REDIRECT_URL;
      }
    } catch (error) {
      console.error("Registration flow failed:", error);
      setPassError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setDemoNotice("");

    if (isAuthDemoMode) {
      setEmailError("");
      setPassError("");
      setConfirmPassError("");
      setCompanyNameError("");
      setDemoNotice(AUTH_DEMO_MESSAGES.google);
      return;
    }

    try {
      // "google" provider will be in next-auth config
      await signIn("google", {
        callbackUrl: POST_LOGIN_REDIRECT_URL,
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setPassError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {!submitted && (
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

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(""); // clear error
              setDemoNotice("");
            }}
            error={passError}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPassError(""); // clear error
              setDemoNotice("");
            }}
            error={confirmPassError}
          />

          <AuthInput
            label="Company"
            type="text"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setCompanyNameError(""); // clear error
              setDemoNotice("");
            }}
            error={companyNameError}
            placeholder="Your company name"
          />

          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center px-[18px] py-[10px] rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold"
          >
            Create account
          </button>
        </form>
      )}
      {submitted && (
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-4 bg-transparent border border-[#3A3A3A] rounded-md p-6">
            <h1 className="font-sans-serif text-xl font-bold text-secondary-purple">
              Account created successfully
            </h1>
            <p className="font-sans-serif text-base text-gray-300 font-bold">
              We&apos;ve sent an activation link to {email}.
            </p>
            <p className="font-sans-serif text-sm text-gray-400 font-bold">
              Please check your email and click the activation link to complete
              your registration.
            </p>
          </div>

          <p className="font-sans-serif text-sm text-gray-400">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <Link
              href="/auth/register"
              className="font-sans-serif text-sm text-secondary-purple font-bold"
            >
              try again
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
