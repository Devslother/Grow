// src/app/auth/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth — GrowChief",
  description: "Login and registration",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
