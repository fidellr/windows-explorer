import type { FolderEntity } from "../entities/Folder";

export interface IFolderRepository {
  getAll(): Promise<FolderEntity[]>;
  getByParentId(parentId: number | null): Promise<FolderEntity[]>;
}
