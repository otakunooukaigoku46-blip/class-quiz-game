const DATA_URL = "https://docs.google.com/spreadsheets/d/1nl84swTkmWHoup3OamRgl9X27-kQsQryLw8egpzlO0I/gviz/tq?tqx=out:csvhttps://script.google.com/macros/s/AKfycbwTIXsh9Fhywr8A70ObdW33ob-cLRgndUfL_3oA49mNnLGNxsnkuwIl1hTJVuXNx9Pl/exec
let questions = [];
let currentIndex = -1;
let currentQuestion = null;
let usedHints = [false, false, false, false, false];
let usedIndexes = [];

// 載入題庫
fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    questions = data;
    nextQuestion();
  })
  .catch(() => {
    alert("無法讀取題庫，請檢查連結");
  });

function nextQuestion() {
  if (usedIndexes.length === questions.length) {
    alert("題目已全部完成！");
    return;
  }

  do {
    currentIndex = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.includes(currentIndex));

  usedIndexes.push(currentIndex);
  currentQuestion = questions[currentIndex];

  // 重置提示狀態
  usedHints = [false, false, false, false, false];
  document.querySelectorAll("#hint-buttons button").forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("used");
  });

  document.getElementById("hint-display").textContent = "";
  document.getElementById("answer").classList.add("hidden");
  document.getElementById("answer").textContent = currentQuestion.answer;

  updateHintCounter();
  updateProgress();
}

function showHint(index) {
  if (usedHints[index]) return;

  const hint = currentQuestion.hints[index];
  if (!hint) return;

  document.getElementById("hint-display").textContent = hint;
  usedHints[index] = true;

  const btn = document.querySelectorAll("#hint-buttons button")[index];
  btn.disabled = true;
  btn.classList.add("used");

  updateHintCounter();
}

function updateHintCounter() {
  const count = usedHints.filter(v => v).length;
  document.getElementById("hint-counter").textContent =
    `已使用提示：${count} / 5`;
}

function updateProgress() {
  document.getElementById("progress").textContent =
    `第 ${usedIndexes.length} 題 / 共 ${questions.length} 題`;
}

function toggleAnswer() {
  document.getElementById("answer").classList.toggle("hidden");
}


