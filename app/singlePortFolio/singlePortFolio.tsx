"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PortfolioModule from "./singlePortFolio.module.css";

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
}

interface singlePortFolio{
    portfolioId:string;
}

const SinglePortFolio: React.FC<singlePortFolio> = ({ portfolioId }) => {
    const [portFolio, setPortFolio] = useState<PortFolio| null>(null);
    
    useEffect(() => {
        getPortfolio();
    }, [portfolioId]);
    
    const getPortfolio = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/work/find-work/${portfolioId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const formattedData = {
                ...data.findSpecificWork,
                picture: data.findSpecificWork.picture
                    .replace(
                        "https://drive.google.com/file/d/",
                        "https://drive.google.com/uc?export=view&id="
                    )
                    .replace("/view?usp=sharing", ""),
            };
            setPortFolio(formattedData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
    <div  className={`lg:p-10 ${PortfolioModule.containerSettings}`}>      
        <div className='lg:w-3/4 mr-5'>
            <Image 
            src={portFolio?.picture || "/placeholder-image.png"} 
            alt={portFolio?.header || "Default Alt Text"} 
            width={400}
            height={400}
            className="w-full h-auto"
            />
        </div>

        <div className='lg:w-1/2'>
            <div>
                <p className={PortfolioModule.customHeader}>{portFolio?.header}</p>
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