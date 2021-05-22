import React from "react";
import EmptySpace from "./EmptySpace";
import LoadingNftCard from "./LoadingNftCard";

const LoadingFeatured = () => {
  const LoadingFeatured = [
    <LoadingNftCard />,
    <LoadingNftCard />,
    <LoadingNftCard />,
    <LoadingNftCard />,
    // <LoadingNftCard />,
    <EmptySpace />,
  ];

  return LoadingFeatured;
};

export default LoadingFeatured;
