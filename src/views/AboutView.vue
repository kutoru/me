<template>
  <div class="text-block center">
    <span class="header-text">{{ text.title }}</span>
  </div>

  <div class="text-block" v-for="section, index in text.sections" :key="index">
    <span class="title-text">{{ section.title }}</span>
    <br>
    <span v-html="section.desc" />
  </div>
</template>

<script setup lang="ts">
import aboutText from "@/assets/about.json"

const lang = localStorage.getItem("lang")
let text: {
    title: string;
    sections: {
        title: string;
        desc: string;
    }[]
}

if (lang === "ru") {
  text = aboutText.ru
} else {
  text = aboutText.en
}
</script>

<style scoped>
</style>
