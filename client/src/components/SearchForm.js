import React, { Fragment } from "react";

const SearchForm = () => {
  return (
    <Fragment>
      <form className="search-form">
        <div>
          <label>Location:</label>
          <input type="text" name="location" />
        </div>
        <div>
          <label>Job Title:</label>
          <input type="text" name="jobTitle" />
        </div>
        <div>
          <button id="search-button" type="button">
            Sumbit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default SearchForm;
