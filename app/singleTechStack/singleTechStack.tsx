"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleTechStackModules from "./singleTechStack.module.css"
import useSWR from "swr";

interface TechStack{
  _id:string;
  header:string;
  subHeader:string;
  content:string;
  picture:string;
  date:string;
  techStackId:number;
}

interface singleTechStack {
  techStackId:string;
}


const fetcher = async(url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  const formattedData = {
    ...data.findSpecificTechStack,
    picture: data.findSpecificTechStack.picture
      .replace(
        "https://drive.google.com/file/d/",
        "https://drive.google.com/uc?export=view&id="
      )
      .replace("/view?usp=sharing", ""),
  };

  return formattedData;
}



const SingleTechStack: React.FC<singleTechStack> = ({ techStackId }) => {
  const { data:  techStack, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/techstack/find-techStack/${techStackId}`,
      fetcher
  );
    
  // Loading state
  if (isLoading) {
      return (
      <div className="col-span-full flex justify-center items-center flex-col my-20">
          <div className="loading-spinner-black"></div>
          <p className="ml-4">Loading Tools...</p>
      </div>
      );
  }

  // Error handling
  if (error) {
      return (
      <div className="col-span-full text-center text-white">
          <p>Error loading Tools. Please try again later.</p>
      </div>
      );
  }

  return (
    <div>
     <div>
        <p className={SingleTechStackModules.customHeader}>{techStack?.header}</p>
      </div>
      <div className="py-5">{techStack?.date} | By: Alier E. Torrenueva</div>
      <div>
       <Image 
          src={techStack?.picture || "/placeholder-image.png"}
          alt={techStack?.subHeader || "Default Alt Text"}
          width={200}
          height={200}
          className="w-full h-auto"
        /> 
        <div><p className={`${SingleTechStackModules.customSubHeader}`}>{techStack?.subHeader}</p></div>
        <div><p className="pt-9 text-justify">{techStack?.content}</p></div>
      </div> 
    </div>
  )
}

export default SingleTechStack