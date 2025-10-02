import type { Folder } from "@/types/folder";

export function buildTree(
  folders: Folder[]
): (Folder & { children?: Folder[] })[] {
  const map = new Map<string, Folder & { children: Folder[] }>();
  folders.forEach((f) => map.set(f.id, { ...f, children: [] }));

  const roots: (Folder & { children: Folder[] })[] = [];

  map.forEach((folder) => {
    if (!folder.parentId) {
      roots.push(folder);
    } else {
      const parent = map.get(folder.parentId);
      if (parent) parent.children.push(folder);
    }
  });

  return roots;
}
