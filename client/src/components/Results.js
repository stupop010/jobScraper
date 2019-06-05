import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  getJobs,
  jobsLoading,
  shouldFetchData
} from "../selectors/jobSelector";
import { fetchJobs } from "../action/jobs";
import ResultRender from "./ResultRender";
import SearchForm from "./SearchForm";
import Loading from "./Loading";

const Results = props => {
  const [ifEmpty, setIfEmpty] = useState(false);
  const fetchJobs = props.fetchJobs;

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (props.shouldFetchData) {
      fetchJobs();
    }
  }, [props.shouldFetchData]);

  useEffect(() => {
    console.log("me");
    if (!Array.isArray(fetchJobs) || !fetchJobs.length) {
      setIfEmpty(true);
    } else {
      setIfEmpty(false);
    }
  }, [props.job]);

  return (
    <div>
      <SearchForm />
      {ifEmpty ? null : <h1>No jobs found! Please search.</h1>}
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
    loading: jobsLoading(state),
    shouldFetchData: shouldFetchData(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchJobs }
)(Results);
