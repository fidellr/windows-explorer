import Elysia from "elysia";
import { CreateFile } from "../../application/usecases/CreateFile";
import { GetFilesByFolder } from "../../application/usecases/GetFilesByFolder";
import { PgFileRepository } from "../../infrastructure/db/PgFileRepository";

const fileRepo = new PgFileRepository();
const getFilesByFolder = new GetFilesByFolder(fileRepo);
const createFile = new CreateFile(fileRepo);

export const fileRoutes = new Elysia({ prefix: "/files" })
  .get("/:folderId", async ({ params }) => {
    const folderId = parseInt(params.folderId);
    return await getFilesByFolder.execute(folderId);
  })
  .post("/", async ({ body }) => {
    const { folderId, name, sizeBytes } = body as {
      folderId: number;
      name: string;
      sizeBytes?: number;
    };
    return await createFile.execute(folderId, name, sizeBytes);
  });
