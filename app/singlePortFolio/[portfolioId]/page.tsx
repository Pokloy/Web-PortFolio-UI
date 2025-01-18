// server version
// import React from 'react'
// import SinglePortFolio from '../singlePortFolio';

// interface Params {
//   portfolioId: string;
// }

// const Page = ({ params }: { params: Params }) => {
//   const portfolioId = params.portfolioId;

//   if (!portfolioId) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main className='min-h-screen flex flex-col'>
//       <SinglePortFolio portfolioId={portfolioId} />
//     </main>
//   )
// }

// export default Page;


//client version
"use client"

import React from 'react'
import SinglePortFolio from '../singlePortFolio';
import { useParams } from "next/navigation";

const page: React.FC = () => {
  const params = useParams();
  const portfolioId = params?.portfolioId;

  const portFolioIdString = typeof portfolioId === "string" ? portfolioId : "";

  return (
    <main>
      <SinglePortFolio portfolioId={portFolioIdString} />
    </main>
  )
}

export default page;