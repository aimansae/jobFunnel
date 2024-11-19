import React, { Suspense } from "react";
import { jobFunnels, sites } from "@/data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Filter from "./components/Filter";
import Loading from "./loading";
import FilterTwo from "./components/FilterTwo";

const Home = async ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const resolvedParams = await Promise.resolve(searchParams);

  console.log("Search Params+++++++++++++:", resolvedParams.status);

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
    <main className="grid grid-cols-4 items-center md:w-[80vw] md:border-r-gray-400">
      <section className="col-span-4 md:col-start-2">
        <SubHeader />
      </section>
      <section className="align-center md:col-span-1 md:bg-white">
        <Suspense>
          <FilterTwo />
        </Suspense>
      </section>
      <section className="col-span-3 p-4 md:col-span-4 md:col-start-2">
        <Suspense>
          <Search />
        </Suspense>
      </section>

      <div className="col-span-4 min-h-screen bg-white text-center md:col-span-3 md:col-start-2">
        {filteredData.length === 0 ? (
          <p className="text-gray-700">No results found..</p>
        ) : (
          <div className="text-center">
            {filteredData.length}{" "}
            {filteredData.length === 1 ? "Result" : "Results"} Found{" "}
            <Suspense>
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
        )}
      </div>
    </main>
  );
};

export default Home;
