import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { addJobSearch, fetchSearchs } from "../action/jobs";
import { getSearchs } from "../selectors/jobSelector";

const SearchForm = ({ addJobSearch, searchs, fetchSearchs }) => {
  const [location, setLoction] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [jobTitleSearch, setJobTitleSearch] = useState("");

  useEffect(() => {
    setJobTitleSearch(searchs.jobTitle);
    setLocationSearch(searchs.location);
  }, [searchs.location, searchs.jobTitle]);

  useEffect(() => {
    fetchSearchs();
  }, [fetchSearchs]);

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
            placeholder={locationSearch}
            onChange={e => setLoction(e.target.value)}
          />
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            placeholder={jobTitleSearch}
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

const mapStateToProps = state => {
  return {
    searchs: getSearchs(state)
  };
};

export default connect(
  mapStateToProps,
  { addJobSearch, fetchSearchs }
)(SearchForm);
