import type { IFolderRepository } from "../../domain/repositories/IFolderRepository";
import type { FolderEntity } from "../../domain/entities/Folder";

export class GetSubfolders {
  constructor(private folderRepo: IFolderRepository) {}

  async execute(parentId: number | null): Promise<FolderEntity[]> {
    return this.folderRepo.getByParentId(parentId);
  }
}
