import type { IFileRepository } from "../../domain/repositories/IFileRepository";
import type { FileEntity } from "../../domain/entities/File";

export class GetFilesByFolder {
  constructor(private readonly fileRepo: IFileRepository) {}

  async execute(folderId: number): Promise<FileEntity[]> {
    return this.fileRepo.getByFolderId(folderId);
  }
}
