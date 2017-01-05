import * as express from "express";
import * as webpack from "webpack";
const bodyParser = require('body-parser');
const path = require('path');

const configWP = require(__dirname + './../webpack.config');
const isDeveloping:boolean = true;

const app = express();
if (isDeveloping) {
    const compiler = webpack(configWP);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: configWP.output.publicPath,
        noInfo: false
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}
//
app.use(bodyParser.json({ type: 'application/json' }))
app.get('*', function(req:express.Request, res:express.Response) {
    res.sendFile(path.resolve(__dirname + "./../", '', 'index.html'))
});
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
app.listen(3000,()=>{
    console.log("Server Running");
})