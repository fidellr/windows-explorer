import axios from "axios";
import { CREATE_FILE_URL, FILE_URL } from "./endpoints";
// import { File } from "@/types/file";

export async function getFilesByFolder(folderId: number) {
  const res = await axios.get(FILE_URL(folderId));
  try {
    return res.data;
  } catch (error) {
    throw new Error(`Failed to load files for folder ${folderId}`);
  }
}

// export async function createFile(
//   folderId: number,
//   name: string,
//   sizeBytes = 0
// ) {
//   try {
//     const res = axios.post(CREATE_FILE_URL(), { folderId, name, sizeBytes });
//     return (await res).data;
//   } catch (error) {
//     throw new Error(`Failed to create file for folder ${folderId}`);
//   }
// }
