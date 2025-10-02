<script setup lang="ts">
import { ref } from "vue";
import type { Folder } from "@/types/folder";

defineProps<{
    folders: (Folder & { children?: Folder[] })[];
    onSelect: (folder: Folder) => void;
}>();

const expanded = ref<Record<string, boolean>>({});

const toggle = (id: string) => {
    expanded.value[id] = !expanded.value[id];
};
</script>

<template>
    <ul class="folder-tree">
        <li v-for="folder in folders" :key="folder.id" @click.stop="toggle(folder.id)">
            <div class="folder-label" @click="onSelect(folder)">
                <span v-if="folder.children && folder.children.length" class="expander">
                    {{ expanded[folder.id] ? "▼" : "▶" }}
                </span>
                <span v-else class="expander-placeholder">•</span>
                📁 {{ folder.name }}
            </div>

            <FolderTree v-if="folder.children && folder.children.length && expanded[folder.id]"
                :folders="folder.children" :onSelect="onSelect" />
        </li>
    </ul>
</template>

<style scoped>
.folder-tree {
    list-style: none;
    margin: 0;
    padding-left: 15px;
}

.folder-label {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.folder-label:hover {
    background-color: #e9ecef;
}

.expander {
    display: inline-block;
    width: 16px;
    cursor: pointer;
    text-align: center;
}

.expander-placeholder {
    display: inline-block;
    width: 16px;
    opacity: 0.3;
    text-align: center;
}
</style>
