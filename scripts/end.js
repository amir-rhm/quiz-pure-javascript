const start = () => {
  const userScore = document.querySelector(".user__score")
  const userNameElement = document.querySelector("#input__name")
  const saveBtn = document.querySelector(".save__quiz")
  const searchParams = new URLSearchParams(location.search)
  const score = searchParams.get("score")

  const getQuizzes = JSON.parse(localStorage.getItem("quizzes")) || []

  userScore.textContent = score

  const saveHandler = () => {
    const newQuiz = { userName: userNameElement.value, userScore: score }
    getQuizzes.push(newQuiz)
    localStorage.setItem("quizzes", JSON.stringify(getQuizzes))
    userNameElement.value = ""
  }

  saveBtn.addEventListener("click", saveHandler)
}

window.addEventListener("DOMContentLoaded", start)
