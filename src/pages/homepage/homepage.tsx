import { MainBanner } from "../../components/main banner/main-banner.tsx";
import { AboutUs } from "../../components/about us/about-us.tsx";
import { ForWhomBlock } from "../../components/for whom block/for-whom-block.tsx";
import { Partners } from "../../components/partners/partners.tsx";
import { PartnersNewsList } from "../../components/partners-news/partners-news-list.tsx";

export const HomePage = () => {
  return (
    <>
      <MainBanner />
      <AboutUs />
      <ForWhomBlock />
      <Partners />
      <PartnersNewsList />
    </>
  );
};
