import type { IFolderRepository } from "../../domain/repositories/IFolderRepository";
import type { FolderEntity } from "../../domain/entities/Folder";

export class GetFolders {
  constructor(private folderRepo: IFolderRepository) {}

  async execute(): Promise<FolderEntity[]> {
    return this.folderRepo.getAll();
  }
}
