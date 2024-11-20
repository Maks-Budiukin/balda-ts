<script setup>
import { computed } from 'vue'
import CellComponent from '@/components/CellComponent.vue';

const props = defineProps({
    cellsMap: {
        type: Array,
        required: true
    },
    initWord: {
        type: String,
        required: true
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['check', 'place', 'pick'])

const boardStyle = computed(() => {
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