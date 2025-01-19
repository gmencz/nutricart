import { data } from "react-router";
import type { Route } from "./+types/login";
import { createSupabaseServerClient } from "~/clients/supabase";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Metrix | Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));

  const errors: Record<string, string> = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (Object.keys(errors).length > 0) {
    return data({ ok: false, errors }, { status: 400 });
  }

  const { client: supabase } = await createSupabaseServerClient(request);

  const { error: loginError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (loginError) {
    console.error(loginError);

    if (loginError.status === 422) {
      errors.form =
        "Email not found. Please check the email address you entered or create a new account.";
    } else {
      errors.form = "Sorry, something went wrong";
    }

    return data({ ok: false, errors }, { status: 500 });
  }

  return data({ ok: true, errors });
}

export default function Login({ actionData }: Route.ComponentProps) {
  const errors = actionData?.errors ? Object.values(actionData?.errors) : [];

  return (
    <>
      <h1>Login</h1>

      <form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"></input>
        <button type="submit">Log in</button>
      </form>

      {errors.length > 0 && (
        <>
          <p>Errors:</p>
          <ul>
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        </>
      )}

      {actionData?.ok && <p>Check your email for the login link</p>}
    </>
  );
}
