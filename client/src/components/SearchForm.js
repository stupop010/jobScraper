import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addJobSearch } from "../action/jobs";

const SearchForm = ({ addJobSearch }) => {
  const [location, setLoction] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      location,
      jobTitle
    };
    addJobSearch(data);
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

export default connect(
  null,
  { addJobSearch }
)(SearchForm);
