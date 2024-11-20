<script setup>
import { ref, computed, watch } from 'vue'
import { Board } from '@/core//board/board'
import PlayerComponent from '@/components/PlayerComponent.vue';
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';
import InitScreen from '@/components/InitScreen.vue';
import BoardComponent from '@/components/BoardComponent.vue';
import TooltipComponent from './TooltipComponent.vue';
import { Player } from '@/core/player/player';
import { WordService } from '@/services/wordService/wordService';
import { Game } from '@/core/game/game';

const game = ref(null)
const board = ref(null)
const initWord = ref('слово')
const playersAmount = ref(2)

const players = ref([])

const wordService = new WordService()

const createPlayers = () => {
    for (let i = 1; i <= playersAmount.value; i += 1) {
        players.value.push(new Player(i))
    }
}

const setBoard = (initWord) => {
    board.value = new Board(initWord.toUpperCase())
}

const setGame = () => {
    game.value = new Game(board.value, players.value, wordService)
}

const startGame = () => {
    createPlayers()
    setBoard(initWord.value);
    setGame()
    game.value.startGame()
}

const cellsMap = computed(() => board.value?.state.cellsMap);
const placedCell = computed(() => board.value?.state.placedCell);
const selection = computed(() => board.value?.state.selectedCells.length > 0)

const gameStarted = computed(() => game.value?.state.gameStarted);
const gameEnded = computed(() => game.value?.state.gameEnded);
const currentPlayer = computed(() => players.value[game.value?.state.currentPlayerIndex].getPlayerName);

const canPlaceLetter = (x, y) => {
    return board.value.canPlaceLetter(x, y)
}

const placeLetter = (event, x, y) => {
    const letter = event.dataTransfer.getData('letter')
    board.value.placeLetter(x, y, letter)
};

const togglePick = (x, y) => {
    if (gameStarted.value) {
        board.value.togglePick(x, y)
    }
}

const submitWord = () => {
    game.value.submitWord()
}

const unpickWord = () => {
    board.value.unpickWord()
}

const unplaceLetter = () => {
    board.value.unplaceLetter()
};

const skipTurn = () => {
    game.value.skipTurn()
}

const blockSubmit = computed(() => {
    return game.value.blockSubmit()
});

const tooltipVisible = ref(false);

const showTooltip = () => {
    tooltipVisible.value = true;
};

const hideTooltip = () => {
    tooltipVisible.value = false;
};

const resetGame = () => {
    board.value = null;
    players.value = [];
    game.value = null;
}

watch(gameEnded, val => {
    if (val) {
        resetGame()
    }
});

</script>

<template>
    <div class="wrapper">
        <InitScreen v-if="!gameStarted" @start="startGame" v-model:players="playersAmount" v-model:word="initWord" />

        <div v-else>
            <BoardComponent :cells-map="cellsMap" :init-word="initWord" :is-playing="gameStarted"
                @check="canPlaceLetter" @place="placeLetter" @pick="togglePick" />
            <div class="button-wrapper">
                <div class="relative">
                    <button class="button disabled:text-[#bebebe]" @click="submitWord" :disabled="blockSubmit"
                        @mouseenter="showTooltip" @mouseleave="hideTooltip">Отправить слово</button>
                    <TooltipComponent v-if="blockSubmit" :show="tooltipVisible" :text="blockSubmit" />
                </div>
                <button class="button disabled:text-[#bebebe] disabled:pointer-events-none" @click="unpickWord"
                    :disabled="!selection">Сбросить выделение</button>
                <button class="button disabled:text-[#bebebe] disabled:pointer-events-none" @click="unplaceLetter"
                    :disabled="!placedCell">Убрать букву</button>
                <button class="button" @click="skipTurn">Пропустить ход</button>
            </div>

            <VirtualKeyboard class="mb-12" />

            <div class="flex justify-center">
                <PlayerComponent v-for="player in players" :key="player.getPlayerName" :player="player"
                    :class="{ 'bg-lime-500/25 duration-500': player.getPlayerName === currentPlayer }"
                    @click="player.totalScore = 0" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    @apply w-full h-full flex flex-col justify-center items-center mt-12 p-6;
}

.button-wrapper {
    @apply flex gap-4 mt-12 justify-center mb-12;
}

.button {
    @apply rounded-full border px-4 py-1 hover:border-lime-400 hover:bg-lime-100/50 duration-300 disabled:hover:border-[#ECECEC] disabled:hover:bg-transparent;
}
</style>
