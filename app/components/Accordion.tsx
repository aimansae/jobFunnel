"use client";
import { IoIosArrowDown } from "react-icons/io";
import { jobFunnels } from "@/data";
import React, { useState } from "react";

const Accordion = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleButton = (jobId: string) => {
    setExpanded((prevJobId) => (prevJobId === jobId ? null : jobId));
  };
  return (
    <section className="min-h-[500px] w-full">
      <ul className="flex flex-col">
        {jobFunnels.map((job, index) => (
          <li
            key={job.id}
            className="my-4 items-center justify-between border p-3"
          >
            <button
              onClick={() => toggleButton(job.id)}
              className="flex w-full items-center text-left"
              aria-expanded={expanded === job.id}
              aria-controls={`content-${job.id}`}
            >
              <span className="mr-1 text-sm font-bold sm:text-base">
                {index + 1}.
              </span>

              <span className="flex-grow text-sm font-bold sm:text-base">
                {job.name}
              </span>

              <IoIosArrowDown
                className={`transition-transform duration-200 ${
                  expanded === job.id ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`content-${job.id}`}
              className={`overflow-hidden transition-all duration-500 ${
                expanded === job.id ? "max-h-[500px]" : "max-h-0"
              }`}
              style={{
                height: expanded === job.id ? "auto" : 0,
                opacity: expanded === job.id ? 1 : 0,
              }}
            >
              {" "}
              <div className="max-h-[200px] overflow-y-auto py-2">
                <ul className=" ">
                  {job.questionTrees.map((question) => (
                    <li className="my-3 text-xs sm:text-base" key={question.id}>
                      <div className="flex flex-row items-center justify-between">
                        <span className="underline">{question.name}</span>
                        <span
                          className={`rounded-full border px-3 py-1 ${
                            question.status === "draft"
                              ? "border-gray-100 bg-gray-200"
                              : question.status === "published"
                                ? "border-green-100 bg-green-400"
                                : "bg-gray-100"
                          } `}
                        >
                          {question.status}
                        </span>
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
