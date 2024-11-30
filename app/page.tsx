import React, { Suspense } from "react";
import { jobFunnels, sites } from "../data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Loading from "./loading";
import Filter from "./components/Filter";

const Home = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  console.log("LOGGING PARAMS on pAGE", searchParams);
  const resolvedParams = await Promise.resolve(searchParams);
  const searchQuery =
    typeof resolvedParams?.search === "string"
      ? resolvedParams?.search.toLowerCase()
      : "";
  const category =
    typeof resolvedParams?.category === "string"
      ? resolvedParams.category.toLowerCase()
      : "";
  const status =
    typeof resolvedParams?.status === "string"
      ? resolvedParams.status.toLowerCase()
      : "";
  const countries =
    typeof resolvedParams?.country === "string"
      ? resolvedParams.country.toLowerCase().split(",")
      : [];

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

    const matchesCountry =
      countries.length > 0
        ? countries.every((selectedCountry) =>
            job.questionTrees.some((tree) =>
              tree.siteIds?.some((siteId) => {
                const site = sites.find((site) => site.id === siteId);
                console.log(
                  `Checking siteId: ${siteId} for country: ${selectedCountry} -> site:`,
                  site,
                );
                return (
                  site &&
                  selectedCountry.toLowerCase() === site.country.toLowerCase()
                );
              }),
            ),
          )
        : true;

    return matchesSearch && matchesCategory && matchesStatus && matchesCountry;
  });
  if (!searchParams) {
    return <p>No data found</p>;
  }
  return (
    <main className="grid grid-cols-4 items-center md:w-[80vw] md:border-r-gray-400">
      <section className="col-span-4 md:col-start-2">
        <SubHeader />
      </section>
      <section className="align-center md:col-span-1 md:bg-white">
        <Suspense fallback={<Loading />}>
          <Filter />
        </Suspense>
      </section>
      <section className="col-span-3 p-4 md:col-span-4 md:col-start-2">
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      </section>

      <div className="col-span-4 min-h-screen bg-white text-center md:col-span-3 md:col-start-2">
        {searchQuery && filteredData.length === 0 ? (
          <p className="text-center text-sm text-gray-700">No results found.</p>
        ) : searchQuery ? (
          <div className="text-center text-sm text-gray-700">
            {filteredData.length}
            {filteredData.length === 1 ? " result" : " results "} found
          </div>
        ) : null}
        <Suspense fallback={<Loading />}>
          <SelectedFilters
            searchQuery={searchQuery}
            category={category}
            status={status}
            country={countries.join(",")}
          ></SelectedFilters>
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Accordion jobs={filteredData}></Accordion>
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
