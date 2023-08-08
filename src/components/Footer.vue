<template>
  <div id="footer">
    <span class="footer-text" v-html="text" />
  </div>
</template>

<script setup lang="ts">
import miscText from "@/assets/misc.json"

const lang = localStorage.getItem("lang")
let text: string

if (lang === "ru") {
  text = miscText.ru.footer
} else {
  text = miscText.en.footer
}
</script>

<style scoped>
#footer {
  flex: 0 0 auto;

  background-color: var(--background);

  height: fit-content;
  width: 100%;
  box-shadow: var(--shadow);
  text-align: center;
}
.footer-text {
  margin: 10px;
  cursor: default;
  transition: text-shadow 200ms ease-in-out;
}
#footer:hover {
  text-shadow: 0 0 15px rgb(70, 35, 35);
}
</style>
