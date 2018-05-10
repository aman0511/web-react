import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RouteDucks from 'ducks/routes';
import * as UserDucks from 'ducks/users/user';

import OneColumnLayout from 'layout/OneColumn';
import UserListSection from 'sections/users/list/List';

class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    const { location: { query: prevQuery } } = this.props;
    const { location: { query: nextQuery } } = nextProps;

    if (nextQuery !== prevQuery) {
      this.fetchData(nextQuery);
    }
  }

  fetchData(params) {
    this.setState({ isLoading: true });
    this.props.UserDucks.getUsers(params)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;

    return (
      <OneColumnLayout>
        <UserListSection isLoading={isLoading} />
      </OneColumnLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  location: RouteDucks.location(state),
});

const mapActionsToProps = dispatch => ({
  UserDucks: bindActionCreators(UserDucks, dispatch),
});

UserListPage.propTypes = {
  location: PropTypes.object.isRequired,
  UserDucks: PropTypes.object.isRequired, 
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserListPage);
