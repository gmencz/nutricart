import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NutriCart" }];
}

export default function Home() {
  return (
    <div>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/create-account">Create account</Link>
    </div>
  );
}
