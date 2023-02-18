## Process to get the "correct url" when closing the Overlay

<br>

#### Before the package changes ------

- This didnt work, so i thought that maybe it was clashing with the outdated packages

<br>

```javascript
import { useEffect } from "react";

import {
  Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import "./lib/font-awesome/css/all.min.css";

//
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";

//
import ResultCardsHome from "./components/ResultCardsHome";
//
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
//

const history = createBrowserHistory();
//
//

function App() {
  // ✋  ⚠️ --- This will not work because of the outdated packages
  //
  //
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location && location.state && location.state.from) {
      history.replaceState(null, "", location.state.from);
    }
  }, [location, history]);
  //
  // ----------------
  //
  return (
    <GlobalProvider>
      <MoviessProvider>
        <Router history={history}>
          <Navigation />
          <div className="page">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/watchlist" component={WatchList} />
              <Route path="/watched" exact component={Watched} />
              <Route path="/add" exact component={Add} />
              {/* <Route path="/resultCards" exact component={ResultCardsHome} /> */}
              <Route path="/*" component={Home} />
            </Switch>
          </div>
        </Router>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;
```

<br>
<br>

### 🍰 After updating all the packages (removing the node modules and package lock json)

 <br>

- new packages

```javascript
npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event --save-dev
//
npm i axios framer-motion dotenv react react-dom react-player react-html5video react-router-dom react-scripts react-icons react-youtube sass styled-components web-vitals
```

<br>

### changing this:

```Javascript

// from this ✋

  "scripts": {
    "start": "export PORT=1835 && react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

// to this ✋

  "scripts": {
    "start": "export PORT=1835 && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

<br>
<br>

### after the changes -----

- 🔴 First error after the changes

```javascript
ERROR in ./src/App.js 40:18-28
export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom' (possible exports: AbortedDeferredError, Await, BrowserRouter, Form, HashRouter, Link, MemoryRouter, NavLink, Navigate, NavigationType, Outlet, Route, Router, RouterProvider, Routes, ScrollRestoration, UNSAFE_

```

<br>

> This error is saying that useHistory is not found in the react-router-dom module, and it suggests that useNavigate should be used instead. The useNavigate hook provides the same functionality as useHistory, allowing you to programmatically navigate to a different route.

<br>

##### ✋ To fix this error, replace useHistory with useNavigate in the import statement, and then update the code to use useNavigate instead of useHistory.

```javascript
import { useEffect } from "react";
import {
  Router,
  Switch,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./lib/font-awesome/css/all.min.css";

//
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";

//
import ResultCardsHome from "./components/ResultCardsHome";
//
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
//

//

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location && location.state && location.state.from) {
      history.replaceState(null, "", location.state.from);
    }
  }, [location, history]);

  //
  return (
    <GlobalProvider>
      <MoviessProvider>
        <Router>
          <Navigation />

          <div className="page">
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/watchlist" component={WatchList} />

              <Route path="/watched" exact component={Watched} />
              <Route path="/add" exact component={Add} />

              {/* <Route path="/resultCards" exact component={ResultCardsHome} /> */}

              <Route path="/*" component={Home} />
            </Switch>
          </div>
        </Router>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;
```

<br>
<br>

### Another error after updating the packages

- 🔴 If you are using react-router-dom v6, it looks like Switch has been replaced with Routes.

https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

<br>
<br>

### The blank page issue 🤦 🌻

- the reason for it was because of the Link, since i have a different set up in the app now. Not only I have a new route to show the specific movie but i also added the params in the app and not in the resultCardsHome:

<br>

```javascript
  <Link to={`/movies/${moviearg.id}`}>
```

so the above, was causing the blank page, it was difficult to figure out because there was no error on the console, but after removing all the content of the MovieDetails and leaving only this:

```javascript
<WrapperVidDescript>hello its working</WrapperVidDescript>
```

<br>

### ✋ I realize that the issue came from this

**< Link to={`/movies/${moviearg.id}`} >** and this is the route where i have this:

```javascript
<Route path="/movies/:id" element={<MovieDetails />} />
```

<br>

- So there was no need of duplicating it

### (Inside the ResultsCardsHome)

```javascript

// before ✋

 <Grid>
        <ResultCard>
          {/* <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
            {moviearg.title}
          </H3> */}

          {moviearg.poster_path ? (
            <>
              <Link to={`/movies/${moviearg.id}`}>
                <ImgBox onClick={() => setCloseModi(!closeModi)}>
                  <img
                    // defaultImg
                    src={
                      moviearg.poster_path
                        ? `https://image.tmdb.org/t/p/w200${moviearg.poster_path}`
                        : defaultImg
                    }
                    alt={`${moviearg.title} Poster`}
                  />
                </ImgBox>
              </Link>
            </>
          ) : null}
        </ResultCard>
      </Grid>

---

// after ✋

 <Grid>
        <ResultCard>
          {moviearg.poster_path ? (
            <>
              <ImgBox onClick={() => setCloseModi(!closeModi)}>
                <img
                  // defaultImg
                  src={
                    moviearg.poster_path
                      ? `https://image.tmdb.org/t/p/w200${moviearg.poster_path}`
                      : defaultImg
                  }
                  alt={`${moviearg.title} Poster`}
                />
              </ImgBox>
            </>
          ) : null}
        </ResultCard>
      </Grid>
```

### 🎢 and in the app.js

```javascript
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";

import ResultCardsHome from "./components/ResultCardsHome";
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
import PageNotFound from "./pages/pageNotFound";
//
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <GlobalProvider>
      <MoviessProvider>
        <BrowserRouter>
          <Navigation />

          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/watched" exact element={<Watched />} />
              <Route path="/add" exact element={<Add />} />
              <Route path="/resultCards" component={<ResultCardsHome />} />

              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;
```

https://user-images.githubusercontent.com/58809268/219882718-5d7b5805-8a6b-45df-a6d9-b7d3c8ed0319.mp4


