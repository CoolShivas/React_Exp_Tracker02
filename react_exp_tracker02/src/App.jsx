import ErrorPage from "./pages/ErrorPage";
import ChangePassword from "./pages/ChangePassword";
import ProfilePage from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./components/auth/LogIn";
import AuthForm from "./components/auth/AuthForm";
import Header from "./components/header/Header";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import styles from "./App.module.css";
// import { useContext } from "react";
// import ExpContext from "./store/ExpContext";

const App = () => {

  // const { isLoggedIn } = useContext(ExpContext);

  return (
    <>
      <Switch>
        <Route exact path="/"> <Header></Header> </Route>
        <Route path="/homepage"> <HomePage></HomePage> </Route>
        <Route path="/aboutpage"> <AboutPage></AboutPage> </Route>
        <Route path="/productpage"> <ProductPage></ProductPage> </Route>
        <Route path="/authformpage"> <AuthForm></AuthForm> </Route>
        <Route path="/login"> <LogIn></LogIn> </Route>
        {/* {isLoggedIn && <Route exact path="/welcomepage"> <WelcomePage></WelcomePage> </Route>} */}
        <Route exact path="/welcomepage"> <WelcomePage></WelcomePage> </Route>
        <Route path="/profilepage"> <ProfilePage></ProfilePage> </Route>
        <Route path="/changepassword"> <ChangePassword></ChangePassword> </Route>
        {/* <Route path="*"> <ErrorPage></ErrorPage> </Route> */}
      </Switch>
    </>
  )
}

export default App;