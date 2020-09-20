import {PostConfigParamType} from "../main_types";

export class ApiService {
    apiUrl: string = '';
    constructor () {
        this.apiUrl = process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:8080/api';
    }

    makePost = async (postCofig: PostConfigParamType, url: string, payload: any) => {
        try {
            let response = await fetch(`${this.apiUrl}/${url}`, {
                ...postCofig,
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                console.log(await response.json())
            }
            else {
                console.log(await response.json())
            }
        }
        catch(e) {
            console.log(e)
        }

    }
}