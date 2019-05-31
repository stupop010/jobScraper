import React, { Fragment, useState } from "react";

const SearchForm = () => {
  const [location, setLoction] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    console.log(location, jobTitle);
  };

  return (
    <Fragment>
      <form className="search-form" onSubmit={onSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={e => setLoction(e.target.value)}
          />
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <button id="search-button" type="submit">
            Sumbit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default SearchForm;
