import { pg } from "../config/database";
import type { FileEntity } from "../../domain/entities/File";
import type { IFileRepository } from "../../domain/repositories/IFileRepository";

export class PgFileRepository implements IFileRepository {
  async getByFolderId(folderId: number): Promise<FileEntity[]> {
    const result = await pg.query<FileEntity>(
      `SELECT id, name, folder_id as "folderId", size_bytes as "sizeBytes", created_at as "createdAt"
       FROM files
       WHERE folder_id = $1
       ORDER BY created_at ASC`,
      [folderId]
    );
    return result.rows;
  }

  async create(
    folderId: number,
    name: string,
    sizeBytes = 0
  ): Promise<FileEntity> {
    if (!Number.isInteger(folderId) || folderId <= 0) {
      const err = new Error(`Invalid folderId: ${folderId}`);
      (err as any).status = 400;
      throw err;
    }

    const folderCheck = await pg.query<{ id: number }>(
      `SELECT id FROM folders WHERE id = $1 LIMIT 1`,
      [folderId]
    );
    if (folderCheck.rowCount === 0) {
      const err = new Error(`Folder with id ${folderId} not found`);
      (err as any).status = 404;
      throw err;
    }

    const result = await pg.query<FileEntity>(
      `INSERT INTO files (name, folder_id, size_bytes)
       VALUES ($1, $2, $3)
       RETURNING id, name, folder_id as "folderId", size_bytes as "sizeBytes", created_at as "createdAt"`,
      [name, folderId, sizeBytes]
    );

    const file = result.rows[0];
    if (!file) {
      const err = new Error("Failed to insert file");
      (err as any).status = 500;
      throw err;
    }

    return file;
  }
}
