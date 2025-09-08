import words from '../guess_posibilities.json' with { type: 'json' };

export const pickRandomWord = () =>
  words[Math.floor(Math.random() * words.length)];

export const saveState = function () {};

// const fs = require('fs');

// const filterJSON = async function () {
//   const res = await fs.readFileSync('words.json');
//   const data = await JSON.parse(res);

//   const addToJson = await data.filter((word) => word.length === 5);
//   const newJson = await JSON.stringify(addToJson, null, 2);

//   fs.writeFileSync('./5-letter-words.json', newJson);
// };

// filterJSON();
