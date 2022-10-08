const convertRating = (num) => '⭐️'.repeat(num).concat('\u2606'.repeat(5 - num));

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export { convertRating as _cr, randomIntFromInterval as _rndInt };
