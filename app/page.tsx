import React from "react";
import { jobFunnels } from "@/data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import Filter from "./components/Filter";

const Home = ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery =
    typeof searchParams?.search === "string"
      ? searchParams?.search.toLowerCase()
      : "";

  const filteredData = searchQuery
    ? jobFunnels.filter((job) =>
        job.name.toLocaleLowerCase().includes(searchQuery),
      )
    : jobFunnels;

  return (
    <div className="flex flex-col justify-center">
      <main className="bg-gray-100 md:flex md:justify-around md:border-r-gray-400">
        <section className="mt-4 overflow-hidden bg-white p-4 shadow-lg md:mt-2 md:w-[75vw]">
          <SubHeader />
          <div className="my-2 flex items-center justify-between">
            <h1 className="text-sm font-semibold sm:text-xl md:text-lg">
              List of trees:
            </h1>
            <Search />
          </div>
          {filteredData.length === 0 ? (
            <p>No results found</p>
          ) : (
            <div className="grid grid-cols-[1fr_2fr]">
              <Filter />
              <Accordion jobs={filteredData} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
