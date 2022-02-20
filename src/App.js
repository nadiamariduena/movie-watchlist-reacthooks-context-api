import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./lib/font-awesome/css/all.min.css";
//
//
//

import Navigation from "./components/Navigation";
import WatchList from "./components/WatchList";
import Watched from "./components/Watched";
import Add from "./components/Add";
//
//
//
function App() {
  return (
    <Router>
      <Navigation />
      <div className="page">
        <Switch>
          {/* Watchlist is the Home page */}
          <Route exact path="/" component={WatchList} />
          <Route path="/watched" exact component={Watched} />
          <Route path="/add" exact component={Add} />
          {/* <Route path="/product/:id" component={ProductScreen} /> */}
          <Route path="/*" component={WatchList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
