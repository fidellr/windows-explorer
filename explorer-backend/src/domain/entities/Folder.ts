export interface FolderEntity {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: Date;
}
