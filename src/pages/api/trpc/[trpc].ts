import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/index";
import { createTRPCContext } from "../../../server/context";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
