const DATA_URL = "https://script.google.com/macros/s/AKfycbwRxWgKMfugcZTtjOvMGoOLNSfPOxI2HUymbV7JWrIabpA98ciDE3lgEVfUteQxXPDG/exec";

let questions = [];
let currentIndex = -1;
let currentQuestion = null;
let usedHints = [false, false, false, false, false];
let usedIndexes = [];

// 讀取題庫
fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    console.log("API data:", data);
    questions = data;
    nextQuestion();
  })
  .catch(error => {
    console.error(error);
    alert("無法讀取題庫，請檢查 API");
  });

function nextQuestion() {
  if (!questions || questions.length === 0) {
    alert("目前沒有題目");
    return;
  }

  if (usedIndexes.length === questions.length) {
    alert("題目已全部完成！");
    return;
  }

  do {
    currentIndex = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.includes(currentIndex));

  usedIndexes.push(currentIndex);

  const q = questions[currentIndex];

  currentQuestion = {
    hints: q.hints || q.slice(0, 5),
    answer: q.answer || q[5]
  };

  usedHints = [false, false, false, false, false];

  document.querySelectorAll("#hint-buttons button").forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("used");
  });

  document.getElementById("hint-display").textContent = "";
  document.getElementById("answer").textContent = currentQuestion.answer;
  document.getElementById("answer").classList.add("hidden");

  updateHintCounter();
  updateProgress();
}

function showHint(index) {
  if (usedHints[index]) return;

  const hint = currentQuestion.hints[index] || "（沒有提示）";

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
    "已使用提示：" + count + " / 5";
}

function updateProgress() {
  document.getElementById("progress").textContent =
    "第 " + usedIndexes.length + " 題 / 共 " + questions.length + " 題";
}

function toggleAnswer() {
  document.getElementById("answer").classList.toggle("hidden");
}


