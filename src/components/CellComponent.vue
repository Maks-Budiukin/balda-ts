<script setup lang="ts">
import type { ICell } from '@/core/cell/types';
import { computed } from 'vue';

const props = defineProps<{
    cell: ICell
    isPlaying: boolean
}>();

const emit = defineEmits(['pick']);

const letter = computed(() => {
    return props.cell?.getLetter
})

const togglePick = (): void => {
    if (props.isPlaying) {
        emit('pick')
    }
};

</script>

<template>
    <div :class="['cell', letter ? 'bg-[#FFFFFF]' : 'bg-[#f5f5f5]', cell.isPicked ? 'bg-lime-100 rounded-sm' : 'border-[#ECECEC]']"
        @click="togglePick">

        <p v-if="letter"> {{ letter }}</p>

    </div>
</template>

<style lang="scss" scoped>
.cell {
    @apply w-10 h-10 border flex justify-center items-center cursor-pointer shadow-md duration-300;
}
</style>