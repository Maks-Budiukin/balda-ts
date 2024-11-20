<script setup>
import { ref } from 'vue'
import TooltipComponent from './TooltipComponent.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const tooltipVisible = ref(false);

const showTooltip = () => {
    tooltipVisible.value = true;
};

const hideTooltip = () => {
    tooltipVisible.value = false;
};

</script>

<template>
    <li class="score-item">
        <span class="word-score">{{ item.word.length }}</span>
        <p>{{ item.word }}</p>

        <div class="relative">
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip"
                class="flex items-center justify-center w-3 h-3 rounded-full border border-[#a0a0a0] text-[8px] text-[#A0A0A0] translate-y-[-50%] cursor-default">?</span>
            <TooltipComponent :show="tooltipVisible" :text="item.definition" />
        </div>
    </li>
</template>

<style lang="scss" scoped></style>