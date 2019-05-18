import React from "react";

const SearchForm = () => {
  return (
    <div>
      <form>
        <input type="text" name="location" />
        <input type="text" name="jobTitle" />
        <input type="submit" value="sumbit" />
      </form>
    </div>
  );
};

export default SearchForm;
