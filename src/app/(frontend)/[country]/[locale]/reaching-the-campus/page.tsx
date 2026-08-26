import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import TextPhotoBlock from "@/components/get-involved/TextPhotoBlock";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Reaching the Campus | Youth Evangelical Fellowship",
};

export default async function ReachingTheCampusPage() {
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-reaching-the-campus.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
          <Breadcrumb label={t("Why Campus Mission?")} />

          <h1 className="mt-10 text-center font-display font-extrabold text-4xl text-black leading-[1.15] tracking-[-0.96px] sm:text-5xl lg:text-[46px] lg:leading-[60px]">
            
{t("Reaching the Campus")}
</h1>

          <p className="mx-auto mt-8 max-w-[1109px] text-center font-medium text-[26px] text-[#0066cf] italic leading-[38px] tracking-[-0.8px] lg:text-[38px] lg:leading-[50px]">
            
{t("God Has Often Worked Through the Young")}
</p>

          <p className="mx-auto mt-8 max-w-[1109px] text-center font-semibold text-[26px] text-[#4b5565] leading-[38px] tracking-[-0.8px] lg:text-[38px] lg:leading-[50px]">
            
{t("Throughout Christian history, young people have played an important role in seasons of mission, renewal, and spiritual awakening. Again and again, God has called young men and women who were willing to dedicate the strength, passion, and years of their youth to His Kingdom.")}
</p>

          <div className="mt-20">
            <TextPhotoBlock
              card
              image="/images/get-involved/hudson-taylor-group.png"
              alt={t("A group of students gathered together")}
              body={
                <>
                  <span className="font-bold">{t("Hudson Taylor,")}</span>  {t("who would become one of the most influential missionaries to China and the founder of the China Inland Mission, was only 21 years old when he first sailed for China. His willingness to answer God’s call as a young man eventually contributed to a missionary movement that reached far beyond his own lifetime.")}
</>
              }
            />
          </div>

          <div className="mt-16">
            <TextPhotoBlock
              card
              imageSide="left"
              image="/images/get-involved/calvin-conversation.png"
              alt={t("A student smiling outside on campus")}
              body={
                <>
                  <span className="font-bold">{t("John Calvin")}</span>  {t("was also still a young man when he published the first edition of his influential")}{" "}
                  <em>{t("Institutes of the Christian Religion")}</em>  {t("at the age of 26. The work would continue to develop throughout his life and profoundly influence generations of Christian theology, ministry, and church leadership.")}
</>
              }
            />
          </div>

          <p className="mx-auto mt-24 max-w-[695px] text-center font-semibold text-[24px] text-[#4b5565] leading-[38px] tracking-[-0.8px] lg:text-[30.3px] lg:leading-[50px]">
            
{t("Many of those who first followed Jesus were also young people who left behind their ordinary lives to become His disciples. Jesus taught them, corrected them, walked with them, and eventually entrusted them with the responsibility of carrying the gospel into the world.")}
</p>

          <div className="mx-auto mt-16 max-w-[849px] space-y-[30px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
            <p>
              
{t("This pattern reminds us that youth is not simply a period of preparation for serving God someday. Young people can be used by God now.")}
</p>
            <p>
              
{t("When young believers encounter the gospel deeply, surrender their lives to Christ, and receive a vision for God’s Kingdom, their lives can influence campuses, churches, cities, and even nations.")}
</p>
            <p>
              
{t("This is one reason campus mission matters so deeply to YEF. Universities gather together a generation that still has much of its life ahead of it. If students can encounter Christ during these formative years and learn to dedicate their gifts, education, ambitions, and future to God, their influence for the gospel can continue for decades.")}
</p>
            <p>
              
{t("YEF therefore believes that reaching university students is also an investment in the future of world mission. We desire to see a new generation arise—not simply as attendees of Christian gatherings, but as disciples, evangelists, Bible teachers, leaders, and missionaries who are willing to say:")}
</p>
          </div>

          <p className="mx-auto mt-16 max-w-[695px] text-center font-semibold text-[24px] text-black leading-[38px] tracking-[-0.8px] lg:text-[30.3px] lg:leading-[50px]">
            
{t("“Here am I. Send me!”")}
<span className="block">{t("— Isaiah 6:8")}</span>
          </p>

          <div className="mt-16 flex justify-center">
            <Link
              href="/get-involved/apply"
              className="flex h-[158px] w-full max-w-[515px] items-center justify-center rounded-[16px] bg-[#0066cf] px-8 text-center font-semibold text-[24px] text-white leading-[28.8px] transition-transform duration-200 hover:scale-[1.02] lg:text-[28px]"
            >
              
{t("Apply Bible study")}
</Link>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
