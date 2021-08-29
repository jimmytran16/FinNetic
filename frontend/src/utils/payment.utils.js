    // helper function to parse off set date format to mm-dd-YYYY
    const parseOffsetDateToMonthDayYear = (stringDate) => {
        const date = new Date(stringDate);
        return stringDate ? `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}` : "No Payments"
    }

    module.exports = {
        parseOffsetDateToMonthDayYear
    }