import React, {FC} from "react";
import {useRouteMatch} from 'react-router-dom';
import SignUp from "../components/forms/sign-up/sign-up";
import SignIn from "../components/forms/sign-in/sign-in";
import {connect, ConnectedProps} from "react-redux";
import {loginUserThunk, registerNewUserThunk} from "../redux/thunks/forms-thunk";
import {UserLoginData, UserRegData} from "../types";

const FormsContainer: FC<PropsType> = (props) => {
    let {params}: any = useRouteMatch();

    let neededForm = () => {
        switch (params.where) {
            case 'signup':
                return <SignUp registerNewUser={props.registerNewUser}/>;
            case 'signin':
                return <SignIn loginUser={props.loginUser}/>;
            default:
                return null
        }
    };
    return neededForm()
};

const mapDispatchToProps = {
    registerNewUser: (userData: UserRegData) => registerNewUserThunk(userData),
    loginUser: (userData: UserLoginData) => loginUserThunk(userData)
};

const connector = connect(null, mapDispatchToProps);

type PropsType = ConnectedProps<typeof connector>

export default connector(FormsContainer);