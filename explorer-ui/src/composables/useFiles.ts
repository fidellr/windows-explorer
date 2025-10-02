import { getFilesByFolder } from "@/api/fileApi";
import { File } from "@/types/file";
import { Folder } from "@/types/folder";
import { Ref, ref, watch } from "vue";

export function useFiles(selectedFolder: Ref<Folder | null>) {
  const files = ref<File[]>([]);
  const loadingFiles = ref(false);
  const errorFiles = ref<string | null>(null);

  const loadFileByFolderId = async (folderId?: string) => {
    if (!folderId) return;
    files.value = await getFilesByFolder(parseInt(folderId));
  };

  watch(
    () => selectedFolder.value,
    async (folder) => {
      if (!folder) {
        files.value = [];
        return;
      }
      loadingFiles.value = true;
      errorFiles.value = null;
      try {
        await loadFileByFolderId(folder.id);
      } catch (e: any) {
        errorFiles.value = e.message;
      } finally {
        loadingFiles.value = false;
      }
    },
    { immediate: true }
  );

  return { files, loadingFiles, errorFiles, loadFileByFolderId };
}
