import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  createUser: publicProcedure
    .input(
      z.object({
        auth0Id: z.string(),
        email: z.string().email(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.upsert({
        where: { auth0Id: input.auth0Id },
        update: { name: input.name },
        create: input,
      });
    }),
});
