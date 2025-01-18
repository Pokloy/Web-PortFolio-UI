// server version
// import React from 'react';
// import SingleTechStack from '../singleTechStack';
// import TechStackModule from '../singleTechStack.module.css';
// import WorkCreated from '../workCreated';

// // Define the type for the params
// interface Params {
//   techStackId: string;
// }

// const SingleTechStackPage = ({ params }: { params: Params }) => {
//   // Access the techStackId dynamically
//   const techStackId = params.techStackId;

//   if (!techStackId) {
//     return <div>Loading...</div>; // Handle case where techStackId is not available
//   }

//   return (
//     <main className={`lg:p-10 ${TechStackModule.containerSettings}`}>
//       <div className='lg:w-3/4'>
//         {/* Pass the techStackId down to the client component */}
//         <SingleTechStack techStackId={techStackId} />
//       </div>

//       <div className='lg:w-1/2'>
//         <div>
//           <p className='font-bold pb-5'>Projects Created</p>
//         </div>
//         <div className={`${TechStackModule.customHr} mb-2`}></div>
//         <div>
//           <WorkCreated />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default SingleTechStackPage;


//client version
"use client"

import React from 'react'
import SingleTechStack from '../singleTechStack';
import TechStackModule from '../singleTechStack.module.css';
import WorkCreated from '../workCreated';
import { useParams } from "next/navigation";  // Use useParams for App Router

const Page: React.FC = () => {
  const params = useParams();  // Get the params object
  const techStackId = params?.techStackId;  // Extract techStackId from params

  // Ensure techStackId is a string (handle undefined cases)
  const techStackIdString = typeof techStackId === "string" ? techStackId : "";

  return (
    <main className='lg:p-10 flex'>
      <div className='w-3/4'>
        {/* Pass the string value of techStackId to the component */}
        <SingleTechStack techStackId={techStackIdString} />
      </div>
      
      <div className='w-1/2'>
        <div>
          <p className='font-bold pb-5'>Projects Created</p>
        </div>
        <div className={TechStackModule.customHr}></div>
        <div>
          <WorkCreated />
        </div>
      </div>
    </main>
  )
}

export default Page;
