import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { Track } from "@/types";

export const audioRouter = router({
  getLofiTracks: publicProcedure.query(async () => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks?client_id=${process.env.JAMENDO_CLIENT_ID}&format=json&tags=lofi&limit=30`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.results as Track[];
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [] as Track[];
    }
  }),
});