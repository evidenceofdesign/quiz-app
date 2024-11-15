const quizData = [
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    choices: ['4', '22', 'NaN', 'Error'],
    correctAnswer: 1,
  },
  {
    question: 'Which method is used to add elements to the end of an array?',
    choices: ['push()', 'pop()', 'unshift()', 'shift()'],
    correctAnswer: 0,
  },
  {
    question: 'What does `NaN` stand for in JavaScript?',
    choices: [
      'No Any Number',
      'Negative Any Number',
      'Null and None',
      'Not a Number',
    ],
    correctAnswer: 3,
  },
  {
    question: 'What data type represents either TRUE or FALSE values?',
    choices: ['integer', 'event', 'boolean', 'condition'],
    correctAnswer: 2,
  },
  {
    question:
      'What is a block of code called that is used to perform a specific task?',
    choices: ['variable', 'declaration', 'string', 'function'],
    correctAnswer: 3,
  },
  {
    question:
      'What element is used to store multiple values in a single variable?',
    choices: ['function', 'array', 'variable', 'string'],
    correctAnswer: 1,
  },
  {
    question: 'Which statement is used to end or exit a loop?',
    choices: ['break', 'close', 'stop', 'quit'],
    correctAnswer: 0,
  },

  {
    question: 'What element is used to store and manipulate text?',
    choices: ['loop', 'string', 'array', 'function'],
    correctAnswer: 1,
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    choices: ['onmouseclick', 'onmouseover', 'onclick', 'onchange'],
    correctAnswer: 2,
  },
  {
    question: 'How do you create a function?',
    choices: [
      'function = myFunction()',
      'let function = myFunction',
      'function:myFunction()',
      'function myFunction()',
    ],
    correctAnswer: 3,
  },
];

const containerElement = document.getElementsByClassName('container');
const questionContainer = document.getElementById('question-container');
const questionCounter = document.getElementById('question-counter');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let score = 0;
const wrongAnswers = [];

function loadQuestion() {
  const { question, choices } = quizData[currentQuestion];
  questionElement.innerHTML = question;
  questionCounter.innerHTML = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
  choicesElement.innerHTML = '';

  choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.innerHTML = choice;
    button.addEventListener('click', () => selectChoice(index));
    choicesElement.appendChild(button);
  });
}

function selectChoice(index) {
  [...choicesElement.children].forEach((button) => {
    button.classList.remove('selected');
  });
  choicesElement.children[index].classList.add('selected');
}

function submitAnswer() {
  const selectedButton = choicesElement.querySelector('.selected');
  if (!selectedButton) return;

  const selectedIndex = [...choicesElement.children].indexOf(selectedButton);
  if (selectedIndex === quizData[currentQuestion].correctAnswer) {
    score++;
  } else {
    wrongAnswers.push({
      question: quizData[currentQuestion].question,
      userAnswer: quizData[currentQuestion].choices[selectedIndex],
      correctAnswer:
        quizData[currentQuestion].choices[
          quizData[currentQuestion].correctAnswer
        ],
    });
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = 'none';
  questionCounter.style.display = 'none';
  submitButton.style.display = 'none';

  let resultHTML = `
    <p class='score'>You scored ${Math.round((score * 100) / quizData.length)}%
    (${score} out of ${quizData.length})
    </p>
  `;

  if (wrongAnswers.length > 0) {
    resultHTML += '<h3>Wrong Answers</h3>';
    resultHTML += '<ul>';
    wrongAnswers.forEach((answer) => {
      resultHTML += `
        <li>
          <p>Question: ${answer.question}</p>
          <p>Your answer: <span class='wrong'>${answer.userAnswer}</span></p>
          <p>Correct Answer: <span class='correct'>${answer.correctAnswer}</span></p>
        </li>
      `;
    });
    resultHTML += '</ul>';
  }

  resultElement.innerHTML = resultHTML;
}

submitButton.addEventListener('click', submitAnswer);

loadQuestion();
