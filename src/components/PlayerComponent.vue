<script setup>
import ScoreBoardItem from './ScoreBoardItem.vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    player: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="wrapper">
        <h2 class="mb-4">{{ player.getPlayerName }}</h2>
        <p class="font-bold mb-2">ВСЕГО: {{ player.totalScore }}</p>

        <ul>
            <ScoreBoardItem v-for="(item, idx) in player.scoreBoard" :key="idx" :item="item" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    @apply p-4 rounded-lg flex-1 basis-[20%];
}

.score-item {
    @apply flex items-center gap-2;
}

.word-score {
    @apply w-6 h-6 text-xs rounded-full border flex items-center justify-center;
}
</style>