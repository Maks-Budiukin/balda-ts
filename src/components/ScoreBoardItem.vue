<script setup lang="ts">
import { ref } from 'vue'
import TooltipComponent from './TooltipComponent.vue';

type ScoreBoardItemType = {
    word: string,
    definition: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    item: ScoreBoardItemType
}>();

const tooltipVisible = ref<boolean>(false);

const showTooltip = (): void => {
    tooltipVisible.value = true;
};

const hideTooltip = (): void => {
    tooltipVisible.value = false;
};

</script>

<template>
    <li class="score-item">
        <span class="word-score">{{ item.word.length }}</span>
        <p>{{ item.word }}</p>

        <div class="relative">
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" class="tooltip">?</span>
            <TooltipComponent :show="tooltipVisible" :text="item.definition" />
        </div>
    </li>
</template>

<style lang="scss" scoped>
.score-item {
    @apply flex items-center gap-2;
}

.word-score {
    @apply w-6 h-6 text-xs rounded-full border flex items-center justify-center;
}

.tooltip {
    @apply flex items-center justify-center w-3 h-3 rounded-full border border-[#a0a0a0] text-[8px] text-[#A0A0A0] translate-y-[-50%] cursor-default;
}
</style>