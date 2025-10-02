import { ref } from "vue";
import { getAllFolders, getSubFolders } from "@/api/folderApi";
import { Folder } from "@/types/folder";

export function useFolders() {
  const folders = ref<Folder[]>([]);
  const selectedFolder = ref<Folder | null>(null);
  const subFolders = ref<Folder[]>([]);
  const breadcrumb = ref<Folder[]>([]);

  const loadRootFolders = async () => {
    folders.value = await getAllFolders();
  };

  const selectFolder = async (folder: Folder) => {
    selectedFolder.value = folder;
    const folderId = parseInt(folder.id)
    subFolders.value = await getSubFolders(folderId);

    const path: Folder[] = [];
    let current: Folder | null = folder;
    while (current) {
      path.unshift(current);
      current = findParent(current);
    }
    breadcrumb.value = path;
  };

  // Utilities
  const findParent = (folder: Folder): Folder | null => {
    if (!folder.parentId) return null;

    const stack: Folder[] = [...folders.value];
    while (stack.length) {
      const f = stack.pop()!;
      if (f.id === folder.parentId) return f;
      if (f.children) stack.push(...f.children);
    }
    return null;
  };

  const navigateTo = async (folder: Folder) => {
    await selectFolder(folder);
  };

  return {
    folders,
    selectedFolder,
    subFolders,
    breadcrumb,
    loadRootFolders,
    selectFolder,
    navigateTo,
  };
}
