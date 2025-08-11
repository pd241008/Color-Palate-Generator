"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/palette");
  };

  return (
    <div>
      <main>
        <section className="flex justify-center">
          <h1 className="mb-4 text-4xl pt-50 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Color Palette Genrator
          </h1>
        </section>
        <section className="flex justify-center">
          <button
            onClick={handleClick}
            className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Go to the Color Palate Page
          </button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
