"use client";

import useSWR from "swr";
import React from "react";

interface Job {
  company: string;
  jobsId: number;
  timeline: string;
}

// SWR fetcher function
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

const GetAllExperience = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/job/get-job`,
    fetcher,
    {
      revalidateOnFocus: false, // optional: avoid refetching on tab switch
    }
  );

  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center flex-col my-10">
        <div className="loading-spinner-black"></div>
        <p className="ml-4">Loading job experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center flex-col my-10">
        <p>Error loading jobs. Please try again later.</p>
      </div>
    );
  }

  const jobs = data?.getAllJob;

  if (!jobs || jobs.length === 0) {
    return (
      <div className="col-span-full flex justify-center items-center flex-col my-10">
        <p>No jobs available. Try refreshing or switch to another browser.</p>
      </div>
    );
  }

  return (
    <div>
      {jobs.map((job: any, index: number) => (
        <p key={index} className="mb-2">
          <strong>{job.timeline}:</strong> {job.company}
        </p>
      ))}
    </div>
  );
};

export default GetAllExperience;
