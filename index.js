const startBtn = document.getElementById("startBtn");
const quizMainSection = document.getElementById("quiz-main-section");
const quizStartSection = document.getElementById("quiz-start-section");
const quizModal = document.getElementById("quizModal");
const quizBtn = document.getElementById("quiz-btn");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const emotionRadios = document.getElementById("emotion-radios");
const quizForm = document.getElementById("quizForm");
const modalInnerP = document.getElementById("modal-inner-p");

startBtn.addEventListener("click", () => {
  quizMainSection.style.display = "block";
  quizStartSection.style.display = "none";
});

const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach((radio) => {
  radio.addEventListener("change", function (e) {
    // 모든 라디오 버튼에서 highlight 클래스를 제거
    radios.forEach((r) => {
      const parentEl = r.parentElement;
      parentEl.classList.remove("highlight");
    });

    // 현재 선택된 라디오 버튼의 부모에 highlight 클래스를 추가
    const selectedParentEl = e.target.parentElement;
    selectedParentEl.classList.add("highlight");
  });
});

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const score = match();
  quizStartSection.style.display = "none";
  //   modalText.textContent = `당신의 점수는 ${score}점입니다!`;
  modalText.style.fontSize = "2em";
  modal.style.display = "block";

  animateScore(score);
  function animateScore(finalScore) {
    let current = 0;
    const duration = 4000; // 1초
    const interval = 30;
    const increment = Math.ceil(finalScore / (duration / interval));
    const scoreElement = document.getElementById("modal-text");

    const counter = setInterval(() => {
      current += increment;
      if (current >= finalScore) {
        current = finalScore;
        clearInterval(counter);
      }
      scoreElement.textContent = `당신의 점수는 ${current}점입니다!`;
    }, interval);
  }

  setTimeout(() => {
    modalInnerP.innerText = `경품 응모 시 스타벅스 커피 증정!`;

    modalText.innerHTML = `
      <form class="submit-form" id="submit-form">
       <div class="form-group">
    <label for="name">이름:</label>
    <input type="text" id="name" required>
  </div>
    <div class="form-group">
    <label for="phone">연락처:</label>
    <input type="tel" id="phone" required>
  </div>        
      <div class="form-group">
    <label for="mail">이메일:</label>
    <input type="email" id="mail" required>
  </div>  
        <button class="submit-btn" type="submit">응모하기</button>
      </form>
    `;
    modalText.style.fontSize = "1em";
    document.getElementById("modal-inner-img").src = "images/images.jpg";

    const submitForm = document.getElementById("submit-form");
    submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("mail").value.trim();
      if (!name) {
        alert("이름을 입력해주세요.");
        return;
      }

      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phone)) {
        alert("연락처는 숫자만 10~11자리로 입력해주세요.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return;
      }

      alert("응모가 완료되었습니다!");
      document.getElementById("modal-close-btn").disabled = false;
    });
  }, 3000);
});

const modalCloseBtn = document.getElementById("modal-close-btn");
modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none"; // 모달을 숨깁니다.
});

function match() {
  let score = 0;
  const correctAnswer = "2";

  for (let i = 0; i < 5; i++) {
    const selectedAnswers = document.querySelector(
      `input[name="q${i}"]:checked`
    );
    if (selectedAnswers) {
      const userAnswer = selectedAnswers.value;
      if (userAnswer === correctAnswer) {
        score++;
      }
    }
  }

  return score;
}

// quizBtn.addEventListener("click", scoremodal);

// function scoremodal(score) {
//   quizModal.innerHTML = `
//     <div class="modal-content">
//       <h2>🎉 당신의 점수는...</h2>
//       <p id="scoreCount">0점</p>
//     </div>
//   `;
//   quizModal.style.display = "block";

//   let count = 0;
//   const interval = setInterval(() => {
//     count++;
//     document.getElementById("scoreCount").textContent = `${count}점`;
//     if (count >= score) clearInterval(interval);
//   }, 50);
//   function count() {}
// }
