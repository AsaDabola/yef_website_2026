import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Rich from "@/components/ui/Rich";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Raising Disciples | Youth Evangelical Fellowship",
};

export default async function RaisingDisciplesPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("what-is-evangelical");
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={header.image || "/images/get-involved/banner-raising-disciples.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-12">
          <Breadcrumb label={t("What is Evangelical?")} />

          <h1 className="mt-10 font-display font-extrabold text-4xl text-black leading-[1.15] tracking-[-0.96px] sm:text-5xl lg:text-[46px] lg:leading-[60px]">

{t(header.heading || "Raising Disciples")}
</h1>

          <div className="mt-10">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/disciples-library-group.png",
                  alt: t("A YEF Bible study group gathered in a campus library"),
                },
                {
                  src: "/images/get-involved/disciples-fellowship-collage.png",
                  alt: t("Students talking together at a YEF fellowship gathering"),
                },
                {
                  src: "/images/get-involved/disciples-fall-event.png",
                  alt: t("Students at the YEF fall fellowship event"),
                },
              ]}
            />
          </div>

          <h2 className="mx-auto mt-24 max-w-[933px] text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
            
{t("Why Do We Call Ourselves Evangelical?")}
</h2>

          <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
            <Rich
              text={t(
                "“Evangelical” derives from ‘evangel’: “**gospel**”. By definition an evangelical is someone **concerned for the Gospel.** This means more than just preaching the Gospel and reading the Word now and then. Of course, we do preach and teach, however it means much more than just that. It means that **the Gospel of Christ is central.**",
              )}
            />
          </p>

          <h3 className="mx-auto mt-16 max-w-[695px] text-center font-semibold text-[24px] text-black leading-[38px] tracking-[-0.8px] lg:text-[30.3px] lg:leading-[50px]">
            
{t("The Gospel is at the center of our thinking and living.")}
</h3>

          <div className="mx-auto mt-12 max-w-[849px] space-y-[30px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
            <p>
              <Rich
                text={t(
                  "Our highest commandment is to **love God, and to love our neighbor as we do ourselves.** Through **life obedience of the Word** and with the **power of prayer**, we believe that the individual, as well as this whole world, will change.",
                )}
              />
</p>
            <p>
              <Rich
                text={t(
                  "The importance of an **individual and personal relationship with God** that is not defined by any political, cultural or social association, nor automatically given by way of nominal membership of any specific denomination. We recognize ourselves by our high regard for **the Bible as the Word of God that guides our daily lives;** the conviction that **salvation is only received by faith through Jesus Christ who died on the cross and was resurrected to life;** that God is triune as Father, Son and Holy Spirit; and a few other core beliefs as found in our Statement of Faith.",
                )}
              />
</p>
            <p>
              <Rich
                text={t(
                  "Christianity is a historical religion in a way that no other religion is. Unless we have access to the facts we are cut off from our roots. And our access is by way of **“the Scriptures”**. They are the means God has given us to bring us the Gospel. So evangelicals have always thankfully received this good gift of God and have regarded it as of the utmost importance that **we have a Bible on which we can rely.** They point to the express teaching of our Lord Himself and to that of the apostles. And they point to **the necessity for the facts of the gospel to be reliably attested.**",
                )}
              />
            </p>
            <p>
              <Rich
                text={t(
                  "There are other things that evangelicals hold, though we will not give an exhaustive list of evangelical convictions. **They all stem from the evangel (the Good News)**. The whole system of the evangelical is **the outworking of the Gospel.**",
                )}
              />
            </p>
          </div>
        </section>

        <section className="mt-20 bg-[#eff5ff] py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <h2 className="mx-auto max-w-[939px] text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("Why Do We Need the Gospel?")}
</h2>

            <div className="mt-16 grid grid-cols-1 gap-[33px] lg:grid-cols-2">
              <div className="space-y-6 rounded-[16px] border border-[#dcdfe5] bg-white p-8 font-medium text-[15px] text-[#4b5565] leading-[24px] sm:p-12">
                <p>
                  
{t("We do not put our trust in human endeavors. Dictatorships of the left and dictatorships of the right alike end up in oppression. Democracies all too often end up in muddled and soulless bureaucracy. Every system has to work on the raw material of sinners. Because we are sinners, no matter how good the intent, there’s a firm limit on Mankind’s ability to do good.")}
</p>
                <p>
                  
{t("Therefore, we cannot work out our own salvation. Sin leaves its mark on life here and has consequences for the hereafter. But the great, wonderful truth is that “Christ died for our sins.” What was impossible for Mankind, God in Christ has perfectly accomplished. He has defeated sin now and for eternity. The evangel (Good News) is a message about a salvation with both temporal and eternal results.")}
</p>
                <p>
                  
{t("Salvation and atonement means for individuals, as well as this whole world. The significant thing is that Christ died for our sins. Whatever needed to be done He has done. Nothing can be added to that perfect divine work. For that reason we testify salvation by grace. It is a gift. Good deeds, liturgical observances or anything else cannot save or ultimately change us or this world.")}
</p>
              </div>

              <div className="rounded-[16px] border border-[#dcdfe5] bg-white p-8 sm:p-12">
                <h3 className="font-semibold text-[20px] text-black leading-[30px] lg:text-[22.7px]">
                  
{t("Confronted with the truth of the cross, we have two choices :")}
</h3>
                <ul className="mt-6 space-y-4 font-medium text-[15.1px] text-[#4b5565] leading-[24px]">
                  <li className="flex gap-3">
                    <Image
                      src="/images/icons/icon-arrow-right-blue.svg"
                      alt=""
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className="mt-[3px] shrink-0"
                    />
                    
{t("Respond and turn to Christ in faith and love")}
</li>
                  <li className="flex gap-3">
                    <Image
                      src="/images/icons/icon-arrow-right-blue.svg"
                      alt=""
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className="mt-[3px] shrink-0"
                    />
                    
{t("Or harden our hearts and turn away")}
</li>
                </ul>
                <p className="mt-8 font-medium text-[15.1px] text-[#4b5565] leading-[24px]">
                  
{t("To respond to Christ’s love in the former way is to become a different person. The whole set of the life is changed. This may happen in one sudden, blinding experience (as with Saul of Tarsus). Or it may happen gradually (as with Timothy). The time is immaterial. The turning and changing is everything. And it happens to all who come to Christ. In this way, this free gift of salvation can be accepted by all people.")}
</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
          <h2 className="mx-auto max-w-[933px] text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
            
{t("Interested in Learning More? Here’s How :")}
</h2>
          <div className="mt-12 flex justify-center">
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
