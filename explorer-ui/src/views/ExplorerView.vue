<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import FolderTree from "@/components/FolderTree.vue";
import FolderList from "@/components/FolderList.vue";
import { useFolders } from "@/composables/useFolders";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Folder } from "@/types/folder";
import { buildTree } from "@/utils/buildTree";
import { useFiles } from "@/composables/useFiles";

const { folders, selectedFolder, subFolders, breadcrumb, loadRootFolders, selectFolder, navigateTo } = useFolders();
const { files, loadingFiles, errorFiles } = useFiles(selectedFolder)

onMounted(loadRootFolders);

const folderTree = computed(() => buildTree(folders.value));

const handleSelect = (folder: Folder) => {
    selectFolder(folder);
};


</script>

<template>
    <div class="explorer">
        <div class="left-panel">
            <h3>Folders</h3>
            <FolderTree :folders="folderTree" :onSelect="handleSelect" />
        </div>

        <div class="right-panel">
            <Breadcrumb :path="breadcrumb" @navigate="navigateTo" />
            <FolderList :subFolders="subFolders" />

            <!-- Files -->
            <div class="files">
                <h4 v-if="files.length">📄 Files</h4>
                <div v-if="loadingFiles">Loading files...</div>
                <div v-if="errorFiles" class="text-red-500">{{ errorFiles }}</div>
                <ul v-if="files.length">
                    <li v-for="file in files" :key="file.id">
                        📄 {{ file.name }} ({{ file.sizeBytes }} bytes)
                    </li>
                </ul>
                <!-- <div v-if="!files.length && !selectedFolder?.id && !loadingFiles && !errorFiles">
                    <em>No files in this folder</em>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.explorer {
    display: flex;
    height: 100vh;
}

.left-panel {
    width: 25%;
    border-right: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
}

.right-panel {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.files > h4 {
    margin-bottom: 10px;
}
.files > ul {
    margin-top: 0px;
}
</style>