import React from "react";
import { Link } from "react-router-dom";
const Missing = () => {
  return (
    <main className="Missing">
      <h2>Missing</h2>
      <p>Weel that's disappoiting</p>
      <p>
        <Link to="/">Visit Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;
