import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactState from "./context/contact/contactState";
import Register from "./components/auth/Register";
import AuthState from "./context/auth/authState";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/alertState";
import Alert from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if(localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AlertState>
    <AuthState>
      <ContactState>
        <Router>
          
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </ContactState>
    </AuthState>
    </AlertState>

  );
};

export default App;
