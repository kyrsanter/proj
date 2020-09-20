import {MessageItemType} from "../types";

module.exports = (msg: string, isError: boolean, name: string): string => {
    let message: Array<MessageItemType> = [];
    let messageItem: MessageItemType = {
        title: msg,
        isError
    };
    name ? messageItem.name = name : undefined;
    message.push(messageItem);
    return JSON.stringify(message);
};