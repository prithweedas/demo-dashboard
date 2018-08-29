import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

interface IPerson {
  Description: string;
  Dislikes: string[];
  img: string;
  name: string;
  Likes: string[];
  rating: number;
}

interface IProps {
  persons: IPerson[];
}

interface IState {
  allSelected: boolean;
  selectedItems: number[];
}

class SideBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      allSelected: false,
      selectedItems: []
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

  handleSelectItem = (i: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          {this.props.persons.map((person, i) => {
            return (
              <div key={i} style={styles.person}>
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
    marginBottom: '0.7rem'
  }
};

const mapStateToProps = (state: any) => ({
  persons: state
});

export default connect(mapStateToProps)(SideBar);