import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { DataTable, Button, Icon } from 'carbon-components-react';

import * as UserDucks from 'ducks/users/user';

const {
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableBatchActions,
  TableBatchAction,
} = DataTable;

class UserListSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.activateUser = this.activateUser.bind(this);
    this.deactivateUser = this.deactivateUser.bind(this);
    this.filter = this.filter.bind(this);
  }

  selectUser(data) {
    this.props.UserDucks.selectUsers(data);
  }

  deleteUser() {
    const { userSelectedList } = this.props;
    this.props.UserDucks.deleteUser(userSelectedList);
  }

  activateUser() {
    const { userSelectedList } = this.props;
    this.props.UserDucks.activateUser(userSelectedList);
  }

  deactivateUser(data) {
    const { userSelectedList } = this.props;
    this.props.UserDucks.deactivateUser(userSelectedList);
  }

  downloadReport() {
    window.open('http://192.168.1.11:8000/api/v1/accounts/user/csv/');
  }

  filter(e) {
    this.props.UserDucks.getUsers({ search: e.target.value });
  }

  render() {
    const { isLoading, userList, userSelectedList } = this.props;
    const { router: { history } } = this.context;
    const headers = [
      {
        key: 'first_name',
        header: 'Name',
      },
      {
        key: 'username',
        header: 'Username',
      },
      {
        key: 'is_superuser',
        header: 'Superuser',
      },
      {
        key: 'is_staff',
        header: 'Staff',
      },
      {
        key: 'is_active',
        header: 'Active',
      },
    ];

    return (
      <DataTable
        rows={userList}
        headers={headers}
        // filterRows={this.filter}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="Users">
            <TableToolbar>
              <TableToolbarSearch onChange={this.filter} />
              {userSelectedList.length > 0 &&
                <div style={{ marginLeft: '8px' }}>{userSelectedList.length} items selected</div>
              }
              <TableToolbarContent>
                <TableToolbarAction
                  iconName="download"
                  iconDescription="Download"
                  onClick={this.downloadReport}
                />
                <Button
                  small
                  style={{ marginLeft: '4px' }}
                  onClick={this.deleteUser}
                  disabled={!userSelectedList.length}
                >
                  Delete
                </Button>
                <Button
                  small
                  style={{ marginLeft: '4px' }}
                  onClick={this.activateUser}
                  disabled={!userSelectedList.length}
                >
                  Activate
                </Button>
                <Button
                  small
                  style={{ marginLeft: '4px' }}
                  onClick={this.deactivateUser}
                  disabled={!userSelectedList.length}
                >
                  Deactivate
                </Button>
                <Button
                  small
                  style={{ marginLeft: '4px' }}
                  onClick={() => history.push('/user/add')}
                >
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <th></th>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => this.selectUser(item)}
                      />
                    </td>
                    <td title={item.first_name}>{item.first_name}</td>
                    <td title={item.username}>{item.username}</td>
                    <td title={item.is_superuser ? 'Yes' : 'No'}>
                      <Icon
                        name={item.is_active ? 'checkmark--outline' : 'close--outline'}
                        fill={item.is_active ? 'green' : 'red'}
                        description="This is a description of the icon and what it does…"
                        className="extra-class"
                      />
                    </td>
                    <td title={item.is_staff ? 'Yes' : 'No'}>
                      <Icon
                        name={item.is_active ? 'checkmark--outline' : 'close--outline'}
                        fill={item.is_active ? 'green' : 'red'}
                        description="This is a description of the icon and what it does…"
                        className="extra-class"
                      />
                    </td>
                    <td title={item.is_active ? 'Yes' : 'No'}>
                      <Icon
                        name={item.is_active ? 'checkmark--outline' : 'close--outline'}
                        fill={item.is_active ? 'green' : 'red'}
                        description="This is a description of the icon and what it does…"
                        className="extra-class"
                      />
                    </td>
                  </tr>
                ))}
                {!userList.length &&
                  <tr>
                    <td style={{ textAlign: 'center' }} colSpan="6">No records found</td>
                  </tr>
                }
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userList: UserDucks.userList(state),
  userSelectedList: UserDucks.userSelectedList(state),
});

const mapActionsToProps = dispatch => ({
  UserDucks: bindActionCreators(UserDucks, dispatch),
});

UserListSection.propTypes = {
  userList: PropTypes.array.isRequired,
  userSelectedList: PropTypes.array.isRequired,
};

UserListSection.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserListSection);
