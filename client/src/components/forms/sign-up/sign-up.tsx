import React, {FC, Props} from "react";
import '../forms.css';
import {useFormik} from "formik";
import user from '../images/user.svg'
import {validate} from "./validation";
import {UserRegData} from "../../../types";

type PropsType = {
    registerNewUser: (userData: UserRegData) => void
}

const SignUp:FC<PropsType> = (props) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            repassword: '',
            phone: '',
            isMaster: false,
            isClient: false,
            email: ''
        },
        validate,
        onSubmit: (values) => {
            let {repassword, ...neededData} = values;
            props.registerNewUser(neededData)
        }
    });

    return (
        <div >
            <form className="form-item" onSubmit={formik.handleSubmit}>
                <div className="form-img">
                    <img src={user} alt=""/>
                </div>
                <div className={`field ${formik.touched.name && formik.errors.name? 'field-error' : null}`}>
                    <input
                        id='name'
                        name='name'
                        type="text"
                        required
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <label htmlFor="name">Введите имя</label>
                    {
                        formik.touched.name && formik.errors.name !== '' ? <p className='error-text'>{formik.errors.name}</p> : null
                    }
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
                        formik.touched.phone && formik.errors.phone ? <p className='error-text'>{formik.errors.phone}</p> : null
                    }
                </div>
                <div className={`field ${formik.touched.email && formik.errors.email ? 'field-error' : null}`}>
                    <input
                        name='email'
                        id='email'
                        type="email"
                        required
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <label htmlFor="email">Введите email</label>
                    {
                        formik.touched.email && formik.errors.email ? <p className='error-text'>{formik.errors.email}</p> : null
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
                        formik.touched.password && formik.errors.password ? <p className='error-text'>{formik.errors.password}</p> : null
                    }
                </div>
                <div className={`field ${formik.touched.password && formik.touched.repassword && formik.errors.passwordNotCompared ? 'field-error' : null}`}>
                    <input
                        name='repassword'
                        id='repassword'
                        type="password"
                        required
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <label htmlFor="repassword">Повторите пароль</label>
                    {
                        formik.touched.repassword && formik.errors.passwordNotCompared ? <p className='error-text'>{formik.errors.passwordNotCompared}</p> : null
                    }
                </div>
                <div className="checkbox-wrap d-flex">
                    <div className="field">
                        <input
                            name='isMaster'
                            id='isMaster'
                            type="checkbox"
                            autoComplete='off'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                        <label htmlFor="isMaster">Вы мастер?</label>
                    </div>
                    <div className="field">
                        <input
                            name='isClient'
                            id='isClient'
                            type="checkbox"
                            autoComplete='off'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                        <label htmlFor="isClient">Вы клиент?</label>
                    </div>
                    {
                        !formik.touched.isMaster && !formik.touched.isClient && formik.errors.allCheckboxesAreFalse ? <p className='error-text flex-item'>Вы должны выбрать один из вариантов</p> : null
                    }
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <button
                        type='submit'
                        className='btn btn-success'>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>

    )
};
export default SignUp;