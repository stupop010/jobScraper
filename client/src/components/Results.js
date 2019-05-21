import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultRender from "./ResultRender";
import SearchForm from "./SearchForm";

function useSearches() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("/api");
      setData(results.data);
    };
    fetchData();
  }, []);
  return { data };
}

const Results = () => {
  const { data } = useSearches();
  return (
    <div>
      <SearchForm />
      {data.map(item => {
        return <ResultRender item={item} key={item.jobId} />;
      })}
    </div>
  );
};

export default Results;
