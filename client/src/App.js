import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Users from "./pages/Users";

function App() {

  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users" element={<Users/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/user/:id" element={<User/>} />
      </Routes>
      
    </div>
  );
}

export default App;
