import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// if you remove the fontawesome line from below, the icons in the MovieControls will not be visible
import "./lib/font-awesome/css/all.min.css";
//

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import Add from "./components/Add";

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
              <Route path="/watched" element={<Watched />} />
              <Route path="/add" element={<Add />} />
              <Route path="/resultCards" element={<ResultCardsHome />} />

              <Route path="/rainbow/:productId" element={<MovieDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;
