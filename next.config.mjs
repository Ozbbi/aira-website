/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    // A single build-time boolean, safe to ship to the client, that reflects
    // whether BOTH Clerk keys are present. Server (layout) and client (page)
    // components both read this so they never disagree about whether Clerk
    // actually mounted — a mismatch there is what caused the blank-screen bug.
    CLERK_READY: String(
      Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) && Boolean(process.env.CLERK_SECRET_KEY)
    ),
  },
};

export default nextConfig;
