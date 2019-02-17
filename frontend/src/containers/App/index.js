import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


class App extends React.Component {
  render () {
    const text = 'React/Python-Django Test';

    return (
      <Fragment>
        <h1 className="header-title">{text}</h1>
        <p>
          <Link to="/users">View all users</Link>
        </p>
      </Fragment>
    )
  }
}

export default App;
