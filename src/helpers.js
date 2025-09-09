import words from '../guess_posibilities.json' with { type: 'json' };

export let state = {
  wins: 0,
  totalGamesPlayed: 0,
};

export const pickRandomWord = () =>
  words[Math.floor(Math.random() * words.length)];

export const saveState = function (status) {
  if (status === 'win') state.wins += 1;
  state.totalGamesPlayed += 1;

  localStorage.setItem('stats', JSON.stringify(state));
};

(function () {
  state = JSON.parse(localStorage.getItem('stats')) ?? state;
})();

// const fs = require('fs');

// const filterJSON = async function () {
//   const res = await fs.readFileSync('words.json');
//   const data = await JSON.parse(res);

//   const addToJson = await data.filter((word) => word.length === 5);
//   const newJson = await JSON.stringify(addToJson, null, 2);

//   fs.writeFileSync('./5-letter-words.json', newJson);
// };

// filterJSON();
