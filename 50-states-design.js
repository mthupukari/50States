var statesAr = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

var tableCounter = 0;

let timerSeconds = 0;
let timerMinutes = 5;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  timer();
  displayGame();
  game();
  restart();
});

function timer() {
  timerDOM();
  if ((timerMinutes === 0 && timerSeconds === 0) === false) {
    timerIncrement();
  } else {
    document.getElementById("outcome").textContent =
      "YOU LOSE! Missed states in red:";
    addToTableWrong(statesAr);
    statesAr = [5];
    return;
  }
  setTimeout(timer, 1000);

  function timerDOM() {
    const formattedSeconds =
      timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
    document.getElementById(
      "timer"
    ).textContent = `${timerMinutes}:${formattedSeconds}`;
  }

  function timerIncrement() {
    if (timerSeconds === 0) {
      timerSeconds = 59;
      timerMinutes--;
    } else {
      timerSeconds--;
    }
  }
}

function displayGame() {
  let instructions = document.getElementById("welcome");
  instructions.style.display = "none";
  let gameStart = document.getElementById("game");
  gameStart.style.display = "block";
}

function game() {
  var score = 0;
  const inputEl = document.getElementById("input");
  inputEl.addEventListener("keyup", gameLogic);

  function clearInput() {
    document.getElementById("input").value = null;
  }

  function gameLogic(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      clearInput();
    }
    if (statesAr.length === 0) {
      let winTitle = document.createElement("h1");
      winTitle.setAttribute("id", "winTitleScreen");
      winTitle.textContent = "YOU WIN";
      document.getElementById("outcome").textContent = winTitle.textContent;
    }
    for (let i = 0; i < statesAr.length; i++) {
      if (
        document.getElementById("input").value.toLowerCase() ===
        statesAr[i].toLowerCase()
      ) {
        score++;
        document.getElementById("count").textContent = score;
        addToTable(statesAr[i]);
        statesAr.splice(i, 1);
        clearInput();
      }
    }
  }
}

function restart() {
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", function () {
    location.reload(true);
  });
}

function addToTable(state) {
  if (tableCounter === 5) {
    tableCounter = 0;
    let trEl = document.createElement("tr");
    const table = document.querySelector("tbody");
    table.appendChild(trEl);
  }

  let tdEl = document.createElement("td");
  let trArr = document.querySelectorAll("tr");
  let tr = trArr[trArr.length - 1];
  tdEl.textContent = state;
  tdEl.setAttribute("id", "correct");
  tr.appendChild(tdEl);
  tableCounter++;
}

function addToTableWrong(statesAr) {
  for (let j = 0; j < statesAr.length; j++) {
    if (tableCounter === 5) {
      tableCounter = 0;
      let trEl = document.createElement("tr");
      const table = document.querySelector("tbody");
      table.appendChild(trEl);
    }
    let tdEl = document.createElement("td");
    let trArr = document.querySelectorAll("tr");
    let tr = trArr[trArr.length - 1];
    tdEl.textContent = statesAr[j];
    tdEl.setAttribute("id", "wrong");
    tr.appendChild(tdEl);
    tableCounter++;
  }
  console.log("out");
  return;
}
