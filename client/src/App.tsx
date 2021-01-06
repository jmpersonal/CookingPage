import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage, ViewRecipe } from "./pages/Pages";


function App() {
  return (
    <div className="site-content">
      <Router>
      <div className="site-header">
        <div>
        <Link to="/">Chef Academy</Link>

        </div>
        <div>All your recipes in one place!</div>
      </div>
        <div className="view-content">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/view/:id" exact>
              <ViewRecipe />
            </Route>
            <Route path="/edit/:id" exact>
              <ViewRecipe edit={true}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
