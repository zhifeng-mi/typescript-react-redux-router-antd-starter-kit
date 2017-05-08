import * as express from "express";
import * as webpack from "webpack";
import * as fs from "fs";
import * as _ from "underscore";
import {IReq,IRes,INext} from "./dao/model";
import {Route} from "./model/class";

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

let routes:Route[] = [];
fs.readdirSync(__dirname + '/routes').forEach(function (routeConfig: string) {
  if (routeConfig.substr(-3) === '.js') {
    let route = require(__dirname + '/routes/' + routeConfig);
    routes.push(new Route(route.order,route.register,route.name));
  }
});
const routesExecutes = _.sortBy(routes,"order");
routesExecutes.forEach(route => {
    route.register(app)
});


const server = app.listen(3000,()=>{
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
})