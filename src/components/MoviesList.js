import React from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationCom from "./Pagination";

const MoviesList = ({ movies, getPage, pageCount }) => {
  return (
    <Row className="mt-3">
      {movies.map((movie) => {
        return <CardMovie key={movie.id} movie={movie} />;
      })}
      {movies.length >= 1 ? (
        <PaginationCom getPage={getPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};

export default MoviesList;
