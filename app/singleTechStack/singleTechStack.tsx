"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleTechStack from "./singleTechStack.module.css"

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


const singleTechStack: React.FC<singleTechStack> = ({ techStackId }) => {
  const [techStack, SetTechStack] = useState<TechStack| null>(null);
    
      
  useEffect(() => {
    getTechStack();
  }, [techStackId]);  // Trigger fetch when portfolioId changes
  
  const getTechStack = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/techstack/find-techStack/${techStackId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const formattedData = {
        ...data.findSpecificTechStack,
        picture: data.findSpecificTechStack.picture
          .replace(
            "https://drive.google.com/file/d/",
            "https://drive.google.com/uc?export=view&id="
          )
          .replace("/view?usp=sharing", ""),
      };
      SetTechStack(formattedData);  // Update state with fetched data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
  


  return (
    <div>
     <div>
        <p className={SingleTechStack.customHeader}>{techStack?.header}</p>
      </div>
      <div className="py-5">{techStack?.date} | By: Alier E. Torrenueva</div>
      <div>
       <Image 
          src={techStack?.picture || "/placeholder-image.png"}
          alt={techStack?.subHeader || "Default Alt Text"}
          width={400}
          height={400}
          className="w-full h-auto"
        /> 
        <div><p className={`${SingleTechStack.customSubHeader}`}>{techStack?.subHeader}</p></div>
        <div><p className="pt-9 text-justify">{techStack?.content}</p></div>
      </div> 
    </div>
  )
}

export default singleTechStack