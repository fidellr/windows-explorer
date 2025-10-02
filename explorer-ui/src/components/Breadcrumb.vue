<script setup lang="ts">
import type { Folder } from "@/types/folder";

const props = defineProps<{ path: Folder[] }>();
const emit = defineEmits<{ (e: "navigate", folder: Folder): void }>();

const handleClick = (folder: Folder) => {
    emit("navigate", folder);
};
</script>

<template>
    <div class="breadcrumb">
        <span v-for="(folder, i) in path" :key="folder.id" class="crumb" @click="handleClick(folder)">
            {{ folder.name }}
            <span v-if="i < path.length - 1"> / </span>
        </span>
    </div>
</template>

<style scoped>
.breadcrumb {
    margin-bottom: 10px;
    font-size: 14px;
}

.crumb {
    cursor: pointer;
    color: blue;
}

.crumb:hover {
    text-decoration: underline;
}
</style>
