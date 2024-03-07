function initWordArr() {
  for (let i = 0; i < rows; i++) {
    wordArr[i] = new Array();
  }
}

function addCharacter(aChar) {
  //* if the number of rows has exceeded, don't do anything
  //*Simply return
  if (currRow >= rows) {
    return;
  }

  //* if the number of rows has exceeded, don't do anything
  //*Simply return

  if (currCol >= cols) {
    return;
  }
  wordArr[currRow][currCol] = aChar;
  renderPuzzle();

  currCol++;
}

function eraseLastChar() {
  //*if there are no more columns to deduct , simply return
  if (currCol <= 0) {
    return;
  }
  currCol--;
  wordArr[currRow][currCol] = undefined;
  renderPuzzle();
}

function eraseCurrRow() {
  wordArr[currRow] = [];
  currCol = 0;
  setMessage("&nbsp;", 1);
  renderPuzzle();
}

function rowComplete() {
  //* if the number of rows has exceeded,dont do anything    //*Simpyl return
  if (currRow >= rows) {
    return;
  }
  //* if the word is not yet complete ,dont do anything     //*Simpyl return
  if (wordArr[currRow].lenght < cols) {
    return;
  }
  setMessage("&nbsp", 1);
  // ?GET THE TYPED WORD FİRST
  let typedWord = wordArr[currRow].join("");
  //check if it is a valid word first
  if (fiveLetterArray.indexOf(typedWord) == -1) {
    setMessage("Not a valid word.", 3);
    return;
  }
  //Check cell by cell
  for (let i = 0; i < wordArr[currRow].length; i++) {
    let puzzleLetter = puzzleWord.charAt(i);
    let typedLetter = wordArr[currRow][i];
    let cellDiv = document.getElementById("cell_" + currRow + "_" + i);
    let keybDiv = document.getElementById("char_" + typedLetter);

    if (puzzleLetter == typedLetter) {
      cellDiv.className = "cell";
      cellDiv.classList.add("rightplace");

      keybDiv.className = "keychar";
      keybDiv.classList.add("rightplace");
    } else if (puzzleWord.indexOf(typedLetter) != -1) {
      cellDiv.classList.add("rightLetter");
      keybDiv.classList.add("rightletter");
    } else if (puzzleWord.indexOf(typedLetter) == -1) {
      cellDiv.classList.add("notpresent");
      keybDiv.classList.add("notpresent");
    }
  }
  if (typedWord == puzzleWord) {
    isWon = true;
    setMessage("You WON !!!!", 2);
  }
  if (currRow == rows - 1 && !isWon) {
    isLost = true;
    setMessage("You Lost. Puzzle word was :" + puzzleWord, 3);
  }

  renderPuzzle();
  currRow++;
  currCol = 0;
}
