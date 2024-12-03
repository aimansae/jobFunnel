"use client";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import { JobFunnel } from "../../types";
import CountryFlag from "./CountryFlag";
import { getCountryNames } from "../utils/getData";

const Accordion = ({ jobs }: { jobs: JobFunnel[] }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleButton = (jobId: string) => {
    setExpanded((prevJobId) => (prevJobId === jobId ? null : jobId));
  };

  return (
    <section className="min-h-screen w-full overflow-hidden bg-white p-4 shadow-lg">
      <ul className="flex flex-col">
        {jobs.map((job, index) => (
          <li
            onClick={() => toggleButton(job.id)}
            key={job.id}
            className={`my-4 cursor-pointer items-center justify-between border p-3 ${
              expanded === job.id ? "bg-gray-100" : ""
            }`}
            aria-expanded={expanded === job.id}
            aria-controls={`content-${job.id}`}
          >
            <div className="flex w-full items-center text-left">
              <span className="mr-1 text-sm font-bold sm:text-base">
                {index + 1}.
              </span>

              <span className="flex-grow text-sm font-bold sm:text-base">
                {job.name}
              </span>

              <IoIosArrowDown
                data-testid="arrowIcon"
                className={`transition-transform duration-200 ${
                  expanded === job.id ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              id={`content-${job.id}`}
              data-testid={`content-${job.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                expanded === job.id ? "opacity-100" : "hidden opacity-0"
              }`}
              ref={(el: HTMLDivElement | null): void => {
                if (el && expanded === job.id) {
                  el.style.maxHeight = `${el.scrollHeight}px`;
                } else if (el) {
                  el.style.maxHeight = "0px";
                }
              }}
            >
              <div className="overflow-y-auto py-2">
                <ul>
                  {job.questionTrees.map((question) => (
                    <li className="my-3 text-xs sm:text-base" key={question.id}>
                      <div className="flex flex-row items-center justify-between gap-2 px-1">
                        <span className="underline">{question.name}</span>
                        <span
                          className={`rounded-full border px-1 py-1 text-xs sm:text-sm md:px-3 ${
                            question.status === "draft"
                              ? "border-gray-100 bg-gray-200"
                              : question.status === "published"
                                ? "border-green-100 bg-green-400"
                                : "bg-gray-100"
                          }`}
                        >
                          {question.status}
                        </span>
                        <div className="flex gap-2">
                          {getCountryNames(question.siteIds ?? []).map(
                            (country, i) => (
                              <span key={i}>
                                <CountryFlag country={country} />
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Accordion;
