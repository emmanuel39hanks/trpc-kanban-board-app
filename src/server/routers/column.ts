import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const columnRouter = router({
  create: protectedProcedure
    .input(
      z.object({ boardId: z.string(), name: z.string(), order: z.number() })
    )
    .mutation(async ({ input }) => {
      return prisma.column.create({
        data: {
          name: input.name,
          order: input.order,
          boardId: input.boardId,
        },
      });
    }),
});
