function cleanDate(date) {
    const dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear().toString().substr(-2);

    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;
    return month + "/" + day  + "/"  + year;
}

export default cleanDate;
