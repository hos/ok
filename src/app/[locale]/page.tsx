import type { NextPage } from "next";
import Image from "next/image";

import MainImage from "@/public/images/large/icons-of-the-future-exhibition-book-11.jpg";
const pageFileName = "Walls-2";

const Home: NextPage = () => {
  const t = (str: string) => str;

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="w-[80%] py-2 px-2 h-full mx-auto flex flex-row items-center max-md:w-full">
        <div className="w-full h-full text-center">
          <Image
            priority
            src={MainImage}
            alt={t(`images.${pageFileName}`)}
            className="max-w-full max-h-[600px] h-full object-contain"
            style={{ objectFit: "contain" }}
            data-filename={pageFileName}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
