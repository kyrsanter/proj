import {IncomingMessage, ServerResponse} from "http";

export type HeadersType = {
    [key: string]: string | undefined
};

export type RoutesType = {
    [key: string]: [string, (req: IncomingMessage, res: ServerResponse) => void]
}

export type MessageItemType = {
    title: string
    isError: boolean
    name?: string
}

export type QueryType = {
    social?: string
}