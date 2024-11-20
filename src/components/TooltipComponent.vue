<template>
    <Transition name="fade">
        <div v-if="show"
            class="absolute left-[80%] bottom-[calc(100%_+_6px)] p-2 bg-gray-800 text-white rounded-lg text-sm pointer-events-none z-50 w-full min-w-[300px]">
            <div class="w-3 h-3 bg-gray-800 rotate-45 absolute bottom-[-6px] left-[12px]"></div>
            <span>{{ text }}</span>
        </div>
    </Transition>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    text: {
        required: true,
    },
});

</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>