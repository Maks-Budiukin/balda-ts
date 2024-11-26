<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    show: boolean
    text: string
}>();
</script>


<template>
    <Transition name="fade">
        <div v-if="show" class="tooltip-frame">
            <div class="quotation-corner"></div>
            <span>{{ text }}</span>
        </div>
    </Transition>
</template>


<style scoped lang="scss">
.tooltip-frame {
    @apply absolute left-[80%] bottom-[calc(100%_+_6px)] p-2 bg-gray-800 text-white rounded-lg text-sm pointer-events-none z-50 w-full min-w-[300px];
}

.quotation-corner {
    @apply w-3 h-3 bg-gray-800 rotate-45 absolute bottom-[-6px] left-[12px];
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>