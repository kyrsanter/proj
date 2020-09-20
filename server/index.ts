import {IncomingMessage, ServerResponse} from "http";
import {HeadersType, RoutesType} from "./types";
const http = require('http');
const dotenv = require('dotenv').config();
const url = require('url');
const CORSHeadersBuilder = require('./helpers/cors-headers-builder');
const messageBuilder = require('./helpers/message-builder');
/*routes*/
const authRoutes = require('./routes/auth-router');

let ro: {
    [key: string]: [string, (req: any, res: any) => void]
} = {
    '/api/auth/signup': ['POST', authRoutes.signUp.bind(null)],
    '/api/auth/signin': ['POST', authRoutes.signIn.bind(null)],
    '/api/auth/signup/(google|facebook)': ['POST', authRoutes.signUpSocial.bind(null)],
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'OPTIONS') {
        const headers = CORSHeadersBuilder({
            origin: process.env.ORIGIN,
            methods: process.env.METHODS,
            headers: process.env.HEADERS
        });
        res.writeHead(200, headers);
        res.end();
    }

    if (req.url) {
        let renderer;
        for (let key in ro) {
            if (req.url.match(new RegExp(key)) && ro[key][0] === req.method) {
                renderer = ro[key][1]
            }
        }
        if (typeof renderer === 'function') {
            renderer(req, res)
        }
        else {
            res.writeHead(404, CORSHeadersBuilder({origin: process.env.ORIGIN}));
            let msg = messageBuilder('Страница не найдена');
            res.end(msg);
        }
    }
});



server.listen(3005);