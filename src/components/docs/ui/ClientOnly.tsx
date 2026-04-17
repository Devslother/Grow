// src/components/docs/ui/ClientOnly.tsx
"use client";

import type { ReactNode } from "react";

export function ClientOnly({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
