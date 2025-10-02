import type { FileEntity } from "../entities/File";

export interface IFileRepository {
  getByFolderId(folderId: number): Promise<FileEntity[]>;
  create(
    folderId: number,
    name: string,
    sizeBytes?: number
  ): Promise<FileEntity>;
}
