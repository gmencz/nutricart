import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { createSupabaseServerClient } from "~/clients/supabase";
import { db } from "db";
import { eq } from "drizzle-orm";
import { users } from "db/schema";

export async function loader({ request }: Route.LoaderArgs) {
  const { client: supabase, headers } = await createSupabaseServerClient(
    request
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect("/auth/login", { headers });
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    columns: {
      role: true,
    },
  });

  if (!userData) {
    return redirect("/auth/login", { headers });
  }

  return {
    userRole: userData.role,
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { userRole } = loaderData;

  if (!userRole) {
    // If the user hasn't selected a role, render the role selection layout.

    return (
      <>
        <Outlet />
      </>
    );
  }

  switch (userRole) {
    case "coach": {
      // If the user is a coach, render the coach layout.

      return (
        <>
          <Outlet />
        </>
      );
    }

    case "client": {
      // If the user is a client, render the client layout.

      return (
        <>
          <Outlet />
        </>
      );
    }

    case "both": {
      // If the user is both a coach and a client, render the complete layout.

      return (
        <>
          <Outlet />
        </>
      );
    }
  }
}
