import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';

import { actions as usersActions, selectors as usersSelectors } from '../../redux/modules/users';


class Users extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape()),
    getUsers: PropTypes.func.isRequired
  }

  static defaultProps = {
    users: []
  }

  state = {
  }

  componentDidMount() {
    const { getUsers } = this.props;

    getUsers();
  }

  render () {
    const { users } = this.props;

    return (
      <Fragment>
        <h1 className="header-title">Users</h1>
        {users && users.length
          ? users.map((user, idx) => (
            <p key={user.id}>{`${idx + 1}. Name - ${user.name}, Age - ${user.age}`}</p>))
          : <p>No users</p>
        }
      </Fragment>
    )
  }
}

const selectors = createStructuredSelector({
  users: usersSelectors.usersSelector
})

const actions = {
  getUsers: usersActions.getUsers
}

export default connect(selectors, actions)(Users);
