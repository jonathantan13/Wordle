export let guessRowEl, guessColumnEl;

export const updateUI = function (row, column) {
  guessRowEl = document.querySelector(`.row-${row}`);
  guessColumnEl = guessRowEl.children[column - 1];
};

export const updateKeyColor = function (letter, status) {
  const btn = document.querySelector(`[data-letter="${letter}"]`);

  switch (status) {
    case 'correct':
      btn.classList.add('correct-letter');
      break;
    case 'partial':
      btn.classList.add('partial-correct');
      break;
    case 'wrong':
      btn.classList.add('wrong-letter');
      break;
  }
};
