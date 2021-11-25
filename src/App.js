import React, { useState, useEffect } from "react";
import Moviedocuments from "./Moviedocuments";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import { Moviedata } from "./Moviedata";
import Loading from "./Loading";
import Testing from "./Testing";

const Key = "api_key=af3abab3867f0ddb9831952933244908";
const mainurl = "https://api.themoviedb.org/3";
const url = mainurl + "/discover/movie?sort_by=popularity.desc&" + Key;

function App() {
  const [update, setupdate] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [loading, setloading] = useState(true);
  const [moviedata, setmoviedata] = useState([]);
  const fetchingdataa = async () => {
    try {
      const respond_from_api = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=af3abab3867f0ddb9831952933244908&page=${update}`
      );
      const Mdatas = await respond_from_api.json();
      const data = Mdatas.results;
      setloading(false);
      setmoviedata(data);
      return 1;
    } catch (error) {
      setloading(false);
      return <main>sorry! we got some error</main>;
    }
  };

  useEffect(() => {
    fetchingdataa();
  }, [update]);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  const hello = () => {
    console.log("hello world");
  };

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Moviedocuments
                moviedata={moviedata}
                update={update}
                setupdate={setupdate}
              />
            }
          />
          <Route path="/testing" element={<Testing />} />
          <Route
            // path="/movie/:Id"
            path="/hyy/:id/:media_type/:title"
            element={
              <Moviedata
                fetchingdataa={fetchingdataa}
                hello={hello}
                moviedata={moviedata}
              />
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
