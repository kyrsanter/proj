import {UserLoginData, UserRegData} from "../../types";
import {ApiService} from "../../service/api-service";

const service = new ApiService();

export const registerNewUserThunk = (userData: UserRegData) => async (dispatch: any) => {
    console.log(userData, 'form-thunk')
    let result = await service.makePost({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    },'auth/signup', userData)

};

export const registerNewSocialUserThunk = (tokenId: string) => async (dispatch: any) => {
    let result = await service.makePost({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        'auth/signup/google',{idToken: tokenId})
};

export const loginUserThunk = (userData: UserLoginData) => async (dispatch: any) => {
    let result = await service.makePost({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        'auth/signin',userData)
};