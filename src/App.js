import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./lib/font-awesome/css/all.min.css";

//
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";
//
//
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
//
function App() {
  return (
    <GlobalProvider>
      <MoviessProvider>
        <Router>
          <Navigation />
          <div className="page">
            <Switch>
              {/* Watchlist was the Home page */}
              <Route exact path="/" component={Home} />
              <Route exact path="/watchlist" component={WatchList} />
              <Route path="/watched" exact component={Watched} />
              <Route path="/add" exact component={Add} />
              <Route path="/*" component={Home} />
            </Switch>
          </div>
        </Router>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;
