import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();

const prisma = new PrismaClient();

app.get("/users", async () => {
  const users = await prisma.user.findMany();

  return { users };
});

app.post("/users", async (request, reply) => {
  const { name, email } = request.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return reply.status(201).send({ user });
});

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log("HTTP server running on http://localhost:3333");
});
