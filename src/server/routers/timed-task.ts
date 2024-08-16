import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const timedTaskRouter = router({
  create: protectedProcedure
    .input(z.object({ title: z.string(), duration: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.timedTask.create({
        data: {
          title: input.title,
          duration: input.duration,
          userId: ctx.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.timedTask.findMany({
      where: { userId: ctx.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  complete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.timedTask.update({
        where: { id: input.id },
        data: { completedAt: new Date() },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.timedTask.delete({
        where: { id: input.id },
      });
    }),
});
