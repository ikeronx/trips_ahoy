const validInputs = (...inputs) => inputs.every((inp) => inp !== '');

const trimStr = (str) => str.trim()

const convertToStartCase = (words) => words && words.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const coverToKebabCase = str => str.toLowerCase().trim().replaceAll(' ', '-')

const formatCityStr = (str) => str.length <= 12 ? str : `${str.slice(0, 12)}..`

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

export { validInputs as _vi, trimStr as _trimStr, convertToStartCase as _ctsc, coverToKebabCase as _ctkc, formatCityStr as _fcs, formatDate as _fd, formatDateOnEdit as _fdoe };