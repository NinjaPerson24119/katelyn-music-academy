import type { Env } from "./types";
import { onRequestPostContactForm } from "./email"

export default {
  async fetch(request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return onRequestPostContactForm(request, env)
    }
		return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
