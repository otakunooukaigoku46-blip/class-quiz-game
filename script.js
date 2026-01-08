// ⭐ 替換成你 Apps Script 部署後的 URL
const sheetUrl = "https://script.google.com/macros/s/AKfycbyJIARJbCYSCpLMhDggBvqK0d5aaIjbTFdr2GnLYyaped_7h7j3eHRwHaRZdbN1O-RmAg/exec";

let questions = [];
let currentIndex = 0;

// 抓 JSON 題庫
fetch(sheetUrl)
  .then(res => res.json())
  .then(data => {
    questions = data.filter(q => q.hints.length === 4 && q.answer); // 過濾不完整題目
    if (questions.length === 0) {
      alert("⚠️ 題庫讀取失敗，請檢查 Apps Script");
      return;
    }
    shuffleArray(questions);
    showQuestion();
  })
  .catch(err => {
    alert("❌ 無法讀取題庫，請檢查連結");
    console.error(err);
  });

// 顯示題目
function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("hint1").textContent = q.hints[0];
  document.getElementById("hint2").textContent = q.hints[1];
  document.getElementById("hint3").textContent = q.hints[2];
  document.getElementById("hint4").textContent = q.hints[3];
  document.getElementById("answer").style.display = "none";
  document.getElementById("question-number").textContent =
    `第 ${currentIndex + 1} 題 / 共 ${questions.length} 題`;
}

function showAnswer() {
  document.getElementById("answer").textContent =
    "答案是：" + questions[currentIndex].answer;
  document.getElementById("answer").style.display = "block";
}

function nextQuestion() {
  currentIndex = (currentIndex + 1) % questions.length;
  showQuestion();
}

function restartGame() {
  shuffleArray(questions);
  currentIndex = 0;
  showQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
