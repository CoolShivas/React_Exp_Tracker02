import WelcomePage from "./pages/WelcomePage";
import LogIn from "./components/auth/LogIn";
import AuthForm from "./components/auth/AuthForm";
import Header from "./components/header/Header";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import { Route } from "react-router-dom/cjs/react-router-dom";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <Header></Header>

      <Route path="/homepage"> <HomePage></HomePage> </Route>
      <Route path="/aboutpage"> <AboutPage></AboutPage> </Route>
      <Route path="/productpage"> <ProductPage></ProductPage> </Route>
      <Route path="/authformpage"> <AuthForm></AuthForm> </Route>
      <Route path="/login"> <LogIn></LogIn> </Route>
      <Route path="/welcomepage"> <WelcomePage></WelcomePage> </Route>
    </>
  )
}

export default App;