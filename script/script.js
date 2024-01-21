// Words Levels
let wordsEasy = "Act Add After Age Ago Air All Also Any And Askt At Away Auto Avoid Baby bad bar bag back bank beat bed ball best bill bit big black blue boy box buy but call case card car can cell".split(" ");
let wordsNorm = "Campaign camera candidate center century central citizen claim class civil collection cold common come compare control cost could court create cover decade decision deep decide debate deliver degree delay delivery demand depict despite detail develop devote drive each economic effect".split(" ");
let wordsHard = "Example Everything felling father forward former front fund full future game gas generation general government happen health however husband important icluding improve investment knowledge knapsack Knowledgeable Kerchief krypton land language leader letter likely local love loss low lot long Magazine".split(" ");

// Add Levels 
let levels = {
    "easy": {
        "words": wordsEasy,
        "second": 10
    },
    "normal": {
        "words": wordsNorm,
        "second": 5
    },
    "hard": {
        "words": wordsHard,
        "second": 3
    }
};

// Default Level 
let defaultLevelName;
let defaultLevelSeconds;

// Catch Element 
let lvlNameSpan    = document.querySelector(".game-info .lvl-name");
let lvlSecondSpan  = document.querySelector(".game-info .lvl-second");
let SelectLevel    = document.querySelector(".choose-level select");
let startGameBtn   = document.querySelector(".start-game span");
let theWord        = document.querySelector(".the-word");
let inputWord      = document.querySelector(".input-word");
let upcomingWord   = document.querySelector(".upcoming-word");
let gameTimeSpan   = document.querySelector(".game-footer .second");
let gotScoreSpan   = document.querySelector(".game-footer .total-game .got")
let totalWordsSpan = document.querySelector(".game-footer .total-game .total-words");


// Count Down Var
let countUp;

checkLevelChoose();

// Check Level Choose
function checkLevelChoose() {
    getValue();
    getLvlData(defaultLevelName, defaultLevelSeconds);
    SelectLevel.onchange = function () {
        getValue();
        getLvlData(defaultLevelName, defaultLevelSeconds);
    }
}

// Get Value For Level
function getValue() {
    let selectValue = SelectLevel.value;
    defaultLevelName = selectValue;
    defaultLevelSeconds = levels[defaultLevelName].second;
}

// Get Level Data
function getLvlData(lvlName, lvlSecond) {
    lvlNameSpan.innerHTML = `[ ${lvlName} ]`;
    lvlSecondSpan.innerHTML = `[ ${lvlSecond} ]`;

    // Total Words Span
    totalWordsSpan.innerHTML = levels[lvlName].words.length;

    // Time Lef Span
    gameTimeSpan.innerHTML = lvlSecond;

    // Remove Paste In Input
    inputWord.onpaste = () => false;
}

// When Click Start Game 
startGameBtn.onclick = function () {
    this.remove();
    inputWord.value = "";
    inputWord.focus();

    SelectLevel.disabled = true;
    genWords(defaultLevelName);
}

// Genrator Words
function genWords(lvlName) {
    theWord.innerHTML = "";
    let wordsLevel = levels[lvlName].words;
    let randomWord = wordsLevel[Math.floor(Math.random() * wordsLevel.length)];

    let wordIndex = wordsLevel.indexOf(randomWord);

    wordsLevel.splice(wordIndex, 1);

    upcomingWord.innerHTML = "";

    // Gen Upcoming Words
    for (let i = 0; i < wordsLevel.length; i++) {
        let wordSpan = document.createElement('span');
        let wordText = document.createTextNode(wordsLevel[i]);

        wordSpan.appendChild(wordText);

        upcomingWord.appendChild(wordSpan);
    }

    // Get Word 
    let wordSpan = document.createElement("span");
    let wordSpanTxt = document.createTextNode(randomWord);

    wordSpan.appendChild(wordSpanTxt);

    theWord.appendChild(wordSpan);

    startGame(defaultLevelSeconds , lvlName);
}

// Start Game
function startGame(lvlSecond, lvlName) {
    gameTimeSpan.innerHTML = lvlSecond;

    let startCountDown = setInterval(() => {
        startTime();
        if(countUp == true) {
            gameTimeSpan.innerHTML--;
        }

        if (gameTimeSpan.innerHTML == 0) {
            clearInterval(startCountDown);

            let theWordSpan = document.querySelector(".the-word span");
            if (inputWord.value.toLowerCase() === theWordSpan.innerHTML.toLowerCase()) {
                inputWord.value = "";
                gotScoreSpan.innerHTML++;

                if (levels[lvlName].words.length > 0) {
                    genWords(lvlName);
                
                } else {

                    Swal.fire({
                        icon: "success",
                        title: "Your Are Win",
                        text: `Your Level On ${lvlName}`,
                        showConfirmButton: false,
                        timer: 3500
                    });

                    // Save Score Contain Day And Score
                    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    let dateNow = new Date();
                    let dayName = days[dateNow.getDay()];

                    window.sessionStorage.setItem("Game-Details" , `Your Score : ${gotScoreSpan.innerHTML} | You Got Score In : ${dayName}`);
                }

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Game Over",
                    text: `Your Level On ${lvlName}`,
                    showConfirmButton: false,
                    timer: 3500
                });

            }
        }
    }, 1000)
}

// Start Count Down
function startTime() {
    inputWord.oninput = function () {
        countUp = true;
    }
}