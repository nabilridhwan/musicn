import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import User from "./pages/User";
import Users from "./pages/Users";

function App() {

  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users" element={<Users/>} />
        <Route exact path="/user/:id" element={<User/>} />
      </Routes>
      
    </div>
  );
}

export default App;
