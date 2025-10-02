import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { folderRoutes } from "./routes/folderRoutes";
import { fileRoutes } from "./routes/fileRoutes";
import openapi from "@elysiajs/openapi";

const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(cors())
  .use(folderRoutes)
  .use(fileRoutes);

const port = Number(process.env.PORT || 3000);
app.listen({ port });

console.log(`🚀 Backend running at http://localhost:${port}`);
