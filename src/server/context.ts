import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "./prisma";

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getSession(req, res);
  const user = session
    ? await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
    : null;

  return {
    prisma,
    user,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;