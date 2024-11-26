<script setup lang="ts">
import type { IPlayer } from '@/core/player/types';
import ScoreBoardItem from './ScoreBoardItem.vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    player: IPlayer
}>();

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
</style>