import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  board: router({
    getAll: publicProcedure.query(() => {
      return prisma.board.findMany();
    }),
    getById: publicProcedure
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
    create: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ input }) => {
        return prisma.board.create({
          data: {
            name: input.name,
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
    addColumn: publicProcedure
      .input(z.object({ boardId: z.string(), name: z.string() }))
      .mutation(async ({ input }) => {
        return prisma.column.create({
          data: {
            name: input.name,
            boardId: input.boardId,
            order:
              (await prisma.column.count({
                where: { boardId: input.boardId },
              })) + 1,
          },
        });
      }),
    addCard: publicProcedure
      .input(
        z.object({
          columnId: z.string(),
          title: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return prisma.card.create({
          data: {
            title: input.title,
            description: input.description,
            columnId: input.columnId,
            order:
              (await prisma.card.count({
                where: { columnId: input.columnId },
              })) + 1,
          },
        });
      }),
    updateCardOrder: publicProcedure
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
    deleteBoard: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return prisma.board.delete({
          where: { id: input.id },
        });
      }),
    deleteCard: publicProcedure
      .input(z.object({ cardId: z.string() }))
      .mutation(async ({ input }) => {
        return prisma.card.delete({
          where: { id: input.cardId },
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
