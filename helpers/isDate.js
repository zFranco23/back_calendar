const moment = require('moment');

const isDate = ( value , { req }) => {

    if(!value){
        throw new Error('Invalid date')
    }

    const date = moment(value);
    if(date.isValid()){
        return true;
    }else{
        throw new Error('Invalid date')
    }
}

const isDateEnd = ( value , { req }) => {

    if(!value){
        throw new Error('Invalid end date')
    }

    const dateEnd = moment(value);
    const dateStart = moment(req.body.start);
    if(dateEnd.isAfter(dateStart)){
        return true;
    }else{
        throw new Error('End must be after start')
    }
}

module.exports = { isDate, isDateEnd }