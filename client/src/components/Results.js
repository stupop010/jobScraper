import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";

import { getJobs, jobsLoading } from "../selectors/job";
import { fetchJobs } from "../action/jobs";
import ResultRender from "./ResultRender";
import SearchForm from "./SearchForm";
import Loading from "./Loading";

// const useSearches = ({ fetchJobs }) => {
//   useEffect(() => {
//     fetchJobs();
//   }, [fetchJobs]);
// };

const Results = props => {
  const fetchJobs = props.fetchJobs;
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <div>
      <SearchForm />
      {props.loading ? (
        <Loading />
      ) : (
        props.job.map(item => {
          return <ResultRender item={item} key={item.jobId} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    job: getJobs(state),
    loading: jobsLoading(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchJobs }
)(Results);
