import type { IFileRepository } from "../../domain/repositories/IFileRepository";
import type { FileEntity } from "../../domain/entities/File";

export class CreateFile {
  constructor(private readonly fileRepo: IFileRepository) {}

  async execute(
    folderId: number,
    name: string,
    sizeBytes = 0
  ): Promise<FileEntity> {
    return this.fileRepo.create(folderId, name, sizeBytes);
  }
}
