export const API_BASE = "http://localhost:3000/api";
export const FOLDER_URL = () => `${API_BASE}/folders`;
export const SUBFOLDER_URL = (folderId: number) =>
  `${FOLDER_URL()}/${folderId}/subfolders`;
export const FILE_URL = (folderId: number) => `${API_BASE}/files/${folderId}`;
export const CREATE_FILE_URL = () => `${API_BASE}/files`;
