import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserDucks from 'ducks/users/user';
import * as RouteDucks from 'ducks/routes';

import UserFormComponent from 'components/users/form/Form';

class UserAssetFormSection extends React.Component {
  constructor(props) {
    super(props);
    this.createOrUpdate = this.createOrUpdate.bind(this);
  }

  createOrUpdate(data) {
    const { router: { history } } = this.context;
    const { router: { route: { match: { params } } } } = this.context;
    if (params.id) {
      return this.props.UserDucks.putUser(data)
        .then(() => {
          history.push('/user/list');
        });
    }
    return this.props.UserDucks.postUser(data)
      .then(() => {
        history.push('/user/list');
      });
  }

  render() {
    const { userDetail, userList, assetTypeList } = this.props;
    const { router: { route: { match: { params } } } } = this.context;

    return (
      <section style={{ width: '40%' }}>
        <h2 className="mb4">Add User</h2>
        <UserFormComponent
          createOrUpdate={this.createOrUpdate}
          initialValues={
            params.id
              ? userDetail
              : {
                is_superuser: true,
                is_staff: true,
                is_active: true,
              }
          }
        />
      </section>
    );
  }  
}

const mapStateToProps = (state) => ({
  location: RouteDucks.location(state),
  userDetail: UserDucks.userDetail(state),
});

const mapActionsToProps = dispatch => ({
  UserDucks: bindActionCreators(UserDucks, dispatch),
});

UserAssetFormSection.propTypes = {
  UserDucks: PropTypes.object.isRequired,
};

UserAssetFormSection.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserAssetFormSection);


