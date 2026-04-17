// src/components/docs/ui/CopyableCode.server.tsx
import type { ReactNode } from "react";
import { ClientOnly } from "./ClientOnly";
import { CopyableCode as CopyableCodeClient } from "./CopyableCode";

export function CopyableCode({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: string;
}) {
  return (
    <ClientOnly>
      <CopyableCodeClient classes={classes}>{children}</CopyableCodeClient>
    </ClientOnly>
  );
}
