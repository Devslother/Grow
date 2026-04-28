const authDemoModeFlag = process.env.NEXT_PUBLIC_AUTH_DEMO_MODE;

// Public portfolio default is demo mode to avoid backend-dependent failures.
export const isAuthDemoMode =
  authDemoModeFlag === undefined ? true : authDemoModeFlag === "true";

export const AUTH_DEMO_MESSAGES = {
  signIn:
    "Demo mode: authentication is disabled in the public version of this project.",
  signUp:
    "Demo mode: registration is disabled in the public version of this project.",
  forgotPassword:
    "Demo mode: password recovery is disabled in the public version of this project.",
  google:
    "Demo mode: Google authentication is disabled in the public version of this project.",
} as const;
