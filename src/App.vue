<template>
  <NavBar />
  <div id="content">
    <RouterView />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
import { onMounted } from 'vue';

// Preventing unstyled content flash on initial load
onMounted(() => {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      const element = document.getElementById("app")
      if (!element) {
        console.log("The document is ready, but the app was not found. Something went very wrong.")
      } else {
        element.removeAttribute("style")
      }
    }
  }
})
</script>

<style>
#content {
  flex: 1 1 auto;

  width: 100%;
  margin: 0;
}
@media (min-width: 1000px) {
  #content {
    max-width: 1000px;
    margin: 0 auto;
  }
}

.text-block {
  background-color: var(--background);

  margin: var(--spacer);
  margin-top: 0;
  box-shadow: var(--shadow);
  border-radius: 20px;
  padding: var(--spacer);

  cursor: default;
  transition: box-shadow 500ms ease-in-out;
}

.header-text {
  font-size: var(--font-size-h);
  font-weight: var(--font-weight-b);
  cursor: default;
}
.title-text {
  font-size: var(--font-size-t);
  font-weight: var(--font-weight-b);
  cursor: default;
}

.text-block * {
  transition: text-shadow 200ms ease-in-out;
}
.text-block:hover {
  text-shadow: 0 0 15px rgb(70, 35, 35);
}
</style>
