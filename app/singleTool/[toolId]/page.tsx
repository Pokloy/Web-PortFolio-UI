// server version
// mobile Responsive
// import React from 'react'
// import SingleTool from '../singleTool';
// import ToolsCreated from '../toolsCreated';
// import SingleToolModule from '../singleTool.module.css';

// interface Params{
//   toolId: string;
// }

// const Page = ({ params }: { params: Params }) => {
//   const toolId = params.toolId;

//   if(!toolId){
//     return <div>Loading.. .</div>;
//   }

//   return (
//     <main className={`lg:p-10 ${SingleToolModule.containerSettings}`}>
//         <div className='lg:w-3/4'>
//           <SingleTool toolId={toolId}/>
//         </div>

//         <div className='lg:w-1/2 lg:ml-16'>
//           <div className={SingleToolModule.singleToolContainer2}>
//             <p className='font-bold pb-5 sm:py-2'>Other Tools</p>
//           </div>
//           <div className={`${SingleToolModule.customHr} mb-8`}></div>
//           <ToolsCreated />
//         </div>
//     </main>
//   )
// }

// export default Page

//client version
"use client"
import React from 'react'
import SingleTool from '../singleTool';
import ToolsCreated from '../toolsCreated';
import SingleToolModule from '../singleTool.module.css';
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const params = useParams();
  const toolsId = params?.toolId;

  const toolsIdString =  typeof toolsId === "string" ? toolsId : "";

  return (
        <main className='lg:p-10 flex'>
        <div className='w-3/4'>
          <SingleTool toolId={toolsIdString}/>
        </div>

        <div className='w-1/2 ml-16'>
          <div>
            <p className='font-bold pb-5'>Other Tools</p>
          </div>
          <div className={`${SingleToolModule.customHr} mb-2`}></div>
          <ToolsCreated />
        </div>
    </main>
  )
}

export default Page;
