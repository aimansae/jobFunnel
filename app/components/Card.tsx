import React from "react";
import Accordion from "./Accordion";
import CardHeader from "./CardHeader";

const Card = () => {
  return (
    <section className="mt-4 overflow-hidden bg-white p-4 shadow-lg md:mt-2 md:w-[75vw]">
      <CardHeader />
      <h1 className="my-4 text-lg font-semibold sm:text-xl">List of trees:</h1>
      <Accordion />
    </section>
  );
};

export default Card;
