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
    <section className="w-full min-h-[500px] ">
      <ul className="flex flex-col ">
        {jobFunnels.map((job, index) => (
          <li
            key={job.id}
            className="border p-3 items-center justify-between my-4 "
          >
            <button
              onClick={() => toggleButton(job.id)}
              className=" flex items-center w-full text-left"
              aria-expanded={expanded === job.id}
              aria-controls={`content-${job.id}`}
            >
              <span className="text-sm sm:text-base font-bold mr-1">
                {index + 1}.
              </span>

              <span className="text-sm sm:text-base font-bold flex-grow">
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
              <div className="py-2 overflow-y-auto max-h-[200px]">
                <ul className=" ">
                  {job.questionTrees.map((question) => (
                    <li className="text-xs sm:text-base my-3" key={question.id}>
                      <div className="flex flex-row justify-between items-center">
                        <span className="underline">{question.name}</span>
                        <span
                          className={`border px-3 py-1 rounded-full 
                            ${
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
