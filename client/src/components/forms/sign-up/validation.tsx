import {SignUpFormValuesTypes} from "../types";

const validate = (values: SignUpFormValuesTypes) => {
    let empty = true;
    const errors: SignUpFormValuesTypes = {
        isClient: false,
        isMaster: false,
        name: '',
        password: '',
        phone: '',
        repassword: '',
        allCheckboxesAreFalse: false,
        passwordNotCompared: '',
        email: ''
    };
    if (!values.name) {
        errors.name = 'Вы забыли ввести имя';
    }
    else if (values.name.length < 3){
        errors.name = 'Имя должно состоять из 3-х и более символов';
    }
    if (!values.email) {
        errors.email = 'Вы забыли email';
    }
    else if (values.email && !values.email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
        errors.email = 'Вы ввели не коректный email'
    }
    if (!values.password) {
        errors.password = 'Вы забыли ввести пароль';
    }
    else if (values.password.length < 3){
        errors.password = 'Пароль должен содержать не менее 3-х символов';
    }
    if (!values.repassword) {
        errors.repassword = 'Вы забыли ввести пароль для подтверждения';
    }
    else if (values.repassword !== values.password){
        errors.passwordNotCompared = 'Пароли не совпадают';
    }
    if (!values.phone) {
        errors.phone = 'Вы забыли ввести номер телефона';
    }
    else if (!values.phone.match(/^(\+380|0)[35679]{1}[0123456789]{1}[0-9]{7}$/)) {
        errors.phone = 'Номер телефона должен начинаться на 0 или +380 и далее код Украинского оператора'
    }
    Object.keys(errors).forEach((elem) => {
        // @ts-ignore
        if (typeof errors[elem] === "string" && errors[elem] !== "") {
            empty = false
        }
        // @ts-ignore
        if (typeof errors[elem] === "boolean" && errors[elem] === true) {
            empty = false
        }
    });
    if(empty) {
        return undefined
    }
    else {
        return errors;
    }
};

export {
    validate
}