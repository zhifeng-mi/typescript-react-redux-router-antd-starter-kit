import * as React from 'react';
import * as PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';
import Header from '../../components/header'
import 'antd/dist/antd.less';
import action from '../../actions/action';
import { RouteComponentProps } from 'react-router'
import { Router,Route,Switch} from 'react-router-dom';
import Home from "../Home/home";
import Support from "../Support/support";


class App extends React.Component<any,any> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }    

    componentWillMount() {       
    }

    render() {
        console.log(this.props);
        const {user} = this.props;    
        return (
            <div className="ant-layout-main">
              <Header userInfo={user} {...this.props}/>
              <div className="ant-layout-container">
                <div className="ant-layout-content">
                  {this.props.children}            
                </div>
              </div>
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/support' component={Support} />                
            </Switch> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
        user: user ? user : null,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        api: bindActionCreators(action, dispatch)
    }
}
export default connect<any,any, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(App);
