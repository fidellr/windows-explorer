import type { IFolderRepository } from "../../domain/repositories/IFolderRepository";
import type { FolderEntity } from "../../domain/entities/Folder";
import { pg } from "../config/database";

export class PgFolderRepository implements IFolderRepository {
  async getAll(): Promise<FolderEntity[]> {
    const res = await pg.query(
      "SELECT id, name, parent_id, created_at FROM folders ORDER BY id"
    );
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      parentId: r.parent_id,
      createdAt: r.created_at,
    }));
  }

  async getByParentId(parentId: number | null): Promise<FolderEntity[]> {
    if (parentId === null) {
      const res = await pg.query(
        "SELECT id, name, parent_id, created_at FROM folders WHERE parent_id IS NULL ORDER BY name"
      );
      return res.rows.map((r) => ({
        id: r.id,
        name: r.name,
        parentId: r.parent_id,
        createdAt: r.created_at,
      }));
    }
    const res = await pg.query(
      "SELECT id, name, parent_id, created_at FROM folders WHERE parent_id = $1 ORDER BY name",
      [parentId]
    );
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      parentId: r.parent_id,
      createdAt: r.created_at,
    }));
  }
}
