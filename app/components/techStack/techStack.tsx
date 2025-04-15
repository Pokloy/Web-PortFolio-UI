"use client";

import useSWR from "swr";
import Image from "next/image";
import TechStackModules from "./techStack.module.css";
import Link from "next/link";

interface TechStack {
  _id: string;
  techStackId: number;
  header: string;
  subHeader: string;
  content: string;
  picture: string;
  date: string;
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  const formattedData = data.getallTechStack.map((item: TechStack) => ({
    ...item,
    picture: item.picture
      .replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=")
      .replace("/view?usp=sharing", ""),
  }));

  return formattedData;
};

const TechStack = () => {
  // Use SWR to fetch data
  const { data: techStack, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/techstack/get-techStack`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center flex-col my-20">
        <div className="loading-spinner-black"></div>
        <p className="ml-4">Loading Tech Stacks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center text-white">
        <p>Error loading tech stacks. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={TechStackModules.techStackSection}>
      {techStack && techStack.length > 0 ? (
        techStack.map((stack: TechStack, index: any) => (
          <div key={index} className="card-container group m-3">
            <Link href={`/singleTechStack/${stack._id}`} className="block">
              <div className="card flex flex-col items-center justify-center w-full relative p-4 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Image
                  src={stack.picture}
                  alt={stack.header}
                  id={stack.techStackId.toString()}
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
                <p className={`text-center mt-3 ${TechStackModules.header1} transition-colors duration-300 group-hover:text-blue-500`}>
                  {stack.header}
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-white">
          <p>No Technology Stacks available. Try refreshing the page or switch to Google Chrome.</p>
        </div>
      )}
    </div>
  );
};

export default TechStack;
