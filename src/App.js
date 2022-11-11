import { Container } from "react-bootstrap";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import axios from "axios";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  // To Get movies with Axios with loading first
  const getAllMovies = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=db726954c155638674e5e544cbca0117&language=en-US&page=1"
      );
      setLoading(false);
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {}
  };

  const getPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=db726954c155638674e5e544cbca0117&language=en-US&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  // To search movies
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=db726954c155638674e5e544cbca0117&query=${word}&language=en`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };
  // Loading section before fetching data
  if (loading) {
    return (
      <div className="font color-body ">
        <NavBar search={search} />
        <Loading />
      </div>
    );
  }
  // in case of search error
  if (movies.length === 0) {
    return (
      <div>
        <NavBar search={search} />
        <div className="font color-body ">
          <h2 className="search-error">لا توجد افلام </h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="font color-body ">
        <NavBar search={search} />
        <Container>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <MoviesList
                    movies={movies}
                    loading={loading}
                    getPage={getPage}
                    pageCount={pageCount}
                  />
                }
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
