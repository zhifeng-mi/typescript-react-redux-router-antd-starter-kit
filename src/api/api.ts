import * as superagent from 'superagent';
const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {
    opts:any;
    get:any;
    head:any;
    post:any;
    put:any;
    del:any;
    options:any;
    patch:any; 
    constructor(opts) {
        this.opts = opts || {};
        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');
            
        methods.forEach(method =>
            this[method] = (path:string, {params,data}:any = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](this.opts.baseURI + path);
                if (params) {
                    request.query(params);
                }
                if (this.opts.headers) {
                    request.set(this.opts.headers);
                }
                if (data) {
                    request.send(data);
                }
                request.end((err, { body }:any = {}) => err ? reject(body || err) : resolve(body));
            })
        );
    }
}

const Api = _Api;

export default Api;
