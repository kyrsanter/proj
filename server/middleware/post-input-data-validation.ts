import {MessageItemType} from "../types";
const messageBuilder = require('../helpers/message-builder');

module.exports = (obj: any) => {
    let blackList = /([<?=>]|[!*&#])/;
    for (let key in obj) {
        if (typeof obj[key] === "boolean") {
            continue
        }
        if (obj[key].match(blackList)) {
            return messageBuilder('Вы ввели недопустимые символы!', true, key);
        }
        switch (key) {
            case 'name':
                if (obj[key].length < 3) {
                    return messageBuilder('Длина имени не может быть менее 3-х символов', true, key);
                }
                break;
            case 'email':
                let emailRegexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!obj[key].match(emailRegexp)) {
                    return messageBuilder('Вы ввели не коректный email', true, key);
                }
                break;
            case 'phone':
                let phoneRegexp = /^(\+380|0)[35679]{1}[0123456789]{1}[0-9]{7}$/;
                if (!obj[key].match(phoneRegexp)) {
                    return messageBuilder('Вы ввели не коректный номер телефона', true, key);
                }
                if (!obj[key].includes('+38')) {
                    obj['phone'] = `+38${obj[key]}`
                }
                break;
            case 'password':
                if (obj[key].length < 6) {
                    return messageBuilder('Длина пароля не может быть менее 6-ти символов', true, key);
                }
                break;
        }
    }
    return null
};