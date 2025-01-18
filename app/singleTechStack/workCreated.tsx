"use client";

import React, { useEffect, useState } from "react";

interface Porfolio {
    _id: string;
    type: string;
    header: string;
    subHeader: string;
    picture: string;
    subInformation: [
        {
            client: string;
            worktype: string;
            date: string;
            _id: string;
        }
    ];
    workId: number;
}

function WorkCreated() {
  const [workPicture, setWorkPicture] = useState<Porfolio[]>([]);

    // Function to shuffle array
    const shuffleArray = (array: Porfolio[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
        };

  function getPortfolio() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/work/get-work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        const shuffledData = shuffleArray(data.getallWork);  // Shuffle the data
        setWorkPicture(shuffledData.slice(0, 3));  // Take only the first 4 items
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <div>
      {workPicture.map((work) => (
        <div key={work._id}>
          <h3 className="font-bold">{work.header}</h3>
          {/* <p>{work.subHeader}</p> */}
          <p className="pt-1 pb-3">{work.subInformation[0]?.date}</p>
        </div>
      ))}
    </div>
  );
}

export default WorkCreated;
