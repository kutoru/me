<template>
  <div class="text-block center">
    <span class="header-text">{{ text.title }}</span>
  </div>
  <div class="text-block">
    <span>{{ text.desc }}</span>
  </div>

  <div class="text-block" v-for="project, pi in text.projects" :key="pi">
    <span class="title-text" v-html="project.title" />
    <span class="sub-text">{{ project.start_date }} - {{ project.end_date }}</span>
    <div v-for="section, si in project.sections" :key="si">
      <div class="separator" v-html="text.section_names[si]" />
      <span v-html="section" />
    </div>
  </div>
</template>

<script setup lang="ts">
import projectsText from "@/assets/projects.json"
import { onMounted, ref } from "vue";

const lang = localStorage.getItem("lang")
let text: {
    title: string;
    desc: string;
    section_names: string[];
    projects: {
        title: string;
        start_date: string;
        end_date: string;
        sections: string[];
    }[];
}

if (lang === "ru") {
  text = projectsText.ru
} else {
  text = projectsText.en
}

const blocks = ref<Element[]>([])
const elementIndex = ref<number>(-1);

function setHighlight(element: Element) {
    const seps = element.getElementsByClassName("separator")
    for (let i = 0; i < seps.length; i++) {
      seps[i].setAttribute("style", "background-color: rgba(50, 25, 25, 0.33);")
    }

    const shadow = getComputedStyle(document.body).getPropertyValue("--shadow-h")
    element.setAttribute("style", `box-shadow: ${shadow};`)
}

function unsetHighlight(element: Element) {
  const seps = element.getElementsByClassName("separator")
  for (let i = 0; i < seps.length; i++) {
    seps[i].removeAttribute("style")
  }

  element.removeAttribute("style")
}

function searchBlocks(middle: number, extra: number) {
  for (let i = 0; i < blocks.value.length; i++) {
    const element = blocks.value[i]
    const bounds = element.getBoundingClientRect()

    if (middle >= bounds.top - extra && middle <= bounds.bottom + extra) {
      setHighlight(element)
      elementIndex.value = i
      break
    }
  }
}

function checkBlock(middle: number, extra: number) {
  const element = blocks.value[elementIndex.value]
  const bounds = element.getBoundingClientRect()

  if (middle < bounds.top - extra || middle > bounds.bottom + extra) {
    unsetHighlight(element)
    elementIndex.value = -1
  }
}

function scrollChange() {
  const middle = window.innerHeight / 2
  const extra = parseInt(getComputedStyle(document.body).getPropertyValue("--spacer")) / 2

  if (elementIndex.value > -1) {
    checkBlock(middle, extra)
  }

  if (elementIndex.value < 0) {
    searchBlocks(middle, extra)
  }
}

window.addEventListener("scroll", scrollChange, false)

onMounted(() => {
  const temp = document.getElementsByClassName("text-block")
  for (let i = 2; i < temp.length; i++) {
    blocks.value.push(temp[i])
  }
})
</script>

<style scoped>
.separator {
  background: rgba(0, 0, 0, 0.33);
  /* background: rgba(50, 25, 25, 0.33); */
  border-radius: 15px;
  text-align: center;

  transition: background 500ms ease-in-out;
}
.title-text {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.sub-text {
  color: rgba(255, 255, 255, 0.75);
  font-size: var(--font-size-s);
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>
