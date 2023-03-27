const jwt = require("jsonwebtoken")
const amqp = require("amqplib")


module.exports.verifyAccessToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_ACCESS, (err, user)=> {
         if(err) throw new Error(err.message)
         return user;
     })
 }


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


module.exports.betweenWorkingHours = (appointmentDate) => {
    const hour = appointmentDate.getHours()

    
     if(hour < 11 || hour >= 20) return false; // to fix local time problem
     return true;
    
}

module.exports.minutesValidityCheck = (appointmentDate) => {
    const minutes = appointmentDate.getMinutes()
    if(minutes % 10 !== 0) return false;
    return true;
}

module.exports.generateAccessToken = async (payload) => {
    try {
       return await jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "11m"})
    } catch(e) {
        
        return e;
    }
}


