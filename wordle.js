var row1Letters = "ABCÇDEFGĞHIİJKL";
var row2Letters = "MNOÖPRSŞTUÜVYZ";

var rows = 6;
var cols = 5;

var currRow = 0;
var currCol = 0;

var wordArr = new Array();

var isWon = false;
var isLost = false;

var allFiveLetterWords =
  "[RADYO,SEHPA,DOLAP,KALEM,KAVUN,KOPEK,MERAK,GAZAP,ROMAN,CEVIZ]";
var fiveLetterArray;
var puzzleWord;

function randomBetween(min, max) {
  if (min < 0) {
    return min + Math.random() * (Math.abs(min) + max);
  } else {
    return min + Math.random() * (max - min);
  }
}

function initFiveLetterArray() {
  fiveLetterArray = allFiveLetterWords.split(",");
}

function pickRandomWord() {
  let randomIndex = parseInt(randomBetween(0, 9));
  puzzleWord = fiveLetterArray[randomIndex];
}

function setMessage(message, type) {
  let msgDiv = document.getElementById("message");

  msgDiv.className = "message";
  //?NORMAL
  if (type == 1) {
    msgDiv.classList.add("regularMsg");
  }

  //?Success
  else if (type == 2) {
    msgDiv.classList.add("successMsg");
  }

  //?ERROR
  if (type == 3) {
    msgDiv.classList.add("errorMsg");
  }
  msgDiv.innerHTML = message;
}

function addEvents() {
  addVirtualKeyEvents();

  addKeyboardEvenets();
}

function addVirtualKeyEvents() {
  document.querySelectorAll(".keychar").forEach((theDiv) => {
    theDiv.addEventListener("click", (event) => {
      //RESTART
      if (event.target.dataset.charid == "rstt") {
        if (isWon || isLost) {
          isWon = false;
          isLost = false;
          currRow = 0;
          currCol = 0;
          pickRandomWord();
          initWordArr();
          resetPuzzlePieces();
          renderPuzzle();
          setMessage("&nbsp;", 1);
        }
      }
      if (isWon || isLost) {
        return;
      }

      if (event.target.dataset.charid == "entr") {
        rowComplete();
      } else if (event.target.dataset.charid == "crss") {
        eraseCurrRow();
      } else if (event.target.dataset.charid == "bcks") {
        eraseLastChar();
      }

      let chr = event.target.dataset.charid.charAt(0);
      if (chr >= "A" && chr <= "Z") {
        //Add character to row in puzzle cell
        addCharacter(chr);
      }
    });
  });
}

function addKeyboardEvenets() {
  document.addEventListener("keydown", function (event) {
    if (isWon || isLost) {
      return;
    }
    if (event.keyCode == 27) {
      eraseCurrRow();
    } else if (event.keyCode == 13) {
      rowComplete();
    } else if (event.keyCode == 8) {
      eraseLastChar();
    } else if (
      (event.keyCode >= 64 && event.keyCode <= 90) ||
      (event.keyCode >= 48 && event.keyCode <= 57)
    ) {
      let chr = String.fromCharCode(event.keyCode);
      //add this character to keyboard
      addCharacter(chr);
    }
  });
}

function tusKontrol(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    // Enter tuşuna basıldığında
    kutularaYaz();
  }
}

function kutularaYaz() {
  rowComplete();
}

window.addEventListener("load", (event) => {
  initFiveLetterArray();
  pickRandomWord();
  initWordArr();
  addPuzzleBlocks();
  addKeys();
  addEvents();
});
