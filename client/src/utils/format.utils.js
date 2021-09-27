function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// validate years from 1990 - 2099 only
function isValidDate(date) {
    var date_regex = /(^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return date_regex.test(date);
}

function isValidPhone(phone) {
    var phoneRegex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
    return phoneRegex.test(phone);
    
}

module.exports = {
    currencyFormat,
    isValidDate,
    isValidPhone
}
