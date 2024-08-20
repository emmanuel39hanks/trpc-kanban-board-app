import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { processVoiceCommand } from "../services/voice-processing";
import path from "path";
import fs from "fs";

export const timedTaskRouter = router({
  create: protectedProcedure
    .input(z.object({ title: z.string(), duration: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.timedTask.create({
        data: {
          title: input.title,
          duration: input.duration,
          userId: ctx.user.id,
          startedAt: new Date(),
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.timedTask.findMany({
      where: { userId: ctx.user.id, completedAt: null },
      orderBy: { createdAt: "desc" },
    });

    return tasks.map((task) => {
      const elapsedSeconds = task.startedAt
        ? Math.floor((new Date().getTime() - task.startedAt.getTime()) / 1000)
        : 0;
      const remainingSeconds = Math.max(0, task.duration * 60 - elapsedSeconds);
      return {
        ...task,
        timeLeft: remainingSeconds,
      };
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
  processVoiceCommand: protectedProcedure
    .input(z.object({ audio: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      console.log("Received audio for processing");
      const audioBuffer = Buffer.from(input.audio);
      const audioFile = new File([audioBuffer], "recording.webm", {
        type: "audio/webm",
      });

      const result = await processVoiceCommand(audioFile);
      console.log("Processed audio result:", result);

      return result;
    }),
});
