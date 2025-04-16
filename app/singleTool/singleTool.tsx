"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleToolModules from "./singleTool.module.css";

interface Tool{
    _id:string;
    header:string;
    subHeader:string;
    content:string;
    picture:string;
    date:string;
    toolsId:number;
}

interface singleTool{
    toolId:string;
}

const SingleTool: React.FC<singleTool> = ({ toolId }) => {
  const [tools, setTools] = useState<Tool| null>(null);

  useEffect(() => {
    getTools();
  }, [toolId])

  const getTools = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/find-tools/${toolId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const formattedData = {
        ...data.findSpecificTool,
        picture: data.findSpecificTool.picture
          .replace(
            "https://drive.google.com/file/d/",
            "https://drive.google.com/uc?export=view&id="
          )
          .replace("/view?usp=sharing", ""),
      };
      setTools(formattedData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
    <div className={SingleToolModules.singleToolContainer}>
        <div>
          <p className={SingleToolModules.customHeader}>{tools?.header}</p>
        </div>
        <div className="py-5">{tools?.date} | By: Alier E. Torrenueva</div>
        <div>
            <Image 
              src={tools?.picture || "/placeholder-image.png"}
              alt={tools?.subHeader || "Default Alt Text"}
              width={400}
              height={400}
            /> 
            <div className="mt-10"><p className={SingleToolModules.customSubHeader}>{tools?.subHeader}</p></div>
            <div><p className={`pt-9 text-justify`}>{tools?.content}</p></div>
        </div>
    </div>
  )
}

export default SingleTool