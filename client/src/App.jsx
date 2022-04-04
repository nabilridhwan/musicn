import { Routes, Route } from "react-router-dom"
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import Share from "./pages/Share";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Users from "./pages/Users";

function App() {

  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route exact path="/users" element={<Users />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* <Route exact path="/share" element={<Share />} /> */}
        <Route exact path="/user/:id" element={<User />} />

        <Route exact path="/error/:code" element={<Error />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
