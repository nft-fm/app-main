import React from "react";
import EmptySpace from "./EmptySpace";
import LoadingNftCard from "./LoadingNftCardPreFilled";
import sol from "../../assets/img/nftcovers/sol_rising.gif";
import sex from "../../assets/img/nftcovers/sex_kazoo_updated.gif";
import touch from "../../assets/img/nftcovers/touch_id_glitch.gif";
import here from "../../assets/img/nftcovers/here_for_a_reason_glitch.gif";
const LoadingFeatured = () => {
  const LoadingFeatured = [
    <LoadingNftCard
    name="Lowkey"
    arstist="Sol Rising"
    img={sol}
    />,
    <LoadingNftCard 
      name="Sex Kazoo 2"
      artist="The Polish Ambassador"
      img={sex}
    />,
    <LoadingNftCard 
      name="TOUCH IDv2"
      artist="Oshi"
      img={touch}
    />,
    <LoadingNftCard
      name="here for a reason"
      artist="Oshi"
      img={here}
    />,
    <EmptySpace />,
  ];

  return LoadingFeatured;
};

export default LoadingFeatured;
