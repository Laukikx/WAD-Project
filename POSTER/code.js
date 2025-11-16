const questions = [
    {
        q:"Who is known as the God of Cricket?",
        options:["Virat Kohli","MS Dhoni","Sachin Tendulkar","Rohit Sharma"],
        correct:2
    },
    {
        q:"How many players are on a cricket team?",
        options:["9","10","11","12"],
        correct:2
    },
    {
        q:"Which country won the first Cricket World Cup?",
        options:["India","West Indies","Australia","England"],
        correct:1
    },
    {
        q:"What is the maximum number of overs in a T20 match?",
        options:["10","15","20","25"],
        correct:2
    },
    {
        q:"What is it called when a bowler gets 3 wickets in 3 balls?",
        options:["Triple Hit","Hat-trick","Strike Run","Clean Sweep"],
        correct:1
    }
];

let index = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const progressFill = document.getElementById("progressFill");

const card = document.getElementById("card");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("scoreDisplay");
const retryBtn = document.getElementById("retryBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const clickSound = document.getElementById("clickSound");

function load() {
    let q = questions[index];
    questionText.textContent = q.q;
    optionsBox.innerHTML = "";

    q.options.forEach((opt,i)=>{
        let btn = document.createElement("div");
        btn.className = "option";
        btn.textContent = opt;

        btn.onclick = () => handleAnswer(i, btn);

        optionsBox.appendChild(btn);
    });

    progressFill.style.width = ((index)/questions.length)*100 + "%";
}

function handleAnswer(selected, btn) {
    clickSound.play();

    document.querySelectorAll(".option").forEach(b => b.style.pointerEvents="none");

    if(selected === questions[index].correct){
        btn.classList.add("correct");
        correctSound.play();
        score++;
    } else {
        btn.classList.add("wrong");
        wrongSound.play();
        let correctBtn = document.querySelectorAll(".option")[questions[index].correct];
        correctBtn.classList.add("correct");
    }

    setTimeout(()=>{
        index++;
        if(index < questions.length){
            card.classList.remove("fade-in");
            void card.offsetWidth;
            card.classList.add("fade-in");
            load();
        } else {
            showResult();
        }
    }, 700);
}

function showResult() {
    card.classList.add("hidden");
    result.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
    progressFill.style.width = "100%";
}

retryBtn.onclick = () => {
    index = 0;
    score = 0;
    result.classList.add("hidden");
    card.classList.remove("hidden");
    load();
};

document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

load();