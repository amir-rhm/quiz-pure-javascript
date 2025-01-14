import { createElement, dataFormatting } from "./helper.js"

const start = () => {
  const menu = document.querySelector(".menu")
  const getQuizzes = JSON.parse(localStorage.getItem("quizzes")) || []

  getQuizzes.sort((a, b) => b["userScore"] - a["userScore"])

  const quizzesElement = getQuizzes.map((quiz, key) => {
    const liItem = createElement("li", "", "menu__item")
    const divWrapper = createElement("div", "", "item__wrapper")
    const itemNum = createElement("span", key + 1, "item__num")
    const itemName = createElement("span", quiz["userName"], "item__name")
    const itemScore = createElement("span", quiz["userScore"], "item__score")

    divWrapper.append(itemNum, itemName)
    liItem.append(divWrapper, itemScore)

    return liItem
  })

  menu.append(...quizzesElement)
}

window.addEventListener("DOMContentLoaded", start)
