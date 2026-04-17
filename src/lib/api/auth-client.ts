export interface RegisterUserPayload {
  email: string;
  password: string;
  companyName: string;
}

type RegisterApiResponse = {
  error?: string;
};

export type RegisterUserResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      status: number;
      error: string;
    };

const DEFAULT_REGISTER_ERROR = "Something went wrong. Please try again.";

export async function registerUser(
  payload: RegisterUserPayload
): Promise<RegisterUserResult> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: RegisterApiResponse = await response
      .json()
      .catch(() => ({} as RegisterApiResponse));

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: data.error || DEFAULT_REGISTER_ERROR,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Registration request failed:", error);
    return {
      ok: false,
      status: 0,
      error: DEFAULT_REGISTER_ERROR,
    };
  }
}
