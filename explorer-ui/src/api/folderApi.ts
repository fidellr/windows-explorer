import axios from "axios";
import { FOLDER_URL, SUBFOLDER_URL } from "./endpoints";

export async function getAllFolders() {
  try {
    const res = await axios.get(FOLDER_URL());
    return res.data;
  } catch (error) {
    throw new Error("Failed to load folders");
  }
}

export async function getSubFolders(folderId: number) {
  try {
    const res = await axios.get(SUBFOLDER_URL(folderId));
    return res.data;
  } catch (error) {
    throw new Error("Failed to load subfolders");
  }
}
