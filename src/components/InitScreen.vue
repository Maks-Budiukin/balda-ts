<script setup lang="ts">
const initWord = defineModel<string>('word');
const playersAmount = defineModel<number>('players');
const emit = defineEmits(['start']);

const canStart = () => {
    if (initWord.value && initWord.value.length >= 5 && initWord.value.length <= 7) {
        emit('start')
    } else {
        window.alert('Слово должно быть от 5 до 7 букв')
    }
};
</script>

<template>
    <form @submit.prevent="canStart" class="form">
        <div>
            <div class="input-wrapper">
                <label for="word">Слово:</label>
                <input type="text" id="word" v-model="initWord" class="input">
            </div>

            <div class="input-wrapper">
                <label for="players">Количество игроков:</label>
                <input type="number" value="2" min="2" max="5" id="players" v-model="playersAmount" class="input">
            </div>
        </div>
        <button type="submit" class="button">Старт!</button>
    </form>
</template>


<style lang="scss" scoped>
.form {
    @apply w-[400px] flex gap-3 p-4 border border-[#ECECEC] rounded-lg;
}

.input-wrapper {
    @apply flex items-center justify-between gap-4 w-full mb-3;
}

.input {
    @apply px-4 py-1 border rounded-lg;
}

.button {
    @apply shrink-0 w-20 h-20 bg-slate-100 hover:bg-lime-500/25 rounded-lg duration-300;
}
</style>