import React from "react";

const AccordionSkeleton = () => {
  return (
    <section className="min-h-[500px] w-full animate-pulse bg-white p-4 shadow-lg">
      <ul className="flex flex-col">
        {[...Array(3)].map((_, index) => (
          <li key={index} className="my-4 rounded-lg border bg-gray-100 p-3">
            {/* Accordion Header Skeleton */}
            <button
              className="flex w-full items-center space-x-4 text-left"
              aria-expanded={false}
              aria-controls={`content-skeleton${index}`}
            >
              <span className="h-4 w-10 rounded-sm bg-gray-300"></span>
              <span className="h-4 flex-grow rounded-sm bg-gray-300"></span>
              <span className="h-4 w-4 rounded-full bg-gray-300"></span>
            </button>

            {/* Accordion Content Skeleton */}
            <div
              id={`content-skeleton${index}`}
              className="overflow-hidden opacity-100 transition-all duration-200"
            >
              <div className="overflow-y-auto py-2">
                <ul>
                  {[...Array(2)].map((_, idx) => (
                    <li key={idx} className="my-3 text-xs sm:text-base">
                      {/* Question Skeleton */}
                      <div className="flex animate-pulse items-center justify-between space-x-2">
                        <div className="h-4 w-24 rounded-sm bg-gray-300"></div>
                        <div className="h-6 w-20 rounded-sm bg-gray-300"></div>
                        <div className="flex gap-2">
                          {[...Array(2)].map((_, i) => (
                            <span
                              key={i}
                              className="h-6 w-6 rounded-full bg-gray-300"
                            ></span>
                          ))}
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
export default AccordionSkeleton;
