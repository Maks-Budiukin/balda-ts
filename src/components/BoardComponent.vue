<script setup lang="ts">
import { computed } from 'vue'
import CellComponent from '@/components/CellComponent.vue';
import type { ICell } from '@/core/cell/types';

const props = defineProps<{
    cellsMap: ICell[][]
    initWord: string
    isPlaying: boolean
}>()

const emit = defineEmits<{
    check: [x: number, y: number]
    place: [event: DragEvent, x: number, y: number]
    pick: [x: number, y: number]
}>()

const boardStyle = computed<string>(() => {
    return `repeat(${props.initWord.length}, minmax(40px, 1fr))`
});

</script>

<template>
    <div :style="{ gridTemplateColumns: boardStyle }" class="board">
        <div v-for="(row, rowIdx) in cellsMap" :key="rowIdx">
            <CellComponent v-for="(cell, cellIdx) in row" :key="cellIdx" :cell="cell"
                @pick="emit('pick', cell.x, cell.y)" :is-playing="isPlaying"
                @dragover.prevent="emit('check', cell.x, cell.y)"
                @drop.prevent="emit('place', $event, cell.x, cell.y)" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.board {
    @apply grid w-fit mx-auto;
}
</style>