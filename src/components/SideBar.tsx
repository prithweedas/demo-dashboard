import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { updateList } from '../store/ActionCreators';
import { IPerson } from '../Types';

type IUpdateList = (list: IPerson[]) => void;
type ISelectUser = (list: IPerson) => void;
type IDeselectUser = (list: number[]) => void;

interface IProps {
  persons: IPerson[];
  updateList: IUpdateList;
  selectUser: ISelectUser;
  deselectUser: IDeselectUser;
}

interface IState {
  allSelected: boolean;
  selectedItems: number[];
  persons: IPerson[];
}

class SideBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      allSelected: false,
      selectedItems: [],
      persons: [
        ...this.props.persons.map((person, i) => ({
          ...person,
          id: i
        }))
      ]
    };
  }
  handleAllSelectedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      allSelected: e.target.checked,
      selectedItems: e.target.checked
        ? [...this.props.persons.map((_, i) => i)]
        : []
    });
  };

  delete = () => {
    let newList = [...this.state.persons];
    this.state.selectedItems.forEach(item => {
      newList = newList.filter(person => person.id !== item);
    });
    this.props.updateList(newList);
    this.props.deselectUser(this.state.selectedItems);
    this.setState({ selectedItems: [] });
  };

  componentWillReceiveProps(newProps: IProps) {
    this.setState({
      persons: [...newProps.persons.map((person, i) => ({ ...person, id: i }))]
    });
  }

  handleSelectItem = (i: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    if (e.target.checked) {
      this.setState(state => ({
        selectedItems: [...state.selectedItems, i]
      }));
    } else {
      this.setState(state => ({
        selectedItems: [...state.selectedItems.filter(item => item !== i)]
      }));
    }
  };

  selectUser = (person: IPerson) => (e: any) => this.props.selectUser(person);

  public render() {
    return (
      <div style={styles.container}>
        <div style={styles.allSelect}>
          <Checkbox
            onChange={this.handleAllSelectedChange}
            checked={this.state.allSelected}
            value="checkedA"
            color="primary"
          />
          <Typography variant="body2">People</Typography>
          <div style={{ flex: 1 }} />
          <IconButton onClick={this.delete} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          {this.state.persons.map((person, i) => {
            return (
              <div
                onClick={this.selectUser(person)}
                key={i}
                style={styles.person}
              >
                <Checkbox
                  style={{ marginLeft: '0.7rem' }}
                  onChange={this.handleSelectItem(i)}
                  checked={this.state.selectedItems.indexOf(i) > -1}
                  value="checkedA"
                  color="primary"
                />
                <Typography variant="subheading">{person.name}</Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: 'calc(100vh - 3rem)',
    width: '15rem',
    boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)'
  },
  allSelect: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #c7bebe'
  },
  deleteIcon: {
    transform: 'scale(0.8)'
  },
  person: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #c7bebe',
    borderTop: '1px solid #c7bebe',
    marginBottom: '0.7rem',
    cursor: 'pointer'
  }
};

const mapStateToProps = (state: any) => ({
  persons: state
});

const mapActiontoProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapActiontoProps
)(SideBar);
