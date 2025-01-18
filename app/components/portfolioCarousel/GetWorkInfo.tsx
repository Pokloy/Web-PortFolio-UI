"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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

const PortCarousel = () => {
  const [workData, setWorkData] = useState<Work[]>([]);

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

        // Shuffle the array randomly and pick only 8 items
        const randomPictures = formattedData.sort(() => 0.5 - Math.random()).slice(0, 8);

        setWorkData(randomPictures);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {workData.length > 0 ? (
        workData.map((work, index) => (
          <Link
            key={index}
            href={`/singlePortFolio/${work._id}`}
            className="block group"
            // Replace `"#"` with the actual link when available
          >
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
        <p className="col-span-full text-center">No images to display or failed to load images.</p>
      )}
    </div>
  );
};

export default PortCarousel;
