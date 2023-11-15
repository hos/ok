import type { NextPage } from "next";
import Image from "next/image";

import TheOriginOfTheWorld from "@/public/images/large/The-Origin-of-the-World.jpg";

const Home: NextPage = () => {
  const t = (str: string) => str;

  return (
    <div className="w-full mx-auto flex flex-col justify-start">
      <div className="w-[80%] mx-auto flex flex-row items-center max-md:w-full">
        <div className="w-full h-auto text-center">
          <Image
            priority
            src={TheOriginOfTheWorld}
            alt={t("images:The-Origin-of-the-World.jpg")}
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
