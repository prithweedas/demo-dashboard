import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { IPerson } from '../Types';
import { bindActionCreators, Dispatch } from 'redux';
import { addPerson } from '../store/ActionCreators';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Typography, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

type IAddPerson = (person: IPerson) => void;

interface IProps {
  addPerson: IAddPerson;
}

interface IState {
  showModal: boolean;
  name: string;
  rating: string;
  desc: string;
}

class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      rating: '',
      desc: ''
    };
  }

  toggleModal = () => this.setState(state => ({ showModal: !state.showModal }));

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });
  handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ rating: e.target.value });
  handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ desc: e.target.value });

  addPerson = () => {
    const { name, desc, rating } = this.state;
    this.props.addPerson({
      name,
      Description: desc,
      rating: parseInt(rating, 10)
    });
    this.setState({ showModal: false });
  };

  renderModal = () => {
    return (
      <Modal
        BackdropProps={{ invisible: true }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.showModal}
        onClose={this.toggleModal}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)',
            padding: '2rem',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '30vw',
            height: '30vw'
          }}
        >
          <IconButton
            style={{ position: 'absolute', top: '5%', right: '5%' }}
            aria-label="Delete"
            onClick={this.toggleModal}
          >
            <CancelIcon />
          </IconButton>
          <form style={{ marginTop: '2rem' }}>
            <div style={styles.formItem}>
              <Typography variant="subheading" gutterBottom={true}>
                Name
              </Typography>
              <TextField
                id="name"
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
              />
            </div>
            <div style={styles.formItem}>
              <Typography variant="subheading" gutterBottom={true}>
                Rating
              </Typography>
              <TextField
                id="rating"
                value={this.state.rating}
                onChange={this.handleRatingChange}
                margin="normal"
              />
            </div>
            <div style={styles.formItem}>
              <Typography variant="subheading" gutterBottom={true}>
                Description
              </Typography>
              <TextField
                id="desc"
                value={this.state.desc}
                onChange={this.handleDescriptionChange}
                margin="normal"
              />
            </div>
          </form>
          <div
            style={{
              display: 'flex',
              marginTop: '5rem',
              flexDirection: 'row-reverse',
              alignItems: 'center'
            }}
          >
            <div
              onClick={this.addPerson}
              style={{
                paddingTop: '0.7rem',
                paddingBottom: '0.7rem',
                backgroundColor: '#15159c',
                paddingRight: '1rem',
                paddingLeft: '1rem',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              <Typography style={{ color: '#fff' }} variant="subheading">
                Add User
              </Typography>
            </div>
            <div
              style={{ marginRight: '3rem', cursor: 'pointer' }}
              onClick={this.toggleModal}
            >
              <Typography variant="subheading">Cancel</Typography>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  public render() {
    return (
      <div style={styles.container}>
        {this.renderModal()}
        <div style={{ flex: 1 }} />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          style={styles.addButton}
          onClick={this.toggleModal}
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
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
};

const mapActiontoProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addPerson
    },
    dispatch
  );

export default connect(
  null,
  mapActiontoProps
)(NavBar);
