import React from "react";
import "./score.css";
const Score = ({ score, word_count }) => (
  <div className="score">
    {score}/{word_count} points
  </div>
);
export default Score;
