import React, { useState } from "react";
import Movieinfo from "./Movieinfo";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

function Moviedocuments({ moviedata, update, setupdate, noofpage = 10 }) {
  var name;
  // const [name, setName] = useState("");
  const handlingpagination = (page) => {
    setupdate(page);
    window.scroll(0, 0);
  };

  return (
    <div className="big">
      <div className="big_box">
        {moviedata.map((data) => {
          if (data.original_name) {
            name = data.original_name;
          } else {
            name = data.original_title;
          }

          return (
            <Movieinfo
              key={data.id}
              title={name}
              name={data.original_name}
              imgpath={data.poster_path}
              vote={data.vote_average}
              imgsecond={data.backdrop_path}
              detail={data.overview}
              lan={data.original_language}
              id={data.id}
              media_type={data.media_type}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          count={noofpage}
          onChange={(e) => handlingpagination(e.target.textContent)}
          shape="rounded"
          color="secondary"
          showFirstButton
          showLastButton
        />
      </div>
      <Link to="/testing">
        <button>click me</button>
      </Link>
    </div>
  );
}

export default Moviedocuments;
