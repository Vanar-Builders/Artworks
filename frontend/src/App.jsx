import { useState } from "react";
import Header from "./components/Header"

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className='relative'>
        <div className="flex flex-col justify-center items-start text-base font-medium leading-6 text-right text-white capitalize md:pr-5 bg-[#755DFF]">
          <div className="overflow-hidden relative flex-col justify-center items-center py-1.5 md:pr-16 md:pl-32 w-full min-h-[35px] w-[1469px] px-2 md:px-5 md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/64d72652bf2b66b0b4892d33ad88b1edb4d5bbd6d3e51d9d4097137d95f69b18?apiKey=cf358c329e0d49a792d02d32277323ef&"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="text-sm text-center hidden md:block">Join the Revolution: Artwork is Now Accepting Practices for Our Exclusive Waitlist</div>
            <div className="text-center text-sm block md:hidden" style={{ fontSize: "13px" }}>We Are Now Accepting Practices For Our Exclusinve Waitlist</div>
          </div>
        </div>
        <Header show={show} setShow={setShow} />
        {
          !show &&
          <>
            {/* <HeroSection />
            <Experience /> */}
            <img className='hidden md:block absolute top-0 left-0 opacity-20' style={{ zIndex: 1 }} src={'assets/left.png'} alt="" />
            <img className='hidden md:block absolute top-0 right-0 opacity-20' style={{ zIndex: 1 }} src={'assets/right.png'} alt="" />
          </>
        }
      </div>
      {/* {!show &&
        <>
          <Services />
          <Pricing />
          <KippProcess />
          <Questions />
          <Testimonials />
          <Footer />
        </>
      } */}
    </div>
  );
}

export default App
