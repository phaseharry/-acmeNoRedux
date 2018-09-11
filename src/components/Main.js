import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import User from './Users';
import Managers from './Managers';
import UserCreateUpdate from './UserCreateUpdate';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
    this.addUser = this.addUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.getManagers = this.getManagers.bind(this);
    this.findManager = this.findManager.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  
  loadData(){
    axios.get('/api/users').then(data => {
      const users = data.data;
      this.setState({users})
    });
  }
  getManagers(){
    const {users} = this.state;
    return users.reduce((array, user) => {
      if(array.indexOf(user.managerId) < 0 && user.managerId){
        return [...array, user.managerId]
      } 
      return array;
    }, []).map((managerId) => {
      return users.find((user) => user.id === managerId? true : false )
    })
  }
  findManager(user){
    const { getManagers } = this; 
    const managers = getManagers()
    return managers.find((manager) => manager.id === user.managerId? true : false)
  }
  addUser(user){
    const { findManager } = this;
    if(user.managerId){
      const manager = findManager(user);
      user.manager = manager;
    }
    this.setState({ users: [...this.state.users, user]})
  }
  updateUser(user, id){
    console.log(user, id)
  }
  async deleteUser(id){
    await axios.delete(`/api/user/${id}`, { params : {'id' : id}})
    this.setState({ users : this.state.users.filter((user) => user.id !== id).map((user) => {
      if(user.managerId === id) user.managerId = null;
      return user;
      })
    })
   
  }
  render() {
    const { users } = this.state;
    return (
      <div>
        <NavBar users={users} getManagers={this.getManagers}/>
        <Route
          path="/users"
          render={() => <User users={users} findManager={this.findManager} deleteUser={this.deleteUser}/>}
        />
        <Switch>
      <Route path='/user/:id' render={({match}) => <UserCreateUpdate id={match.params.id} users={users} updateUser={this.updateUser}/> } />
        <Route
          path="/users/create"
          render={(props) => {
            return (
              <div>
                <UserCreateUpdate
                  users={users}
                  addUser={this.addUser}
                />
              </div>
            )
          }
        }
        />
        <Route
          path="/managers"
          render={props => <Managers getManagers={this.getManagers}/>}
        />
        </Switch>
      </div>
    );
  }
}

export default Main;
