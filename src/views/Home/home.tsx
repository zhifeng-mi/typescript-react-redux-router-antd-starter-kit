import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../../actions/action';

class Home extends React.Component<any,any> {
    constructor(props,context) {
        super(props,context);
    }

    componentWillMount() {
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
