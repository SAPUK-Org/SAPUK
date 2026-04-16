import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Use Node.js runtime so UploadThing's dev callback can reach onUploadComplete
// (Edge runtime cannot fetch itself, which breaks the simulated callback in dev)
export const runtime = "nodejs";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
