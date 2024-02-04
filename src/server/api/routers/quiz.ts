import {z} from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  create: publicProcedure
  .mutation(async ({ctx}) => {
    return ctx.db.quiz.create({
      data: {
        title: "test quiz",
        description: "This is my first quiz",
        userId: 1,
        allowedAttempts: 10
      }
    })
  }),

  getList: publicProcedure
  .query(({ctx}) => {
    return ctx.db.quiz.findMany();
  }),
});