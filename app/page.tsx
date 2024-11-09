import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";

const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <main className="bg-gray-100 md:flex md:justify-around md:border-r-gray-400">
        <Card />
      </main>
    </div>
  );
};

export default Home;
