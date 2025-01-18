"use client";

import expertiseModule from './expertise.module.css';
import Image from "next/image";
import GetAllExperience from './GetAllExperience';
import PortFolioDisplayAll from '../components/portfolioCarousel/PortFolioDisplayAll';
import GetAllTechStack from '../components/techStack/techStackDisplay';
import GetAllTools from '../components/tools/toolsDisplay';

const Expertise = () => {

    // Function to scroll to the target section
    const scrollToSection1 = () => {
      const section = document.getElementById('programmingLanguagesSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    };

    const scrollToSection2 = () => {
      const section = document.getElementById('SoftwareSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    };

  return (
    <main>
      <div className={expertiseModule.expertiseBanner}>
        {/* <h1> This page is for Expertise </h1> */}
      </div>
      <div className='flex lg:flex-row flex-col justify-center my-10'>       
        <div className={expertiseModule.profileMargin1}>
          <div className={`flex items-center gap-2`}>
              <Image
                src="/profile.svg"
                alt="Profile Icon"
                width={85} 
                height={85}
              />
              <p className={expertiseModule.header1}>Profile</p>
          </div>
          <p><strong>Name:</strong> Alier E. Torrenueva</p>
          <p><strong>Birth Date:</strong> October 9, 1996</p>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>Nationality:</strong> Cebuano, Filipino</p>
          <p><strong>Education:</strong> Asian College of Technology</p>
        </div>
        
        <div className={expertiseModule.xpMargin2}>
        <div className='flex items-center gap-5 mb-4'>
            <Image
              src="/experience.svg"
              alt="Profile Icon"
              width={65} 
              height={65}
            />
            <p className={expertiseModule.header1}>Experience</p>
        </div>
        <GetAllExperience />        
        </div>
      </div>

      <div className={expertiseModule.expertiseBackground}>
        <PortFolioDisplayAll />
      </div>

      <div id='programmingLanguagesSection'>
          <div className={expertiseModule.headerTechStackSection}>
            <button onClick={scrollToSection1} className={`${expertiseModule.sectionHolder}`}>Programming Languages</button>
            <p className={`pt-1 ${expertiseModule.header3}`} >Technology Stacks</p>
            <p className={`pt-1 ${expertiseModule.subHeader}`}>Technology stacks I have used in my projects and frameworks that drive my development process.</p>
          </div>
          <div><GetAllTechStack /></div>
      </div>

      <div className='px-10 pt-5 pb-7 bg-gray-100' id='SoftwareSection'>
          <div className={expertiseModule.headerTechStackSection}>
            <button onClick={scrollToSection2} className={`mt-5 ${expertiseModule.sectionHolder}`}>Software</button>
            <p className={`pt-1 ${expertiseModule.header3}`} >Tools</p>
            <p className={`pt-1 ${expertiseModule.subHeader}`}>These are the tools that power my personal creations and client-focused projects, bringing ideas to life with efficiency and precision.</p>          
          </div>
          <div><GetAllTools /></div>
      </div>
      
    </main>
  )
}

export default Expertise