import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("html-streaming", "routes/html-streaming.tsx"),
  route("http-streaming", "routes/http-streaming.tsx"),
] satisfies RouteConfig;
