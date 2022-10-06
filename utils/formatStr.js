const validInputs = (...inputs) => inputs.every((inp) => inp !== '');

const convertRating = (num) => '⭐️'.repeat(num).concat('\u2606'.repeat(5 - num));

const convertToStartCase = (words) => words && words.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const coverToKebabCase = str => str.toLowerCase().trim().replaceAll(' ', '-')

const formatDateOnEdit = (date) => new Date(date).toISOString().slice(0, 10);

const formatDate = (dateInputValue) => {
    const date = new Date(dateInputValue)
    const locale = navigator.language; // <- get the current locale of the browser (e.g. en-US, fr-FR, etc)
    const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, options).format(date)
};

export { validInputs as _vi, convertRating as _cr, convertToStartCase as _ctsc, coverToKebabCase  as _ctkc, formatDate as _fd, formatDateOnEdit as _fdoe };