import React, {FC} from "react";
import '../forms.css';
import {useFormik} from "formik";
import user from '../images/user.svg'
import {validate} from "./validation";
import SocialButtonsContainer from "../../../containers/social-buttons-container";
import {UserLoginData} from "../../../types";

type PropsType = {
    loginUser: (userData: UserLoginData) => void
}

const SignIn:FC<PropsType> = (props) => {

    const formik = useFormik({
        initialValues: {
            password: '',
            phone: '',
        },
        validate,
        onSubmit: values => {
            props.loginUser(values)
        },
    });

    return (
        <div>
            <form className="form-item" onSubmit={formik.handleSubmit}>
                <div className="form-img">
                    <img src={user} alt=""/>
                </div>
                <div className={`field ${formik.touched.phone && formik.errors.phone ? 'field-error' : null}`}>
                    <input
                        name='phone'
                        id='phone'
                        type="phone"
                        required
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <label htmlFor="phone">Введите телефон</label>
                    {
                        formik.touched.phone && formik.errors.phone !== '' ? <p className='error-text'>{formik.errors.phone}</p> : null
                    }
                </div>
                <div className={`field ${formik.touched.password && formik.errors.password ? 'field-error' : null}`}>
                    <input
                        name='password'
                        id='password'
                        type="password"
                        required
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <label htmlFor="password">Введите пароль</label>
                    {
                        formik.touched.password && formik.errors.password !== '' ? <p className='error-text'>{formik.errors.password}</p> : null
                    }
                </div>
                <div className="checkbox-wrap d-flex">
                    <div className="field">
                        <input
                            name='remember'
                            id='remember'
                            type="checkbox"
                            autoComplete='off'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                        <label htmlFor="remember">Запомнить меня</label>
                    </div>
                </div>
                <SocialButtonsContainer/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button
                        type='submit'
                        className='btn btn-success'>
                        Войти
                    </button>
                </div>
            </form>
        </div>

    )
};
export default SignIn;