import React, {FC} from "react";
import FacebookLogin from 'react-facebook-login'
import {GoogleLogin} from 'react-google-login'
import {UserRegData} from "../../../types";

type PropsType = {
    registerNewSocialUser: (tokenId: string) => void
}


const SocialButtons: FC<PropsType> = (props) => {
    const facebookResponseHandler = (response: any) => {
        console.log(response)
    };

    const googleResponseHandler = (res: any) => {
        props.registerNewSocialUser(res.tokenId);
    };

    return (
        <div className="socials-login">
            <FacebookLogin
                appId="268644227740627"
                autoLoad={false}
                fields="name,email,picture"
                callback={facebookResponseHandler}
                cssClass="btnFacebook"
                icon="fa-facebook"
                textButton = "&nbsp;&nbsp;Войти через Facebook"
            />
            <GoogleLogin
                clientId="732907648238-lt6l3o8l2hjuf3b1mvn39n2f8cpiepg2.apps.googleusercontent.com"
                onSuccess={googleResponseHandler}
                onFailure={googleResponseHandler}
                cookiePolicy='single_host_origin'
                className="btnGoogle"
            >
                <i className="fa fa-google-plus"/>
                <span>&nbsp;&nbsp;Войти через Google</span>
            </GoogleLogin>
        </div>
    )
};

export default SocialButtons;