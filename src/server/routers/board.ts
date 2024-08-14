import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const boardRouter = router({
  getAll: protectedProcedure.query(() => {
    return prisma.board.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return prisma.board.findUnique({
        where: { id: input.id },
        include: {
          columns: {
            include: {
              cards: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.board.create({
        data: {
          name: input.name,
          userId: ctx.user.id,
          columns: {
            create: [
              { name: "To Do", order: 1 },
              { name: "Doing", order: 2 },
              { name: "Done", order: 3 },
            ],
          },
        },
        include: {
          columns: true,
        },
      });
    }),
  deleteBoard: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.board.deleteMany({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });
    }),
});
