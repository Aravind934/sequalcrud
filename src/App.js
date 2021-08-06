import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddUser from "./components/addUser";
import UserList from "./components/userList";
import Update from "./components/updateUser";

let App = () => {
  return (
    <Router>
      <h3 className="text-success text-center mb-5">User List Management!</h3>
      <Switch>
        <Route path="/" exact component={UserList}></Route>
        <Route path="/add" exact strict component={AddUser}></Route>
        <Route path="/update/:id" exact strict component={Update}></Route>
      </Switch>
    </Router>
  );
};

export default App;
