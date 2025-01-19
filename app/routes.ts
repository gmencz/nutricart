import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Landing Routes
  layout("./views/layouts/landings.tsx", [index("./views/landings/home.tsx")]),

  // Auth Routes
  route("auth/login", "./views/auth/login.tsx"),
  route("auth/create-account", "./views/auth/create-account.tsx"),
  route("auth/confirm", "./views/auth/confirm.tsx"),

  // Dashboard Routes
  layout("./views/layouts/dashboard.tsx", [
    route("dashboard", "./views/dashboard/index.tsx"),
  ]),
] satisfies RouteConfig;
