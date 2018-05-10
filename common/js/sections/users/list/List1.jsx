import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { DataTable, Button } from 'carbon-components-react';

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
  // TableSelectAll,
  // TableSelectRow,
} = DataTable;

class UserListSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { userList } = this.props;
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
      <TableContainer title="DataTable">
        <TableToolbar>
          <TableToolbarContent>
            <Button small kind="primary" onClick={() => history.push('/user/add')}>
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <table className="bx--data-table-v2 bx--data-table-v2--zebra" cellSpacing="0">
          <thead>
            <tr className="v-top">
              <th><input type="checkbox" name="selectall" value="selectall"></input></th>
              {headers.map(header => (
                <th key={header.key}>{header.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList.map(item => (
              <tr key={item.id}>
                <td><input type="checkbox" name="selectall" value="selectall"></input></td>
                <td title={item.first_name}>{item.first_name}</td>
                <td title={item.username}>{item.username}</td>
                <td title={item.is_superuser ? 'Yes' : 'No'}>
                  {item.is_superuser ? 'Yes' : 'No'}
                </td>
                <td title={item.is_staff ? 'Yes' : 'No'}>
                  {item.is_staff ? 'Yes' : 'No'}
                </td>
                <td title={item.is_active ? 'Yes' : 'No'}>
                  {item.is_active ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
            {!userList.length &&
              <tr>
                <td
                  colSpan="10"
                  className="bb b--light-gray mw4 pa2 truncate tc"
                >
                  No records found
                </td>
              </tr>
            }
          </tbody>
        </table>
      </TableContainer>          
    );
  }
}

const mapStateToProps = (state) => ({
  userList: UserDucks.userList(state),
});

const mapActionsToProps = dispatch => ({
});

UserListSection.propTypes = {
  userList: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(UserListSection);

