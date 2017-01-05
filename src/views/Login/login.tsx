import * as React from "react";
import { PropTypes } from "react";

import {Input, Button, Row, Col,Form,message} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import action from '../../actions/action';
import 'antd/dist/antd.less';
import './login.less'

const FormItem = Form.Item;
//Message Setting
message.config({top: 100});
interface LoginProps extends React.Props<any>{
    [key:string]:any;
    form:any;
    api:any;
    router:any;
    loginErrors:string;
}
interface State{

}
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
class Login extends React.Component<LoginProps,State> {
    constructor(props, context){
        super(props,context);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user;
        if (error != this.props.loginErrors && error) {
            message.error('Please check your account or password');
        }
        if (!isLoggingIn && !error && user)  {
            message.success('Login successfully');
        }
        if (user) {
            this.props.router.replace('/home');
        }
    }    
    handleSubmit (e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        let dataObj = {
            type: "USER_LOGIN",
            url: "/user/login",
            data: data
        }        
        this.props.api.postData(dataObj);
    }    
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
        <Row className="login-row" type="flex" justify="space-around" align="middle">
            <Col span={8}>
            <div className="login-form">
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="User:" labelCol={{ span: 6 }}  wrapperCol={{ span: 14 }}>
                {getFieldDecorator("user", { initialValue: '' })(
                    <Input id="account" placeholder='Please input your account'/>
                )}            
                </FormItem>
                <FormItem label="Password:" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator("password", { initialValue: '' })(
                    <Input type='password' id="password" placeholder='Please input your password'/>
                )}
                </FormItem>
                <Row><Col span={24} offset={10}>
                    <Button type='primary' htmlType='submit'>Login</Button>
                </Col></Row>
            </Form>
            </div>
            </Col>
        </Row>
        )
    }
}

const LoginForm = Form.create()(Login);
function mapStateToProps(state:any):any {
    const {user} = state;
    if (user.user) {
        return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
    }
    return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
}

function mapDispatchToProps(dispatch:any) {
    return {
        api: bindActionCreators(action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
