"use client";

import React, { useEffect, useState } from "react";
import ToolsModule from "./singleTool.module.css";

interface Tool{
    _id:string;
    header:string;
    subHeader:string;
    content:string;
    picture:string;
    date:string;
    toolsId:number;
}

const ToolsCreated = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  const shuffleArray = (array: Tool[]) => {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getTools() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/get-tools`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        const shuffledData = shuffleArray(data.getAllTools);
        setTools(shuffledData.slice(0, 3));
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }

    useEffect(() => {
        getTools();
    }, []);

  return (
    <div className={ToolsModule.singleToolContainer2}>
        {tools.map((tool) => (
            <div key={tool._id}>
            <h3 className="font-bold pb-1">{tool.header}</h3>
            <p>{tool.subHeader}</p>
            <p className="pt-2 pb-5">{tool.date}</p>
            </div>
        ))}
    </div>
  )
}

export default ToolsCreated