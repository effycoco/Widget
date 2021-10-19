import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  const handleInput = (event) => {
    setTerm(event.target.value);
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);
  useEffect(() => {
    const searchAPI = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          format: "json",
          origin: "*",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    if (debouncedTerm) {
      searchAPI();
    }
  }, [debouncedTerm]);
  //   useEffect(() => {

  //     if (term && !results.length) {
  //       searchAPI();
  //     } else {
  //       const timeOutId = setTimeout(() => {
  //         if (term) {
  //           searchAPI();
  //         }
  //       }, 500);
  //       return () => {
  //         clearTimeout(timeOutId);
  //       };
  //     }
  //   }, [term]);
  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Searh Term</label>
          <input
            className="input"
            value={term}
            onChange={(event) => handleInput(event)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
