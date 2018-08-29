import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class NavBar extends React.Component {
  public render() {
    return (
      <div style={styles.container}>
        <div style={{ flex: 1 }} />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          style={styles.addButton}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100vw',
    boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)',
    height: '3rem',
    display: 'flex',
    alignItems: 'center'
  },
  addButton: {
    marginRight: '0.5rem',
    transform: 'scale(0.7)'
  }
};

export default NavBar;
