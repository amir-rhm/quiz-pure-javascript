const start = () => {
  const linksBox = document.querySelector(".links")

  const difficultyHandler = e => {
    const target = e.target
    if (!target.classList.contains("link")) return

    const dataDifficulty = target.dataset.difficult
    
  }

  linksBox.addEventListener("click", difficultyHandler)
}

window.addEventListener("DOMContentLoaded", start)
