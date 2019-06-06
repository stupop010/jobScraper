import React, { useEffect, useState } from "react";
import { addJobSearch } from "../action/jobs";
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

const Results = ({ fetchJobs, shouldFetchData, job, loading }) => {
  const [ifEmpty, setIfEmpty] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (shouldFetchData) {
      fetchJobs();
    }
  }, [shouldFetchData]);

  useEffect(() => {
    if (!Array.isArray(fetchJobs) || !fetchJobs.length) {
      setIfEmpty(true);
    } else {
      setIfEmpty(false);
    }
  }, [job]);

  return (
    <div>
      <SearchForm />
      {ifEmpty ? null : <h1>No jobs found! Please search.</h1>}
      {loading ? (
        <Loading />
      ) : (
        job.map(item => {
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
  { fetchJobs, addJobSearch }
)(Results);
