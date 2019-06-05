export const getJobs = state => state.job.items;
export const jobsLoading = state => state.job.isLoading;

export const shouldFetchData = state => state.job.shouldFetchData;
