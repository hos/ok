import type { NextPage } from "next";
import Image from "next/image";

import MainImage from "@/public/images/large/Walls-2.jpg";
const pageFileName = "Walls-2";

const Home: NextPage = () => {
  const t = (str: string) => str;

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="w-[80%] h-full mx-auto flex flex-row items-center max-md:w-full">
        <div className="w-full h-auto text-center">
          <Image
            priority
            src={MainImage}
            alt={t(`images.${pageFileName}`)}
            className="max-w-full max-h-[600px] h-auto object-contain"
            data-filename={pageFileName}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
