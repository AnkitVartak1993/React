import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import NavMenu from "./components/NavMenu";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Cart />
        <NavMenu/>
        <Switch>
          <Route path='/products/:handle'>
            <ProductPage/>
          </Route>
          <Route path='/' exact>
            <HomePage/>
          </Route>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
