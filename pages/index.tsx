import type { NextPage } from "next";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const Home: NextPage = () => {
<<<<<<< HEAD
    return (
        <div className="relative h-screen w-screen flex flex-col bg-landing-background overflow-hidden">
            <div className="absolute top-4 left-10">
              <div className="text-3xl font-itim font-extrabold text-fabchat-hoverBackground cursor-pointer">Fabchat</div>
            </div>
            <div className="space-y-4">
                <h1 className="text-center text-[4rem] font-SourceSansPro font-extrabold mt-[10%] text-white bg-blue-300 bg-opacity-10">
                    IMAGINE A PLACE...
                </h1>
                <div className="w-[60%] text-center text-xl font-sans mx-auto font-bold bg-blue-100 bg-opacity-20 rounded-xl">
                    ...where you can be a part of a global art community, a
                    gaming community, or a school club. where you can spend time
                    with only a small group of buddies. a location that makes it
                    simple to socialise more frequently and converse every day.
                </div>
            </div>
            <div className="w-full flex justify-center mt-10">
                <button className="mx-auto px-12 py-4 bg-blue-500 rounded-full font-itim
                 font-bold text-3xl bg-[url('https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31370/blue-bokeh-background.jpg')] bg-no-repeat bg-cover">
                    <Link
                        href={"/app"}
                        
                    >
                        Open In Browser
                    </Link>
                </button>
            </div>
=======
  return (
    <div className=" h-screen w-screen flex flex-col bg-landing-background overflow-hidden justify-center sm:justify-start">
      <div className="fixed top-4 left-8">
        <div
          className="text-2xl sm:text-3xl font-sans font-extrabold 
              text-fabchat-white cursor-pointer"
        >
          Fabchat
>>>>>>> fb26bd65819356ba587c1d67e105e6ca636301b6
        </div>
      </div>
      <div className="space-y-4">
        <h1
          className="text-center text-[2.5rem]
        sm:text-[4rem] font-Londrina tracking-wider mt-[10%] text-white bg-opacity-10"
        >
          IMAGINE A PLACE...
        </h1>

        <div className="w-[60%] text-2xl font-Londrina mx-auto tracking-widest text-[#cfc5df] sm:text-[#f9b145] bg-opacity-20 rounded-xl h-[10rem] sm:text-4xl sm:h-30 ">
          <Typewriter
            cursor={true}
            loop={true}
            delaySpeed={40}
            words={[
              "Where You Can be a part of a global art community, a gaming community, or a school club.",
              "Where You Can spend time with only a small group of buddies.",
              "Where You Can socialise more frequently and converse every day.",
            ]}
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <button
          className="mx-auto px-12 py-4
           bg-yellow-500
         rounded-full font-Londrina tracking-wider text-xl sm:text-3xl"
        >
          <Link href={"/app"}>Open In Browser</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
