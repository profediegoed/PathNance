let totalPoints = 0;

function nextQuestion(questionNumber) {
  const selectedValue = document.querySelector(`input[name="q${questionNumber}"]:checked`);
  if (selectedValue) {
    totalPoints += parseInt(selectedValue.value);
  } else {
    alert("Por favor, selecciona una opci�n.");
    return;
  }
  document.getElementById(`question${questionNumber}-container`).style.display = "none";
  const nextQuestionContainer = document.getElementById(`question${questionNumber + 1}-container`);
  if (nextQuestionContainer) {
    nextQuestionContainer.style.display = "block";
  }
}

function showResults() {
  nextQuestion(20);
  let vulnerabilityLevel = '';
  if (totalPoints >= 0 && totalPoints <= 20) {
    vulnerabilityLevel = "Bajo grado de vulnerabilidad.";
  } else if (totalPoints >= 21 && totalPoints <= 40) {
    vulnerabilityLevel = "Grado medio de vulnerabilidad.";
  } else if (totalPoints >= 41 && totalPoints <= 60) {
    vulnerabilityLevel = "Alto grado de vulnerabilidad.";
  } else if (totalPoints >= 61 && totalPoints <= 80) {
    vulnerabilityLevel = "Muy alto grado de vulnerabilidad.";
  }
  document.getElementById('result').textContent = vulnerabilityLevel;
  document.getElementById('results-container').style.display = 'block';
}
