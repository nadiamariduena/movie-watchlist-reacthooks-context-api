### Create a Movie Watchlist with React Hooks, Context API and localStorage

> In this tutorial we'll be creating a movie watchlist using React, implementing **React Hooks**, **Context API**, **storing data in localStorage** and **fetching data** from an external **API** (The Movie Database).

<br>

##### the tutorial: [Movie Watchlist](https://youtu.be/1eO_hNYzaSc)

<br>

#### Useful links:

[fontawesome](https://fontawesome.com/docs/web/use-with/react/)

<br>
<br>

---

<br>
<br>

# 🥭

#### 1. Start by requesting the API from this link: [themoviedb.org](https://www.themoviedb.org/settings/api)

<br>

- Once you sign up, go to the settings of your account , then on the left bar you will find the API

<br>

##### 2. Install react-router-dom

> npm i react-router-dom ✋

<br>

##### 3. Copy and paste the css styles from the official repo, so that we dont waste time on it.

##### [styles](https://github.com/MattDobsonWeb/movie-watchlist-react/blob/master/src/App.css)

<br>

##### 4. Download the fontawesome "lib" folder from the official repo

<br>
<br>

---

<br>
<br>

## Lets get started 👾

#### Create the components folder

<br>

##### Create some pages:

- **Watchlist** (will be the **main page**)

##### Inside the <u>WatchList</u> page, type rafce to create a template, do the same with the next pages: <u>Add.jsx, Watched.jsx, Header.jsx</u>

```javascript
import React from "react";

const WatchList = () => {
  return <div>WatchList</div>;
};

export default WatchList;
```

<br>
<br>

#### The header

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Watch</Link>
          </div>
          {/* ---- */}
          <ul className="nav-links">
            <li>
              <Link to="/">Watch list</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link to="/add" className="btn">
                + Add
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
```

<br>
<br>
<br>

## Routing

<br>

##### 🔴 With the updating of the **react-router-dom** you will have some errors when setting up the following, but if you remove all the react related dependencies and grab it from a project of 3 months ago, it will work fine, the reason for that is that this tutorial ways created before such update take place, therefore the errors

<br>

- So delete the old react related and add this one:

```javascript
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-icons": "^4.3.1",
    "react-player": "^2.9.0",
    "react-router-dom": "^5.3.0",
    "react-scripts": "4.0.3",
```

<br>
<br>

## The Routes Setup ✋

<br>

```javascript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";
//
//
//

import Header from "./components/Header";
import WatchList from "./components/WatchList";
import Watched from "./components/Watched";
import Add from "./components/Add";
//
//
//
function App() {
  return (
    <Router>
      <Header />
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
```
