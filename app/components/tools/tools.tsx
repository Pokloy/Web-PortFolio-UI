"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ToolsModule from "./tools.module.css";
import Link from "next/link";

interface tools {
  _id:string;
  toolsId: number;
  header: string;
  subHeader: string;
  content: string;
  picture: string;
  date: string;
}

const Tools = () => {
  const [tools, setTools] = useState<tools[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getAllTools = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/get-tools`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.getAllTools.map((item: tools) => ({
          ...item,
          picture: item.picture
            .replace(
              "https://drive.google.com/file/d/",
              "https://drive.google.com/uc?export=view&id="
            )
            .replace("/view?usp=sharing", ""),
        }));
        setTools(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllTools();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (carouselRef.current) {
        const maxScrollLeft =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(autoScroll); // Clear the interval on component unmount
  }, []);

  // Mouse drag functionality for scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    startX.current = e.clientX;
    scrollLeft.current = carouselRef.current!.scrollLeft;
    carouselRef.current!.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    carouselRef.current!.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    carouselRef.current!.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const x = e.clientX;
    const scroll = scrollLeft.current - (x - startX.current);
    carouselRef.current!.scrollLeft = scroll;
  };

  return (
    <div className="relative w-full flex flex-col items-center pt-5">
      <div
        ref={carouselRef}
        className="carousel-container w-full flex gap-5 overflow-hidden px-5 cursor-grab justify-center items-center "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          overflow: "hidden",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {tools.length > 0 ? (
          tools.map((tool, index) => (
            <div
              key={index}
              className={`card-container group flex-shrink-0 w-48 relative hover:scale-105 transition-transform duration-300 ${ToolsModule.centerAllItems}`}
            >
              <Link href={`/singleTool/${tool._id}`} draggable="false">
                <Image
                  src={tool.picture}
                  alt={tool.header}
                  id={tool.toolsId.toString()}
                  width={350}
                  height={350}
                  className="w-full h-auto"
                  draggable="false" // Prevent image dragging
                />
              </Link>
            </div>
          ))
        ) : (
          <>
            <div className="col-span-full flex flex-col justify-center items-center my-20">
            <div className="loading-spinner-black"></div>
            <p className="ml-4">No Technology Stacks appear? Try refreshing it or Move to Google Chrome</p>
            </div>
          </>
          
        )}
      </div>

      {/* Hide the scrollbar */}
      <style jsx>{`
        .carousel-container::-webkit-scrollbar {
          display: none; // Chrome, Safari, and Opera
        }
      `}</style>
    </div>
  );
};

export default Tools;
