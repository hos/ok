import type { NextPage } from "next";
import Image from "next/image";

const pageFileName = "champion";

const Home: NextPage = () => {
  const t = (str: string) => str;

  return (
    <div className="w-full mx-auto flex flex-col justify-start">
      <div className="w-[80%] mx-auto flex flex-row items-center max-md:w-full">
        <div className="w-full h-auto text-center">
          <Image
            priority
            src={`/images/large/champion.jpg`}
            alt={t(`images.${pageFileName}`)}
            className="max-w-full h-auto object-contain"
            data-filename={pageFileName}
            width={600}
            height={600}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
