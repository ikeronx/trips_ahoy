const convertRating = (num) => '⭐️'.repeat(num).concat('\u2606'.repeat(5 - num));

const convertRatingOnEdit = (str) => {
    if (str.length === 6) return 1
    if (str.length === 7) return 2
    if (str.length === 8) return 3
    if (str.length === 9) return 4
    if (str.length === 10) return 5
};

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export { convertRating as _cr, convertRatingOnEdit as _croe, randomIntFromInterval as _rndInt };
