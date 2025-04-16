"use client";

import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Defining the Work type
interface Work {
  _id: string;
  workId: number;
  header: string;
  picture: string;
  subHeader: string;
  type: string;
  subInformation: {
    client: string;
    date: string;
    worktype: string;
    id: string;
  }[];
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  const formattedData = data.getallWork.map((item: Work) => ({
    ...item,
    picture: item.picture
      .replace(
        "https://drive.google.com/file/d/",
        "https://drive.google.com/uc?export=view&id="
      )
      .replace("/view?usp=sharing", ""),
  }));

  // Shuffle and return only 8
  return formattedData.sort(() => 0.5 - Math.random()).slice(0, 8);
};

const GetWorkInfo = () => {
  const { data: workData, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/work/get-work`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center h-full text-white">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="col-span-full text-center text-white">
        Failed to load data. Try again later.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-14">
      {workData && workData.length > 0 ? (
        workData.map((work: Work, index: any) => (
          <Link key={index} href={`/singlePortFolio/${work._id}`} className="block group">
            <div className="w-full flex justify-center relative">
              <Image
                src={work.picture}
                alt={`Work ${index + 1}`}
                width={350}
                height={350}
                className="rounded-lg object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300"></div>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center text-white">
          No images appear? Try refreshing it or move to Google Chrome.
        </p>
      )}
    </div>
  );
};

export default GetWorkInfo;
