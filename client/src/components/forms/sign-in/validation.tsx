import {SignInFormValuesTypes} from "../types";

const validate = (values: SignInFormValuesTypes) => {
    let empty = true;
    const errors: SignInFormValuesTypes = {
        password: '',
        phone: '',
    };
    if (!values.password || values.password.length < 3) {
        errors.password = 'Вы ввели не коректный пароль';
    }
    if (!values.phone || !/^(\+380|0)[35679]{1}[0123456789]{1}[0-9]{7}$/.test(values.phone)) {
        errors.phone = 'Вы ввели не коректный номер телефона';
    }
    Object.keys(errors).forEach((elem) => {
        // @ts-ignore
        if (errors[elem] !== '') {
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