const dataFormatting = questionsData => {
  return questionsData.map(questionItem => {
    const newObject = { question: questionItem["question"] }
    const answers = [...questionItem["incorrect_answers"]]
    const correctAnswerIndex = Math.floor(Math.random() * 4)
    answers.splice(correctAnswerIndex, 0, questionItem["correct_answer"])
    newObject["answers"] = answers
    newObject["correctAnswerIndex"] = correctAnswerIndex

    return newObject
  })
}

const createElement = (element, text, classes, id) => {
  const newElement = document.createElement(element)
  newElement.dataset.id = id
  newElement.textContent = text
  newElement.className = classes

  return newElement
}

export { createElement, dataFormatting }
