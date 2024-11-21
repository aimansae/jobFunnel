import React, { Suspense } from "react";
import { jobFunnels, sites } from "@/data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Loading from "./loading";
import FilterTwo from "./components/FilterTwo";

const Home = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
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
  const country =
    typeof resolvedParams?.country === "string"
      ? resolvedParams.country.toLowerCase()
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
    <main className="grid grid-cols-4 items-center md:w-[80vw] md:border-r-gray-400">
      <section className="col-span-4 md:col-start-2">
        <SubHeader />
      </section>
      <section className="align-center md:col-span-1 md:bg-white">
        <Suspense fallback={<Loading />}>
          <FilterTwo />
        </Suspense>
      </section>
      <section className="col-span-3 p-4 md:col-span-4 md:col-start-2">
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      </section>

      <div className="col-span-4 min-h-screen bg-white text-center md:col-span-3 md:col-start-2">
        {filteredData.length === 0 ? (
          <p className="text-center text-sm text-gray-700">
            No results found..
          </p>
        ) : (
          <div className="text-center text-sm">
            {filteredData.length}
            {filteredData.length === 1 ? "result" : "results"} found{" "}
          </div>
        )}{" "}
        <Suspense fallback={<Loading />}>
          <SelectedFilters
            searchQuery={searchQuery}
            category={category}
            status={status}
            country={country}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Accordion jobs={filteredData} />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
