import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RouteDucks from 'ducks/routes';
import * as UserDucks from 'ducks/users/user';

import OneColumnLayout from 'layout/OneColumn';
import UserFormSection from 'sections/users/form/Form';

class UserFormPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentWillMount() {
    const { router: { route: { match: { params } } } } = this.context;
    if (params.id) {
      this.setState({ isLoading: true });
      return this.props.UserDucks.getUser(params)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <OneColumnLayout>
        <UserFormSection />
      </OneColumnLayout>
    );
  }
}

const mapStateToProps = () => ({});

const mapActionsToProps = dispatch => ({
  UserDucks: bindActionCreators(UserDucks, dispatch),
});

UserFormPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
  
UserFormPage.propTypes = {
  UserDucks: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserFormPage);
