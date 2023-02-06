import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className="relative h-screen w-screen flex flex-col bg-landing-background overflow-hidden">
            <div className="absolute top-4 left-10">
              <div className="text-3xl  font-extrabold text-fabchat-hoverBackground cursor-pointer font-itim">Fabchat</div>
            </div>
            <div className="space-y-4">
                <h1 className="text-center text-[4rem] font-SourceSansPro font-extrabold mt-[10%] text-white bg-blue-300 bg-opacity-10">
                    IMAGINE A PLACE...
                </h1>
                <div className="w-[60%] text-center text-xl  mx-auto font-sans font-bold bg-blue-100 bg-opacity-20 rounded-xl">
                    ...where you can be a part of a global art community, a
                    gaming community, or a school club. where you can spend time
                    with only a small group of buddies. a location that makes it
                    simple to socialise more frequently and converse every day.
                </div>
            </div>
            <div className="w-full flex justify-center mt-10">
                <button className="mx-auto px-12 py-4 bg-blue-500 rounded-full font-itim font-bold text-3xl bg-[url('https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31370/blue-bokeh-background.jpg')] bg-no-repeat bg-cover">
                    <Link
                        href={"/app"}
                        
                    >
                        Open In Browser
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
