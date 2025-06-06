"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PortfolioModule from "./singlePortFolio.module.css";
import useSWR from "swr";
import Link from 'next/link';

interface PortFolio{
    _id:string;
    type:string;
    header:string;
    subHeader:string;
    picture:string;
    subInformation: [
        {
            client:string;
            worktype:string;
            date:string;
        }
    ];
    workId:number;
    link:string;
}

interface singlePortFolio{
    portfolioId:string;
}

const fetcher = async(url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const formattedData = {
        ...data.findSpecificWork,
        picture: data.findSpecificWork.picture
            .replace(
                "https://drive.google.com/file/d/",
                "https://drive.google.com/uc?export=view&id="
            )
            .replace("/view?usp=sharing", ""),
    };

    return formattedData;
}

const SinglePortFolio: React.FC<singlePortFolio> = ({ portfolioId }) => {
    const { data:  portFolio, error, isLoading  } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/work/find-work/${portfolioId}`,
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
    <div  className={`lg:p-10 ${PortfolioModule.containerSettings}`}>      
        <div className='lg:w-3/4 mr-5'>
            <Link className='lg:w-3/4 mr-5' href={portFolio?.link || "/"} target="_blank">
            <Image 
            src={portFolio?.picture || "/placeholder-image.png"} 
            alt={portFolio?.header || "Default Alt Text"} 
            width={400}
            height={400}
            className="w-full h-auto"
            />
            </Link>
        </div>

        <div className='lg:w-1/2'>
            <div>
                <Link className='lg:w-3/4 mr-5' href={portFolio?.link || "/"} target="_blank">
                <p className={PortfolioModule.customHeader}>{portFolio?.header}</p>
                </Link>
            </div>

            <div>
                <p className="text-justify pt-8 pb-5">{portFolio?.subHeader}</p>
            </div>
            
            <div className={PortfolioModule.customHr}></div>
            <div className="flex lg:p-1">
                <p><strong>Client: </strong></p>
                <p className="pl-2">{portFolio?.subInformation[0].client}</p>
            </div>
            <div className="flex lg:p-1">
                <p><strong>Service: </strong></p>
                <p className="pl-2">{portFolio?.subInformation[0].worktype}</p>
            </div>
            <div className="flex lg:p-1">
                <p><strong>Year: </strong></p>
                <p className="pl-2">{portFolio?.subInformation[0].date}</p>
            </div>
        </div>
    </div>
  )
}

export default SinglePortFolio