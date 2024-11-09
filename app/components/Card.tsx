import React from "react";
import Accordion from "./Accordion";
import CardHeader from "./CardHeader";

const Card = () => {
  return (
    <section className="bg-white shadow-lg  p-4 md:mt-2 md:w-[75vw] overflow-hidden ">
      <CardHeader></CardHeader>
      <h1 className="text-lg sm:text-xl font-semibold my-2">List of trees:</h1>
      <Accordion />
    </section>
  );
};

export default Card;
