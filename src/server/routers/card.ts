import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cardRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        columnId: z.string(),
        title: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lastCard = await prisma.card.findFirst({
        where: { columnId: input.columnId },
        orderBy: { order: "desc" },
      });
      const newOrder = lastCard ? lastCard.order + 1 : 1;

      return prisma.card.create({
        data: {
          title: input.title,
          description: input.description,
          columnId: input.columnId,
          order: newOrder,
        },
      });
    }),
  updateCardOrder: protectedProcedure
    .input(
      z.object({
        cardId: z.string(),
        newColumnId: z.string(),
        newOrder: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.card.update({
        where: { id: input.cardId },
        data: {
          columnId: input.newColumnId,
          order: input.newOrder,
        },
      });
    }),
  deleteCard: protectedProcedure
    .input(z.object({ cardId: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.card.delete({
        where: { id: input.cardId },
      });
    }),
});
