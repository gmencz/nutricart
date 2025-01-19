import type { EmailOtpType } from "@supabase/supabase-js";
import type { Route } from "./+types/confirm";
import { createSupabaseServerClient } from "~/clients/supabase";
import { data, redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const { client: supabase, headers } = await createSupabaseServerClient(
      request
    );

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect("/dashboard", { headers });
    }

    console.error(error);
  }

  return data(null, { status: 500 });
}

export default function Confirm() {
  return (
    <>
      <p>Something went wrong</p>
    </>
  );
}
