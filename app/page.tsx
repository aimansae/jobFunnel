import React, { Suspense } from "react";
import { jobFunnels, sites } from "@/data";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Filter from "./components/Filter";
import Loading from "./loading";

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
    <div className="min-h-screen w-full justify-center">
      <main className="mx-auto items-center md:w-[80vw] md:justify-center md:border-r-gray-400">
        {/*         <section className="mt-4 overflow-hidden bg-white p-4 shadow-lg md:mt-2 md:w-[75vw]">
         */}
        <section className="w-full shadow-lg">
          <SubHeader />
          <div className="flex items-center gap-2 p-4 md:flex-row md:items-start">
            <div className="flex-2 md:w-1/4">
              <Suspense>
                <Filter />
              </Suspense>
            </div>
            <div className="flex-1 md:w-3/4">
              <Suspense>
                <Search />
              </Suspense>
              <div className="hidden md:block">
                {filteredData.length === 0 ? (
                  <div className="my-3 min-h-screen bg-white px-2 text-center">
                    <p className="p-4">No results found..</p>
                  </div>
                ) : (
                  <Suspense fallback={<Loading />}>
                    <Accordion jobs={filteredData} />
                  </Suspense>
                )}{" "}
              </div>
            </div>
          </div>
          <Suspense>
            <SelectedFilters
              searchQuery={searchQuery}
              category={category}
              status={status}
              country={country}
            />
          </Suspense>
          <div className="block md:hidden">
            {filteredData.length === 0 ? (
              <div className="my-3 min-h-screen bg-white px-2 text-center">
                <p className="p-4">No results found..</p>
              </div>
            ) : (
              <Suspense fallback={<Loading />}>
                <Accordion jobs={filteredData} />
              </Suspense>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
