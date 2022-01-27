const panel = document.querySelector(".panel");
const map = [];
let turn = 2;

for (let i = 0; i < 15; i++) {
  map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

const resetGame = () => {
  console.log(1);
};

const pickWinner = (array, stone) => {
  if (stone === 1) return array.join("").includes("11111") ? stone : "";
  else if (stone === 2) return array.join("").includes("22222") ? stone : "";
};

const checkRow = (r, color) => {
  return pickWinner(map[r], color);
};
const checkCol = (c, color) => {
  let check = [];
  for (let i = 0; i < 15; i++) {
    check.push(map[i][c]);
  }
  return pickWinner(check, color);
};

const checkNagativeCross = (r, c, color) => {
  let check = [];
  for (let i = 0; i < 9; i++) {
    if (
      r - 4 + i >= 0 &&
      r - 4 + i <= 14 &&
      c - 4 + i >= 0 &&
      c - 4 + i <= 14
    ) {
      check.push(map[r - 4 + i][c - 4 + i]);
    }
  }
  return pickWinner(check, color);
};
const checkPositiveCross = (r, c, color) => {
  let check = [];
  for (let i = 0; i < 9; i++) {
    if (
      r + 4 - i <= 14 &&
      r + 4 - i >= 0 &&
      c - 4 + i >= 0 &&
      c - 4 + i <= 14
    ) {
      check.push(map[r + 4 - i][c - 4 + i]);
    }
  }
  return pickWinner(check, color);
};

const checkBoard = (row, col, t) => {
  if (
    checkRow(row, t) === 1 ||
    checkCol(col, t) === 1 ||
    checkNagativeCross(row, col, t) === 1 ||
    checkPositiveCross(row, col, t) === 1
  )
    alert("흑돌 승리");
  else if (
    checkRow(row, t) === 2 ||
    checkCol(col, t) === 2 ||
    checkNagativeCross(row, col, t) === 2 ||
    checkPositiveCross(row, col, t) === 2
  )
    alert("백돌 승리");
};

const makeBoard = () => {
  const p = document.querySelector("p");
  for (let i = 0; i < 15; i++) {
    const rowTag = document.createElement("div");
    rowTag.classList.add("row");
    for (let j = 0; j < 15; j++) {
      const colTag = document.createElement("div");
      colTag.classList.add("col");

      colTag.addEventListener("mouseover", () => {
        if (map[i][j] === 0) {
          if (turn === 2) {
            colTag.classList.add("black");
          } else if (turn === 1) {
            colTag.classList.add("white");
          }
        }
      });
      colTag.addEventListener("mouseleave", () => {
        if (map[i][j] === 0) {
          if (turn === 2) {
            colTag.classList.remove("black");
          } else if (turn === 1) {
            colTag.classList.remove("white");
          }
        }
      });

      colTag.addEventListener("click", (e) => {
        if (map[i][j] === 0) {
          if (turn === 1) {
            p.innerText = "흑돌 차례";
            turn = 2;
          } else if (turn === 2) {
            turn = 1;
            p.innerText = "백돌 차례";
          }

          map[i][j] = turn;

          if (map[i][j] === 1) {
            colTag.classList.add("black");
          } else if (map[i][j] === 2) {
            colTag.classList.add("white");
          }

          checkBoard(i, j, turn);
        }
      });

      rowTag.appendChild(colTag);
    }
    panel.appendChild(rowTag);
  }
};

const init = () => {
  makeBoard();
};

init();
