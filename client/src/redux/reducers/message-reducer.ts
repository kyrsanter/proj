const messageState = {

};

type MessageStateType = typeof messageState;

export const messageReducer = (state = messageState, action: any): MessageStateType => {
    switch (action.type) {
        default:
            return state
    }
};