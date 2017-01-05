import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';
import Header from '../../components/header'
import 'antd/dist/antd.less';
import action from '../../actions/action';


class App extends React.Component<any,any> {
    constructor(props,context) {
        super(props,context);
    }

    componentWillMount() {       
    }

    render() {
        const {user} = this.props;    
        return (
            <div className="ant-layout-main">
              <Header userInfo={user} {...this.props}/>
              <div className="ant-layout-container">
                <div className="ant-layout-content">
                  {this.props.children}            
                </div>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
