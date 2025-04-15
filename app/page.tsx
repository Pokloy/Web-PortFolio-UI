import homeModule from './home.module.css';
import PortCarousel from './components/portfolioCarousel/PortFolioCar';
import Link from 'next/link'

export default function Home() {
  return (
    <main>
        <div className={homeModule.backgroundImg}>
          <div className={`${homeModule.landingholder1}`}>
            <h1 className={homeModule.headerHome}>About Alier</h1>
            <hr className={homeModule.headerhr}/>
            <p className={`pt-6 ${homeModule.mobileP}`}>I specialize in crafting user-friendly, functional websites designed to meet your unique needs, whether static or dynamic. From stock inventory systems and enrollment platforms to employee management systems, I deliver tailored solutions that address your challenges.</p>
          </div>
        </div>

        <div className={homeModule.specializedSection}>
          <div className={homeModule.UiUxSection}>
            <div className={homeModule.UiUximg}></div>
            <div className={homeModule.UiUxP}>
              <h2 className={homeModule.specializedHeader}>UI/UX Designer</h2>
              <p className='text-justify'>I create visually stunning and user-friendly designs that captivate audiences and elevate your brand experience. Let me transform your ideas into seamless digital journeys that leave a lasting impression.</p>
            </div>
          </div>

          <div className={homeModule.FullStackSection}>
            <div className={homeModule.FullStackimg}></div>
            <div className={homeModule.FullStackP}>
              <h2 className={homeModule.specializedHeader}>Full Stack Developer</h2>
              <p className='text-justify'>As a Full Stack Developer, I build robust, scalable, and user-focused web applications tailored to meet your unique needs. From intuitive front-end designs to efficient back-end solutions, I ensure a seamless digital experience that drives results.</p>
            </div>
          </div>
        </div>

        <div className={homeModule.portfolioBackground}>
          <PortCarousel />
        </div>

    <div className={`${homeModule.morePortfolioSection} flex justify-center relative flex-wrap content-center h-64`}>
      <Link href="/expertise" className={homeModule.morePortfolioButton}>MORE ON PORTFOLIO</Link>
    </div>

    <div className={`${homeModule.sayingSection} flex items-center justify-center relative rounded-lg`}>
      <div className={`${homeModule.placeholder2} shadow-lg rounded-xl backdrop-blur-md bg-black/60 border border-white/10`}>
        <div className="flex items-start gap-2">
          <span className="text-4xl text-orange-300 leading-none">“</span>
          <p className="text-lg md:text-xl font-light italic text-[#C3A995]">
            An Idiot Admires Complexity. A genius Admires Simplicity.
          </p>
        </div>
        <p className="mt-4 text-sm text-right text-[#C3A995]">-- YouTuber: FireShip --</p>
      </div>
    </div>


    </main>
  )
}
