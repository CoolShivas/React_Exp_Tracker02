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

    </>
  )
}

export default App;