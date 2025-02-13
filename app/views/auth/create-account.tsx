import { data } from "react-router";
import type { Route } from "./+types/create-account";
import { createSupabaseServerClient } from "~/clients/supabase";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NutriCart | Create Account" }];
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

  const { error: signUpError } = await supabase.auth.signInWithOtp({
    email,
  });

  if (signUpError) {
    console.error(signUpError);
    errors.form = "Sorry, something went wrong";
    return data({ ok: false, errors }, { status: 500 });
  }

  return data({ ok: true, errors });
}

export default function CreateAccount({ actionData }: Route.ComponentProps) {
  const errors = actionData?.errors ? Object.values(actionData?.errors) : [];

  return (
    <>
      <h1>Create Account</h1>

      <form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"></input>

        <button type="submit">Create account</button>
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

      {actionData?.ok && (
        <p>Account created. Check your email for a sign-in link.</p>
      )}
    </>
  );
}
