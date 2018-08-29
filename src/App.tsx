import * as React from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Typography from '@material-ui/core/Typography';
import { IPerson } from './Types';

interface IState {
  selectedUser?: IPerson;
}

class App extends React.Component {
  state: IState = {
    selectedUser: undefined
  };

  selectUser = (person: IPerson) => this.setState({ selectedUser: person });
  public render() {
    const { selectedUser } = this.state;
    return (
      <div>
        <NavBar />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'relative'
          }}
        >
          <SideBar selectUser={this.selectUser} />
          <div style={{ flex: 1 }}>
            {selectedUser && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)'
                }}
              >
                <Typography variant="display1">
                  Name: {selectedUser.name}
                </Typography>
                <Typography variant="display1">
                  Rating: {selectedUser.rating}
                </Typography>
                <Typography variant="display1">
                  Description: {selectedUser.Description}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
