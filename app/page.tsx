import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";

const Home = () => {
  return (
    <div className="flex flex-col justify-center bg-red-300 ">
      <Header />
      <main className=" md:border-r-gray-400  bg-gray-100 md:flex md:justify-around">
        <Card />
      </main>
    </div>
  );
};

export default Home;
