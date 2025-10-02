import { Elysia } from "elysia";
import { PgFolderRepository } from "../../infrastructure/db/PgFolderRepository";
import { GetFolders } from "../../application/usecases/GetFolders";
import { GetSubfolders } from "../../application/usecases/GetSubfolders";

const folderRepo = new PgFolderRepository();
const getFolders = new GetFolders(folderRepo);
const getSubfolders = new GetSubfolders(folderRepo);

export const folderRoutes = new Elysia({ prefix: "/folders" })
  .get("/", async () => {
    return await getFolders.execute();
  })
  .get("/:id/subfolders", async ({ params }) => {
    if (params.id === "root") {
      return await getSubfolders.execute(null);
    }
    const folderId = Number(params.id);
    if (Number.isNaN(folderId)) return { error: "invalid id" };
    return await getSubfolders.execute(folderId);
  });
