<template>
    <div class="keyboard">
        <div v-for="letter in alphabet" :key="letter" class="cell" draggable="true"
            @dragstart="dragLetter($event, letter)">
            {{ letter }}
        </div>
    </div>
</template>

<script setup>
// const alphabet = Array.from({ length: 32 }, (_, i) => String.fromCharCode(1040 + i));

const alphabet = [
    "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
    "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э",
    "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"
]

const dragLetter = (event, letter) => {
    event.dataTransfer.setData('letter', letter)
};
</script>

<style scoped lang="scss">
.keyboard {
    @apply flex flex-wrap justify-center w-[480px] mx-auto;
}

.cell {
    @apply w-10 h-10 border border-[#ECECEC] [&:nth-child(18)]:w-[41px] flex justify-center items-center cursor-pointer shadow-md;
}
</style>
