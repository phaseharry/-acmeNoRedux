import React from 'react';
import Options from './Options'
import axios from 'axios';
//import { store, handleInput } from '../store';

class UserCreateUpdate extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      manager: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount(){
    const { id } = this.props; 
    if(id){
      axios.get(`/api/user/${id}`).then((user) => {
        const info = user.data.name
        this.setState({ user : info })
      })
    }
  }
  handleUpdate(event){
    event.preventDefault()
    const { manager, user } = this.state;
    const { users, updateUser, id } = this.props; 
    console.log(manager)
    axios.put(`/user/${id}`, { name: user, manager })
    //need to work on this
  
  }
  handleSubmit(event) {
    event.preventDefault();
    const { manager, user } = this.state;
    const { users } = this.props;
    const assigned = users.find(function(one){
    if(one.name === manager) return true;
    })
    axios.post('/api/users', {name: user, managerId: assigned? assigned.id : null})
    .then((user) => {
      //console.log(user.data)
      this.props.addUser(user.data);
      this.setState({ user: '', manager: ''})
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
