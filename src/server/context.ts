import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "./prisma";

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return {
    prisma,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
