import {IncomingMessage, ServerResponse} from "http";
import {QueryType} from "../types";
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const CORSHeadersBuilder = require('../helpers/cors-headers-builder');
const pool = require('../db');
const postInputsDataValidation = require('../middleware/post-input-data-validation');
const messageBuilder = require('../helpers/message-builder');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

module.exports = {
    signUpSocial: function(req: IncomingMessage, res: ServerResponse) {
        let reqBody: string = '';
        req.on('data', function(chunk: Buffer) {
            reqBody += chunk
        });
        req.on('err', function(err: any) {
            let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!');
            res.writeHead(500, CORSHeadersBuilder({origin: process.env.ORIGIN}));
            res.end(msg)
        });
        req.on('end', async function(){
            if (reqBody) {
                let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
                let {idToken} = JSON.parse(reqBody);
                if (idToken) {
                    try {
                        let {payload} = await client.verifyIdToken({idToken, audience:process.env.GOOGLE_CLIENT_ID});
                        let {email_verified, email, name} = payload;
                            if (email_verified) {
                                let sql = 'SELECT * FROM users WHERE user_email = $1';
                                let {rows} = await pool.query(sql, [email]);
                                if (rows.length !== 0) {
                                    let msg = messageBuilder('Пользователель с таким номером телефона или email уже существует', true);
                                    res.writeHead(201, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                    res.end(msg)
                                }
                                else {
                                    let randomPrefix = (Math.random() * 10 * Math.sqrt(Date.now() * Math.random())).toString().split('.');
                                    let newId = uniqid(randomPrefix[0], randomPrefix[1]);
                                    let securedPassword = await bcrypt.hash(newId + email + Date.now(), 10);
                                    let sql = `INSERT INTO users (user_id, user_name, user_password, user_email)
                                               VALUES ($1, $2, $3, $4)`;
                                    try {
                                        let insertSocialUserResult = await pool.query(sql, [newId, name, securedPassword, email]);
                                        if (insertSocialUserResult) {
                                            let msg = messageBuilder('Пользователь создан', false);
                                            res.writeHead(201, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                            res.end(msg)
                                        }
                                        else {
                                            let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!', true);
                                            res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                            res.end(msg)
                                        }
                                    }
                                    catch (insertSocialUserError) {
                                        let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!', true);
                                        res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                        res.end(msg)
                                    }
                                }
                            }
                            else {
                                let msg = messageBuilder('Пользователь не зарегистрирован!', true);
                                res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                res.end(msg)
                            }
                    }
                    catch(e) {
                        let msg = messageBuilder('Пользователь не зарегистрирован!', true);
                        res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                        res.end(msg)
                    }
                }
                else {
                    let msg = messageBuilder('Пользователь не зарегистрирован!', true);
                    res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                    res.end(msg)
                }
            }
        });
    },

    signUp: function (req: IncomingMessage, res: ServerResponse) {
        let reqBody: string = '';
        req.on('data', function(chunk: Buffer) {
            reqBody += chunk.toString()
        });
        req.on('err', function(err: any) {
            let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!', true);
            res.writeHead(500, CORSHeadersBuilder({origin: process.env.ORIGIN}));
            res.end(msg)
        });
        req.on('end', function() {
            let body = JSON.parse(reqBody);
            let validationsErrors = postInputsDataValidation(body);
            if (validationsErrors) {
                res.writeHead(418, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                res.end(validationsErrors);
            }
            else {
                let sql = 'SELECT * FROM users WHERE user_phone = $1';
                pool.query(sql, [body.phone], async (err: any, result: any) => {
                    if (err) {
                        let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!');
                        res.writeHead(500, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                        res.end(msg)
                    }
                    if (result.rows.length !== 0) {
                        let msg = messageBuilder('Пользователель с таким номером телефона или email уже существует');
                        res.writeHead(201, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                        res.end(msg)
                    } else {
                        let {name, phone, email, password, isMaster, isClient} = body;

                        /*generate unic id*/
                        let randomPrefix = (Math.random() * 10 * Math.sqrt(Date.now() * Math.random())).toString().split('.');
                        let newId = uniqid(randomPrefix[0], randomPrefix[1]);

                        let securedPassword = await bcrypt.hash(password, 10);

                        let sql = `INSERT INTO users (user_id, user_name, user_password, user_email, user_phone, user_ismaster, user_isclient)
                               VALUES ($1, $2, $3, $4, $5, $6, $7)`;
                        await pool.query(sql, [newId, name, securedPassword, email, phone, isMaster, isClient])
                            .then((result: any) => {
                                res.writeHead(201, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                res.end(JSON.stringify({msg: 'Пользователь создан'}))
                            })
                            .catch((error: any) => {
                                let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!');
                                res.writeHead(500, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                                res.end(msg)
                            });
                    }
                });
            }
        });
    },

    signIn(req: IncomingMessage, res: ServerResponse) {
        let loginUserData: string = '';
        req.on('data', (chunk: Buffer) => {
            loginUserData += chunk
        });
        req.on('end', async () => {
            let body = JSON.parse(loginUserData);
            let validationsErrors = postInputsDataValidation(body);
            if (validationsErrors) {
                res.writeHead(418, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                res.end(validationsErrors);
            }
            else {
                let lookingForBy = body.phone ? 'user_phone' : 'user_email';
                let params = body.phone ? [body.phone] : [body.email];
                let sql = `SELECT user_password, user_id FROM users WHERE ${lookingForBy} = $1`;

                let searchResult = await pool.query(sql, params);
                if (searchResult.rows.length > 0) {
                    try {
                        let pasIsOk = await bcrypt.compare(body.password, searchResult.rows[0].user_password);
                        if (!pasIsOk) {
                            let msg = messageBuilder('Пользователь с такими даными не найден', true);
                            res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                            res.end(msg)
                        }
                        else {
                            let token = jwt.sign({id: searchResult.rows[0].user_id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                            let refreshToken = jwt.sign({id: searchResult.rows[0].user_id}, process.env.JWT_SECRET, {expiresIn: '10d'});
                            res.setHeader('Set-Cookie', 'refresh=' + 'ok' + ';' + 'expires=' + new Date());
                            res.writeHead(200, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                            res.end(JSON.stringify({token}))
                        }
                    }
                    catch(e) {
                        let msg = messageBuilder('Что-то пошло не так, не уходите, а попробуйте еще раз!', true);
                        res.writeHead(500, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                        res.end(msg)
                    }
                }
                else {
                    let msg = messageBuilder('Пользователь с такими даными не найден', true);
                    res.writeHead(401, CORSHeadersBuilder({origin: process.env.ORIGIN}));
                    res.end(msg)
                }
            }
        })
    }
};
