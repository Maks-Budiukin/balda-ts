<script setup lang="ts">
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
import type { GameState, IGame } from '@/core/game/types';
import type { IBoard, IBoardState } from '@/core/board/types';
import type { IPlayer } from '@/core/player/types';
import type { IWordService } from '@/services/wordService/types';


const game = ref<IGame | null>(null)
const board = ref<IBoard | null>(null)
const initWord = ref<string>('слово')
const playersAmount = ref<number>(2)

const players = ref<IPlayer[]>([])

const wordService: IWordService = new WordService()

const createPlayers = (): void => {
    for (let i = 1; i <= playersAmount.value; i += 1) {
        players.value.push(new Player(i))
    }
}

const setBoard = (initWord: string): void => {
    board.value = new Board(initWord.toUpperCase())
}

const setGame = (): void => {
    if (board.value) {
        const newGame = new Game(board.value, players.value, wordService)
        game.value = newGame
    }
}

const startGame = (): void => {
    createPlayers()
    setBoard(initWord.value);
    setGame()
    if (game.value) {
        game.value.startGame()
    }
}

const boardState = computed<IBoardState | undefined>(() => board.value?.state);
const gameState = computed<GameState | undefined>(() => game.value?.state);

const gameEnded = computed<boolean | undefined>(() => gameState.value?.gameEnded);
const currentPlayer = computed<string | undefined>(() => {
    if (game.value) {
        return players.value[game.value.state.currentPlayerIndex].getPlayerName
    }
    else {
        return undefined
    }
});

const canPlaceLetter = (x: number, y: number) => {
    if (board.value) {
        return board.value.canPlaceLetter(x, y)
    }
}

const placeLetter = (event: DragEvent, x: number, y: number) => {
    const letter = event.dataTransfer?.getData('letter')
    if (letter && board.value) {
        board.value.placeLetter(x, y, letter)
    }
};

const togglePick = (x: number, y: number): void => {
    if (board.value && gameState.value?.gameStarted) {
        board.value.togglePick(x, y)
    }
}

const submitWord = (): void => {
    if (game.value) {
        game.value.submitWord()
    }
}

const unpickWord = (): void => {
    if (board.value) {
        board.value.unpickWord()
    }

}

const unplaceLetter = (): void => {
    if (board.value) {
        board.value.unplaceLetter()
    }
};

const skipTurn = (): void => {
    if (game.value) {
        game.value.skipTurn()
    }
}

const blockSubmit = computed<boolean | string | undefined>(() => {
    if (game.value) {
        return game.value.blockSubmit()
    } else {
        return undefined
    }

});

const tooltipVisible = ref<boolean>(false);

const showTooltip = (): void => {
    tooltipVisible.value = true;
};

const hideTooltip = (): void => {
    tooltipVisible.value = false;
};

const resetGame = (): void => {
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
        <InitScreen v-if="!gameState?.gameStarted" @start="startGame" v-model:players="playersAmount"
            v-model:word="initWord" />

        <div v-else>
            <BoardComponent v-if="boardState" :cells-map="boardState?.cellsMap || []" :init-word="initWord"
                :is-playing="gameState.gameStarted" @check="canPlaceLetter" @place="placeLetter" @pick="togglePick" />
            <div class="button-wrapper">
                <div class="relative">
                    <button class="button disabled:text-[#bebebe]" @click="submitWord"
                        :disabled="typeof blockSubmit === 'string'" @mouseenter="showTooltip"
                        @mouseleave="hideTooltip">Отправить слово</button>
                    <TooltipComponent v-if="typeof blockSubmit === 'string'" :show="tooltipVisible"
                        :text="blockSubmit" />
                </div>
                <button class="button disabled:text-[#bebebe] disabled:pointer-events-none" @click="unpickWord"
                    :disabled="boardState && !(boardState?.selectedCells.length > 0)">Сбросить
                    выделение</button>
                <button class="button disabled:text-[#bebebe] disabled:pointer-events-none" @click="unplaceLetter"
                    :disabled="!boardState?.placedCell">Убрать букву</button>
                <button class="button" @click="skipTurn">Пропустить ход</button>
            </div>

            <VirtualKeyboard class="mb-12" />

            <div class="flex justify-center">
                <PlayerComponent v-for="player in players" :key="player.getPlayerName" :player="player"
                    :class="{ 'bg-lime-500/25 duration-500': player.getPlayerName === currentPlayer }" />
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
