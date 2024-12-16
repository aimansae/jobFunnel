import React, { Suspense } from "react";
import Search from "./components/Search";
import Accordion from "./components/Accordion";
import SubHeader from "./components/SubHeader";
import SelectedFilters from "./components/SelectedFilters";
import Loading from "./loading";
import Filter from "./components/Filter";
import { jobFunnels } from "./jobFunnels";
import { sites } from "./sites";

const Home = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  console.log("LOGGING PARAMS on PAGE", searchParams);
  const resolvedParams = await Promise.resolve(searchParams);
  const searchQuery =
    typeof resolvedParams?.search === "string"
      ? resolvedParams.search.toLowerCase()
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
    return <p>No results found</p>;
  }

  return (
    <main className="mt-6 grid grid-cols-4 items-center justify-center border p-6 shadow-lg md:mx-auto md:max-w-screen-lg">
      <section className="col-span-5 mt-6">
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
        {filteredData.length === 0 ? (
          <p className="text-center text-sm text-gray-700">No results found.</p>
        ) : (
          <div className="text-center text-sm text-gray-700">
            {filteredData.length === 1
              ? "1 result found"
              : `${filteredData.length} results found`}
          </div>
        )}
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
