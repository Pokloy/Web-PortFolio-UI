// server version
import React from 'react'
import SinglePortFolio from '../singlePortFolio';

interface Params {
  portfolioId: string;
}

interface PageProps {
  params: Params;
}

const Page = ({ params }: PageProps) => {
  const portfolioId = params.portfolioId;

  if (!portfolioId) {
    return <div>Loading...</div>;
  }

  return (
    <main className='min-h-screen flex flex-col'>
      <SinglePortFolio portfolioId={portfolioId} />
    </main>
  )
}

export default Page;

export async function getServerSideProps(context: any) {
  const { portfolioId } = context.params;
  return {
    props: {
      params: { portfolioId }, // passing `params` to the component
    },
  };
}



//client version
// "use client"

// import React from 'react'
// import SinglePortFolio from '../singlePortFolio';
// import { useParams } from "next/navigation";

// const page: React.FC = () => {
//   const params = useParams();
//   const portfolioId = params?.portfolioId;

//   const portFolioIdString = typeof portfolioId === "string" ? portfolioId : "";

//   return (
//     <main>
//       <SinglePortFolio portfolioId={portFolioIdString} />
//     </main>
//   )
// }

// export default page;