import React from 'react';

import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RouteDucks from 'ducks/routes';

import UserFilterComponent from  'components/users/list/Filter';

class UserFilterSection extends React.PureComponent {

  constructor(props){
    super(props);
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(data) {
    const { router: { history } } = this.context;
    const { location: { pathname, query } } = this.props;
    const { page, ...rest } = query;
    return history.push({ pathname, search: queryString.stringify({ ...rest, ...data }) });
  }

  render(){
    const { location: { query } } = this.props;
    return(
      <div className="mv3">
        <div className="ba b--moon-gray pv2 ph3 bg-near-white cf filters">
          <UserFilterComponent 
            getUsers={this.getUsers}
            initialValues={query}
          />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  location: RouteDucks.location(state),
});

const mapActionsToProps = dispatch => ({
  RouteDucks: bindActionCreators(RouteDucks, dispatch),
});

UserFilterSection.propTypes = {
  location: PropTypes.object.isRequired,
};

UserFilterSection.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserFilterSection);
