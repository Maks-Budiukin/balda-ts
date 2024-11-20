<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    cell: {
        type: Object,
        required: true
    },
    isPlaying: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['pick']);

const togglePick = () => {
    if (props.isPlaying) {
        emit('pick')
    }
};

</script>

<template>
    <div :class="['cell', cell.getLetter ? 'bg-[#FFFFFF]' : 'bg-[#f5f5f5]', cell.isPicked ? 'bg-lime-100 rounded-sm' : 'border-[#ECECEC]']"
        @click="togglePick">

        <p v-if="cell.getLetter"> {{ cell.getLetter }}</p>

    </div>
</template>

<style lang="scss" scoped>
.cell {
    @apply w-10 h-10 border flex justify-center items-center cursor-pointer shadow-md duration-300;
}
</style>