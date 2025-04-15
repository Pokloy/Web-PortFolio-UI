//client version
"use client"

import React from 'react'
import SinglePortFolio from '../singlePortFolio';
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const params = useParams();
  const portfolioId = params?.portfolioId;

  const portFolioIdString = typeof portfolioId === "string" ? portfolioId : "";

  return (
    <main>
      <SinglePortFolio portfolioId={portFolioIdString} />
    </main>
  )
}

export default Page;