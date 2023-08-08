import { createRouter, createWebHistory } from "vue-router"
import miscText from "@/assets/misc.json"

const AboutView = () => import("@/views/AboutView.vue")
const ProjectView = () => import("@/views/ProjectView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: AboutView
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== "/" && to.path !== "/projects") {
    router.push({ name: "about" })
    return
  }

  // Dynamic page title
  const lang = localStorage.getItem("lang")
  let title: string
  let titles: {
    about: string
    projects: string
  }

  if (lang === "ru") {
    titles = miscText.ru.navbar.normal
  } else {
    titles = miscText.en.navbar.normal
  }

  if (to.name === "about") {
    title = titles.about
  } else if (to.name === "projects") {
    title = titles.projects
  } else {
    title = "Kutoru"
  }

  document.title = title
  next()
})

export default router
