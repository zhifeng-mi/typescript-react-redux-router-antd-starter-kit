import * as React from 'react';
import * as PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../../actions/action';
import { RouteComponentProps } from 'react-router'

class Home extends React.Component<any,any> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }    


    componentWillMount() {
        console.log("home");
        console.log(this.props);
    }


    render() {
        const {user,actions} = this.props;
        return (
            <div className="ant-layout-content">
                HomePage
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
//export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect<any,any,RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Home)
