
module.exports.convertDateToLocalTime = (date, time) => {
    
    if(time == null) {
        const stringDate = new Date(date) + "-00:00"
        return new Date(stringDate)
    }
    const convertedDate = new Date(`${date} ${time}` + "-00:00")
    return convertedDate;
}

module.exports.noMoreThanAMonth = (appointmentDate, currentDate) => {
    const timeDiff = Math.abs(appointmentDate.getTime() - currentDate.getTime())
    const timeDiffAsDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
    if(timeDiffAsDays > 30) return false; 
    return true;
}



