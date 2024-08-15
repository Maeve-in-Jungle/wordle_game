let index = 0;
let attempts = 0;
const answer = "LEMON";
let correct = 0;
let timer;

function appStart() {
  const nextLine = () => {
    if (attempts === 5 || correct === 5) {
      displayGameOver();
    } else {
      attempts++;
      index = 0;
    }
  };

  const displayGameOver = () => {
    const div = document.createElement("div");
    clearInterval(timer);
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content:center; align-items:center; position:absolute; top:50vh; left:45vw; background-color:skyblue; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }

    if (index !== 0) {
      index -= 1;
    }
  };

  const handleEnterKey = () => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const alphabet = block.innerText;
      const answer_alphabet = answer[i];

      if (correct === 5) {
        gameover();
      } else {
        if (answer.includes(alphabet)) {
          if (alphabet === answer_alphabet) {
            block.style.backgroundColor = "yellowgreen";
            correct++;
          } else {
            block.style.backgroundColor = "#e5b422";
          }
        } else {
          block.style.backgroundColor = "grey";
        }
        block.style.color = "white";
      }
    }

    nextLine();
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      if (timer !== null && index === 0 && attempts === 0) {
        startTimer();
      }
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const timeH1 = document.querySelector("#time");
      const current_time = new Date();
      const flow_time = new Date(current_time - start_time);
      const minutes = flow_time.getMinutes().toString();
      const seconds = flow_time.getSeconds().toString();
      timeH1.innerText = `${minutes.padStart(2, "0")}:${seconds.padStart(
        2,
        "0"
      )}`;
    }

    //주기성
    timer = setInterval(setTime, 1000);
  };

  //startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
