import React from 'react';
import Options from './Options'
import axios from 'axios';
//import { store, handleInput } from '../store';

class UserCreateUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      manager: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    if(props.id){
      this.fetchUser(props.id);
    }
  }
  async fetchUser(id){
    const { fetchUser } = this.props
    const user = await fetchUser(id);
    this.setState({
      user: user.name
    })
  }
  handleUpdate(event){
    event.preventDefault()
    const { manager, user } = this.state;
    const { users, updateUser, id, history } = this.props; 
    const assigned = users.find(function(one){
      if(one.name === manager) return true;
    })
    updateUser({ name: user, managerId: assigned? assigned.id : null }, history, id)
  
    //need to work on this
  }
  handleSubmit(event) {
    event.preventDefault();
    const { manager, user } = this.state;
    const { users, history } = this.props;
    const assigned = users.find(function(one){
    if(one.name === manager) return true;
    })
    axios.post('/api/users', {name: user, managerId: assigned? assigned.id : null})
    .then((user) => {
      this.props.addUser(user.data, history);
    })
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    const { handleChange, handleSubmit, handleUpdate } = this;
    const { users, id } = this.props
    const { user } = this.state;
    return (
      <form onSubmit={(event) => {
        if(id){
          handleUpdate(event);
        } else {
          handleSubmit(event)
        }
      }
    }>
        <label htmlFor="user">Name</label>
        <input type="text" name="user" value={user} onChange={handleChange} />
        <select name="manager" onChange={handleChange}>
          <option>None</option>
          <Options users={users}/>
        </select>
        <button type="submit">{id? 'Update' : 'Create'}</button>
      </form>
    );
  }
}

export default UserCreateUpdate;
