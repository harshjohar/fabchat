import type { NextPage } from "next";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const Home: NextPage = () => {
  return (
    <div className=" h-screen w-screen flex flex-col bg-landing-background overflow-hidden justify-center sm:justify-start">
      <div className="fixed top-4 left-8">
        <div
          className="text-2xl sm:text-3xl font-sans font-extrabold 
              text-fabchat-white cursor-pointer"
        >
          Fabchat
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
