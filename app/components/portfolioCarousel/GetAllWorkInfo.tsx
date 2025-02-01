"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PortFolioCar from "./portfolioCarousel.module.css";
import Link from "next/link";

interface Work {
  _id:string;
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

const GetAllWorkInfo = () => {
  const [workData, setWorkData] = useState<Work[]>([]);
  const [activeButton, setActiveButton] = useState<string>("Dynamic Web"); // Default to "UX"

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType); // Update the active button type
  };

  function getPictures() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/work/get-work`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.getallWork.map((item: Work) => ({
          ...item,
          picture: item.picture
            .replace(
              "https://drive.google.com/file/d/",
              "https://drive.google.com/uc?export=view&id="
            )
            .replace("/view?usp=sharing", ""),
        }));
        setWorkData(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <>
      <div className={`${PortFolioCar.carMargin} flex justify-center lg:gap-4 gap-1 mb-4 mt-4 `}>
        <button
          className={`${PortFolioCar.carFontSize} relative px-4 py-2 transition-colors duration-300 ${
            activeButton === "UX" ? PortFolioCar.activeBtn : PortFolioCar.exportBtn
          } hover:before:w-full hover:before:bg-customCream before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:transition-all before:duration-300`}
          onClick={() => handleButtonClick("UX")}
        >
          UX
        </button>
        <button
          className={`${PortFolioCar.carFontSize} relative px-4 py-2 transition-colors duration-300 ${
            activeButton === "Dynamic Web"
              ? PortFolioCar.activeBtn
              : PortFolioCar.exportBtn
          } hover:before:w-full hover:before:bg-customCream before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:transition-all before:duration-300`}
          onClick={() => handleButtonClick("Dynamic Web")}
        >
          DYNAMIC WEBSITE
        </button>
        <button
          className={`${PortFolioCar.carFontSize} relative px-4 py-2 transition-colors duration-300 ${
            activeButton === "Static Web"
              ? PortFolioCar.activeBtn
              : PortFolioCar.exportBtn
          } hover:before:w-full hover:before:bg-customCream before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:transition-all before:duration-300`}
          onClick={() => handleButtonClick("Static Web")}
        >
          STATIC WEBSITE
        </button>
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-14">
        {workData.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          workData
            .filter((work) => work.type === activeButton) // Filter based on the active button type
            .map((work, index) => (
              <Link
                key={index}
                href={`/singlePortFolio/${work._id}`}
                className="block group"
              >
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
