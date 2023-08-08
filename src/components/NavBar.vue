<template>
  <div id="navbar">
    <div id="link-container">
      <RouterLink
        :to="{ name: 'about' }"
        custom
        v-slot="{ navigate }"
      >
        <div class="link" @click="navigate">
          <span class="normal">{{ text.normal.about }}</span>
          <span class="small">{{ text.small.about }}</span>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'projects' }"
        custom
        v-slot="{ navigate }"
      >
        <div class="link" @click="navigate">
          <span class="normal">{{ text.normal.projects }}</span>
          <span class="small">{{ text.small.projects }}</span>
        </div>
      </RouterLink>
    </div>

    <div class="fill" />

    <div id="lang-container">
      <div class="lang" @click="changeLang('en')">EN</div>
      <div class="lang" @click="changeLang('ru')">RU</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import miscText from "@/assets/misc.json"

const lang = localStorage.getItem("lang")
let text: {
    normal: {
        about: string;
        projects: string;
    };
    small: {
        about: string;
        projects: string;
    };
}

if (lang === "ru") {
  text = miscText.ru.navbar
} else {
  text = miscText.en.navbar
}

function changeLang(lang: string) {
  try {
    if (lang === "en") {
      localStorage.setItem("lang", "en")
    } else if (lang === "ru") {
      localStorage.setItem("lang", "ru")
    }
    location.reload()
  } catch (e) {
    console.log("Could not change the language")
    console.log(e)
  }
}
</script>

<style scoped>
#navbar {
  flex: 0 0 auto;

  display: flex;
  flex-direction: row;

  background-color: var(--background);

  width: 100%;
  height: fit-content;
  box-shadow: var(--shadow);
  margin-bottom: var(--spacer);
}

#link-container, #lang-container {
  flex: 0 0 auto;
  display: flex;
}
.link, .lang {
  flex: 0 0 auto;
  margin: var(--spacer);
  padding: 5px 10px;
  box-shadow: var(--shadow-s);
  border-radius: 10px;
  text-align: center;
  user-select: none;
  cursor: pointer;

  transition:
    color 200ms ease-in-out,
    box-shadow 200ms ease-in-out,
    text-shadow 200ms ease-in-out;
}

@media (hover: hover) {
  .link:hover, .lang:hover {
    /* color: rgb(150, 255, 255); */
    /* color: rgb(255, 200, 200); */
    box-shadow: var(--shadow-hs);
    text-shadow: 0 0 15px var(--shadow-h-color);
  }
}
.link:active, .lang:active {
  box-shadow: var(--shadow-hs);
  text-shadow: 0 0 15px var(--shadow-h-color);
}

.link {
  margin-right: 0;
}
.lang {
  margin-left: 0;
}

.fill {
  flex: 1 1 auto;
  min-width: var(--spacer);
}

.normal {
  display: none;
}
.small {
  display: inline;
}
@media (min-width: 600px) {
  .normal {
    display: inline;
  }
  .small {
    display: none;
  }
}

#navbar:hover {
  text-shadow: 0 0 15px rgb(70, 35, 35);
}
</style>
