const stauts_enum_arr = ['in progress','cancelled','delivered','in preparation'];

const checkPrice = (price) =>{
    return price && !isNaN(price);
}

const checkStatus = (status) =>{
    return stauts_enum_arr.includes(status);
}

module.exports = {
    checkStatus,
    checkPrice
}