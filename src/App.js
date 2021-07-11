import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div>
      <Router>
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
