"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TechStackModules from "./techStack.module.css";
import Link from "next/link";

interface techStack {
    _id:string;
    techStackId:number;
    header: string;
    subHeader: string;
    content: string;
    picture: string;
    date: string;
}

const TechStack = () => {
    const [techStack, setTechStack] = useState<techStack[]>([]);

    function getAllTechStack(){
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/techstack/get-techStack`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },   
        })
        .then((response) => response.json())
        .then((data) => {
            const formattedData = data.getallTechStack.map((item: techStack) => ({
                ...item,
                picture: item.picture
                .replace(
                    "https://drive.google.com/file/d/",
                    "https://drive.google.com/uc?export=view&id="
                )
                .replace("/view?usp=sharing", ""),
            }));
            setTechStack(formattedData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    useEffect(() => {
        getAllTechStack();
    }, []);

  return (
    <div className={TechStackModules.techStackSection}>
        {techStack.length > 0 ? (
           techStack.map((stack, index) => (
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
        ):(
            <p className="col-span-full text-center">No images appear? Try refreshing it or move to Google Chrome</p>
        )}
    </div>
  )
}

export default TechStack