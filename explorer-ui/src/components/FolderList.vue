<script setup lang="ts">
import type { Folder, File } from "@/types/folder";

const props = defineProps<{ subFolders: (Folder | File)[] }>();
</script>

<template>
    <div>
        <ul>
            <li v-for="item in props.subFolders" :key="item.id">
                <span v-if="'parentId' in item">📂 {{ item.name }}</span>
                <span v-else>📄 {{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>
