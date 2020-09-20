import React, {FC} from "react";
import SocialButtons from "../components/forms/social-buttons/social-buttons";
import {connect, ConnectedProps} from 'react-redux';
import {registerNewSocialUserThunk} from "../redux/thunks/forms-thunk";
import {UserRegData} from "../types";

const SocialButtonsContainer: FC<PropsFromRedux> = (props) => <SocialButtons
                                                                registerNewSocialUser={props.registerNewSocialUser}/>;

const mapDispatchToProps = {
    registerNewSocialUser: (tokenId: string) => registerNewSocialUserThunk(tokenId)
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SocialButtonsContainer)