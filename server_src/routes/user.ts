import * as express from "express";
import {IReq,IRes,INext} from "../dao/model";
const register = (app:express.Application)=>{
    app.post('/api/user/login', (req:express.Request, res:express.Response)=>{
        const credentials = req.body;
        if(credentials.user==='admin' && credentials.password==='123456'){
            res.cookie('uid', '1', {domain:'127.0.0.1'});
            res.cookie('type','admin');
            res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': 1});
        }else{
            res.status(500).send({'message' : 'Invalid user/password'});
        }
    });
    app.post('/api/user/logout',(req:express.Request, res:express.Response)=>{
        res.clearCookie('uid');
        res.clearCookie('type');    
        res.json({'message': 'Logout'});
    });
}
module.exports.name = "UserRoutes";
module.exports.order = 5;
module.exports.register = register