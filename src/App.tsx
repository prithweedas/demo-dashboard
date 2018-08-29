import * as React from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

class SimpleAppBar extends React.Component {
  public render() {
    return (
      <div>
        <NavBar />
        <div>
          <SideBar />
        </div>
      </div>
    );
  }
}

export default SimpleAppBar;
