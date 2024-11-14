import React, { lazy, Suspense } from "react";
import { jobFunnels, sites } from "@/data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Filter from "./components/Filter";
import Loading from "./loading";

const Home = ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery =
    typeof searchParams?.search === "string"
      ? searchParams?.search.toLowerCase()
      : "";
  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category.toLowerCase()
      : "";
  const status =
    typeof searchParams?.status === "string"
      ? searchParams.status.toLowerCase()
      : "";

  const country =
    typeof searchParams?.country === "string"
      ? searchParams.country.toLowerCase()
      : "";

  const filteredData = jobFunnels.filter((job) => {
    const matchesSearch = searchQuery
      ? job.name.toLowerCase().includes(searchQuery)
      : true;
    const matchesCategory = category
      ? job.type.toLowerCase() === category
      : true;
    const matchesStatus = status
      ? job.questionTrees.some((tree) => tree.status.toLowerCase() === status)
      : true;
    const matchesCountry = country
      ? job.questionTrees.some((tree) =>
          tree.siteIds?.some((siteId) => {
            const site = sites.find((site) => site.id === siteId);
            return site && site.country.toLowerCase() === country.toLowerCase();
          }),
        )
      : true;

    return matchesSearch && matchesCategory && matchesStatus && matchesCountry;
  });

  return (
    <div className="min-h flex flex-col justify-center">
      <main className="bg-gray-100 md:flex md:justify-around md:border-r-gray-400">
        <section className="mt-4 overflow-hidden bg-white p-4 shadow-lg md:mt-2 md:w-[75vw]">
          <SubHeader />

          <div className="my-4 grid min-h-screen grid-cols-[0.5fr_2fr] gap-2">
            <div className="w-[150px] px-1">
              <Filter />
            </div>
            <div className=" ">
              <div className="flex flex-col">
                <div>
                  <Search />
                </div>
                <div>
                  <SelectedFilters
                    searchQuery={searchQuery}
                    category={category}
                    status={status}
                    country={country}
                  />
                  {filteredData.length === 0 ? (
                    <div className="my-3 px-2 text-center">
                      <p className="">No results found</p>
                    </div>
                  ) : (
                    <Suspense fallback={<Loading />}>
                      <div>
                        <Accordion jobs={filteredData} />
                      </div>
                    </Suspense>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
