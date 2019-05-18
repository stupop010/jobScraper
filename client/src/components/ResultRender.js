import React, { Fragment } from "react";

const ResultRender = props => {
  const { item } = props;
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <h3>{item.salary}</h3>
      <h3>{item.company}</h3>
      <h3>{item.date}</h3>
      <p>{item.summary}</p>
      <p>{item.location}</p>
      <div>
        <a
          href={`https://www.indeed.com${item.link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </a>
      </div>
    </div>
  );
};

export default ResultRender;
