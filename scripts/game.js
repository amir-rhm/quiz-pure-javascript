import { createElement, dataFormatting } from "./helper.js"

const loader = document.querySelector(".loader__wrapper")
const questionBox = document.querySelector(".question")
const scoreText = document.querySelector(".quiz__score-text")
const questionNumber = document.querySelector(".quiz__number-text")
const nextBtn = document.querySelector(".nextBtn")

const URL = `https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple`
let dataFormatted = null
let showQuestionIndex = 0
let correctAnswerIndexGlobal = null
let score = 0
let isAcceptedAnswer = true
let isAcceptedNext = true

const start = async () => {
  try {
    const response = await fetch(URL)
    const result = await response.json()
    dataFormatted = dataFormatting(result.results)
    showQuestion(dataFormatted[showQuestionIndex])
    loadedData()
  } catch (error) {
    console.log(error)
  }
}

const showQuestion = ({ question, answers, correctAnswerIndex }) => {
  questionBox.innerHTML = ""

  const questionElement = createElement("h2", question, "question__title question__item")
  const answersElement = answers.map((answer, index) => {
    return createElement("div", answer, "answer question__item", index)
  })

  correctAnswerIndexGlobal = correctAnswerIndex

  questionBox.append(questionElement, ...answersElement)
}

const loadedData = () => {
  loader.style.display = "none"
}

const answerHandler = e => {
  if (!isAcceptedAnswer) return
  isAcceptedAnswer = false

  const target = e.target
  if (!e.target.classList.contains("answer")) return

  const targetId = +target.dataset.id
  const isCorrect = correctAnswerIndexGlobal === targetId ? true : false

  if (!isCorrect) {
    const correctAnswer = document.querySelector(`[data-id="${correctAnswerIndexGlobal}"]`)
    target.className = "answer question__item incorrect"
    correctAnswer.className = "answer question__item correct"
  } else {
    target.className = "answer question__item correct"
    score += 10
    scoreText.textContent = score
  }

  if (showQuestionIndex === 9) {
    nextBtn.textContent = "see score"
  }

  // baraye inke natane dobare javab bede va gozinei ra entekhab kone
  // questionBox.removeEventListener("click", answerHandler)

  // baraye inke majbor beshe javab bede bad betone bezane soale badi

  isAcceptedNext = true
}

const nextQuestionHandler = () => {
  if (!isAcceptedNext) return
  isAcceptedNext = false

  showQuestionIndex += 1

  if (showQuestionIndex > 9) {
    // localStorage.setItem("quiz", JSON.stringify([{ userName: "", userScore: score }]))
    location.href = `./end.html?score=${score}`
  }

  showQuestion(dataFormatted[showQuestionIndex])
  questionNumber.textContent = showQuestionIndex + 1

  // nextBtn.removeEventListener("click", nextQuestionHandler)

  isAcceptedAnswer = true
}

window.addEventListener("DOMContentLoaded", start)
questionBox.addEventListener("click", answerHandler)
nextBtn.addEventListener("click", nextQuestionHandler)
