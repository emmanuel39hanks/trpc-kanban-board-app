import { router } from "../trpc";
import { audioRouter } from "./audio";
import { authRouter } from "./auth";
import { boardRouter } from "./board";
import { cardRouter } from "./card";
import { columnRouter } from "./column";

export const appRouter = router({
  auth: authRouter,
  board: boardRouter,
  card: cardRouter,
  column: columnRouter,
  audio: audioRouter,
});

export type AppRouter = typeof appRouter;