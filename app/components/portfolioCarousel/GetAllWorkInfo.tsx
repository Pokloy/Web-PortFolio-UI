"use client";

import React, { useState } from "react";
import Image from "next/image";
import PortFolioCar from "./portfolioCarousel.module.css";
import Link from "next/link";
import useSWR from "swr";

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

// SWR Fetcher with formatting
const fetcher = async (url: string): Promise<Work[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  // Format Google Drive image URLs
  return data.getallWork.map((item: Work) => ({
    ...item,
    picture: item.picture
      .replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=")
      .replace("/view?usp=sharing", ""),
  }));
};

const GetAllWorkInfo = () => {
  const [activeButton, setActiveButton] = useState<string>("Dynamic Web");

  const { data: workData, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/work/get-work`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const filteredWork = workData?.filter((work) => work.type === activeButton) ?? [];

  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center h-64">
        <p className="text-red-500">Error loading work portfolio. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`${PortFolioCar.carMargin} flex justify-center lg:gap-4 gap-1 mb-4 mt-4`}>
        {["UX", "Dynamic Web", "Static Web"].map((type) => (
          <button
            key={type}
            className={`${PortFolioCar.carFontSize} relative px-4 py-2 transition-colors duration-300 ${
              activeButton === type ? PortFolioCar.activeBtn : PortFolioCar.exportBtn
            } hover:before:w-full hover:before:bg-customCream before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:transition-all before:duration-300`}
            onClick={() => handleButtonClick(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-14">
        {filteredWork.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <p>No work found for this category.</p>
          </div>
        ) : (
          filteredWork.map((work, index) => (
            <Link key={index} href={`/singlePortFolio/${work._id}`} className="block group">
              <div className="w-full flex justify-center relative">
                <Image
                  src={work.picture}
                  alt={work.header}
                  id={work.workId.toString()}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300"></div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default GetAllWorkInfo;
