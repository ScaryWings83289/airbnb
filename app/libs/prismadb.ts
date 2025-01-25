//* Packages Imports */
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Add logging for debugging
const client =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logging
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
