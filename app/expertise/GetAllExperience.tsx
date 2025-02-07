"use client";

import React, { useEffect, useState } from "react";

interface Job {
  company:string;
  jobsId:number;
  timeline: string;
}

const GetAllExperience = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    function getAllJobs() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/get-job`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.getAllJob);
        setJobs(data.getAllJob);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  
      useEffect(() => {
        getAllJobs();
      }, []);

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <p key={index} className="mb-2">
            <strong>{job.timeline}: </strong> {job.company}<br />
          </p>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center flex-col my-10">
          <div className="loading-spinner-black"></div>
          <p className="ml-4">No jobs appear? Try refreshing it or Move to Google Chrome</p>
        </div>
      )}
    </div>
  )
}

export default GetAllExperience



