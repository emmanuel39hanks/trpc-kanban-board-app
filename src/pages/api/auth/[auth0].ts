import {
  handleAuth,
  handleCallback,
  Session,
  AfterCallback,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { createTRPCContext } from "../../../server/context";
import { appRouter } from "../../../server/routers/index";

const afterCallback: AfterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session | null
) => {
  if (session?.user) {
    const { sub, email, name } = session.user;
    if (sub && email) {
      const ctx = await createTRPCContext({ req, res, info: {} as any });
      const caller = appRouter.createCaller(ctx);

      await caller.auth.createUser({
        auth0Id: sub,
        email,
        name: name || undefined,
      });
    }
  }

  return session || undefined;
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      console.error("Error in Auth0 callback:", error);
      res.status(500).end("Internal Server Error");
    }
  },
});
