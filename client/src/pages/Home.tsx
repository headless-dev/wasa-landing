import { useEffect, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowRight, Check, Menu, MoveRight, Send, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrandMark } from "@/components/BrandMark";
import { BrandInquiryForm } from "@/components/BrandInquiryForm";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { WASA_IMAGE_PREVIEWS } from "@/lib/wasaImagePreviews";
import { getActiveNavigationSection } from "@/lib/scrollSpy";
import { WASA_ASSETS as ASSETS, WASA_GALLERY_ITEMS } from "@/lib/wasaAssets";

const navItems = [["소개", "#story"], ["운영 방식", "#journey"], ["현장", "#gallery"], ["입점 안내", "#inquiry"]] as const;

const journey = [
  ["01", "좋은 브랜드가 WASA에 모입니다", "각자의 제품과 이야기를 가진 로컬 브랜드가 WASA로 들어옵니다.", ASSETS.how01Inbound],
  ["02", "WASA가 큐레이션합니다", "각 브랜드가 더 잘 발견될 수 있도록 제품과 체험 동선을 하나의 공간으로 구성합니다.", ASSETS.step02Curation],
  ["03", "고객이 직접 경험합니다", "고객은 보고, 맛보고, 만지고, 직접 사용하며 제품의 가치를 이해합니다.", ASSETS.step03Experience],
  ["04", "고객과 연결됩니다", "현장에서 생긴 관심을 회원·카카오 채널로 연결해, 행사 이후에도 다시 만날 수 있는 접점을 만듭니다.", ASSETS.step04Connection],
  ["05", "행사 뒤에도 다시 만납니다", "현장에서 만난 브랜드를 행사 이후 온라인에서도 다시 찾고 구매할 수 있도록 이어갑니다.", ASSETS.step05Return],
] as const;

const brandStories = [
  ["01 / TOGETHER", "혼자 준비할 부담을 줄이고", "여러 브랜드가 하나의 WASA 공간에 모입니다. 상품 구색은 풍부해지고, 혼자 감당하던 현장 운영의 부담은 줄어듭니다.", ASSETS.aisle],
  ["02 / EXPERIENCE", "고객이 직접 경험하게 하고", "온라인 설명만으로 전하기 어려운 제품의 매력을, 고객이 현장에서 직접 확인하게 합니다.", ASSETS.what02Experience],
  ["03 / CONNECT", "행사가 끝난 뒤 다시 연결합니다", "현장에서 시작된 관심을 행사 이후 다시 찾고 구매하는 흐름으로 이어갑니다.", ASSETS.what03FollowUp],
] as const;

const productEdit = [
  [ASSETS.curation, "WASA가 큐레이션한 로컬 식품 브랜드 제품", "하나의 테이블에서 시작되는 발견", "서로 다른 브랜드가 함께 놓일 때 고객은 새로운 선택지를 발견합니다."],
  [ASSETS.products, "WASA 현장에 진열된 로컬 브랜드 제품", "제품이 가장 잘 보이는 자리", "카테고리와 이야기가 자연스럽게 이어지는 방식으로 제품을 큐레이션합니다."],
  [ASSETS.curated03Story, "제품과 브랜드 스토리 카드, 소재를 함께 보여주는 WASA 큐레이션", "제품 너머의 이야기도 함께 보여줍니다", "제품의 특징과 브랜드의 이야기가 하나의 경험으로 이어지도록 구성합니다."],
] as const;

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-kicker ${light ? "text-[#dcbcff]" : ""}`}>{children}</div>;
}

function BrandInquiryFaq() {
  const items = [
    ["어떤 브랜드가 WASA에 입점할 수 있나요?", "식품, 음료, 뷰티, 리빙, 반려동물, 키즈, 웰니스, 지역 특산품 등 고객에게 직접 보여주고 싶은 소비재 브랜드를 기다립니다."],
    ["입점 문의 후 어떤 과정으로 진행되나요?", "브랜드와 제품 소개를 확인한 뒤, 참여 가능성과 브랜드에 맞는 행사·참여 방식을 안내드립니다."],
    ["입점비나 수수료는 어떻게 되나요?", "행사와 참여 방식에 따라 조건이 달라질 수 있어, 브랜드와 제품을 확인한 뒤 자세히 안내드립니다."],
    ["아직 참여를 결정하지 않았는데 문의해도 되나요?", "네. 참여 여부가 정해지지 않아도 괜찮습니다. 브랜드와 제품부터 편하게 소개해 주세요."],
  ] as const;

  return (
    <section aria-labelledby="brand-faq-title" className="bg-[#f0e6fb] pb-[clamp(64px,6vw,96px)]">
      <div className="text-shell border-t border-[#cbbbe0] pt-8 md:pt-10">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pt-1">
            <p className="text-[11px] font-bold tracking-[.15em] text-[#8153b3]">FAQ</p>
            <h2 id="brand-faq-title" className="display-copy mt-3 text-[28px] font-extrabold leading-[1.12] text-[#2b1847] md:text-[34px]">입점 전, 자주 묻는 질문</h2>
            <p className="body-copy mt-4 max-w-[250px] text-[14px] leading-6 text-[#6e6178]">참여 여부를 정하기 전, 기본적인 내용을 먼저 확인해 보세요.</p>
          </div>
          <Accordion type="single" collapsible className="border-b border-[#d8cee3] lg:col-span-7 lg:col-start-6">
            {items.map(([question, answer], index) => (
              <AccordionItem value={`faq-${index}`} key={question} className="border-[#d8cee3]">
                <AccordionTrigger className="py-5 text-left text-[15px] font-bold leading-6 text-[#39294b] hover:no-underline md:py-6">{question}</AccordionTrigger>
                <AccordionContent className="max-w-[620px] pb-6 text-[14px] leading-7 text-[#6e6178]">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [navClosing, setNavClosing] = useState(false);
  const [ctaCompact, setCtaCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("story");
  const [submitted, setSubmitted] = useState(false);
  const [submittedBrandName, setSubmittedBrandName] = useState("");
  const previewSuccess = import.meta.env.DEV && new URLSearchParams(window.location.search).has("preview-success");
  const showSuccess = submitted || previewSuccess;
  const realLifeItems = WASA_GALLERY_ITEMS;
  const navRendered = navOpen || navClosing;
  const openNav = () => {
    setNavClosing(false);
    setNavOpen(true);
  };
  const closeNav = () => {
    if (!navRendered) return;
    setNavOpen(false);
    setNavClosing(true);
    window.setTimeout(() => setNavClosing(false), 280);
  };
  const closeMenuAndScroll = (selector: string) => {
    const menuWasOpen = navRendered;
    closeNav();
    const moveToTarget = () => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      moveToTarget();
      window.setTimeout(moveToTarget, 420);
    }, menuWasOpen ? 500 : 0);
  };
  const scrollToInquiry = () => closeMenuAndScroll("#inquiry");
  const scrollToSection = (selector: string) => {
    setActiveSection(selector.slice(1));
    closeMenuAndScroll(selector);
  };

  useEffect(() => {
    if (!navRendered) return;

    const scrollY = window.scrollY;
    const previousStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      Object.assign(document.body.style, previousStyles);
      const restoreScroll = () => window.scrollTo(0, scrollY);
      window.requestAnimationFrame(() => {
        restoreScroll();
        window.requestAnimationFrame(() => {
          restoreScroll();
          window.setTimeout(restoreScroll, 180);
        });
      });
    };
  }, [navRendered]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const updateCta = () => {
      const currentScrollY = window.scrollY;
      setCtaCompact(currentScrollY > 140 && currentScrollY > previousScrollY);
      previousScrollY = currentScrollY;
    };
    window.addEventListener("scroll", updateCta, { passive: true });
    return () => window.removeEventListener("scroll", updateCta);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.querySelector(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const updateActiveSection = () => {
      const marker = 76 + window.innerHeight * 0.27;
      const activeId = getActiveNavigationSection(
        sections.map(section => ({ id: section.id, top: section.getBoundingClientRect().top })),
        marker,
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight),
        Math.max(240, window.innerHeight * 0.35),
      );
      if (activeId) setActiveSection(activeId);
    };
    const observer = new IntersectionObserver(() => updateActiveSection(), { rootMargin: "-76px 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a[href]").forEach(anchor => {
      anchor.dataset.active = String(anchor.getAttribute("href") === `#${activeSection}`);
    });
  }, [activeSection, navRendered]);

  return (
    <div className="bg-white text-[#1d142e]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e9e4ed] bg-white/95 backdrop-blur-md">
        <div className="wide-shell flex h-[74px] items-center justify-between md:h-[76px]">
          <a href="#top" aria-label="WASA 첫 화면으로"><BrandMark className="w-[146px] md:w-[184px]" /></a>
          <nav className="hidden items-center gap-9 lg:flex">{navItems.map(([name, href]) => <a onClick={event => { event.preventDefault(); scrollToSection(href); }} className="text-[16px] font-semibold text-[#392a4b] transition hover:text-[#7543ac]" href={href} key={href}>{name}</a>)}</nav>
          <button onClick={scrollToInquiry} className="hidden rounded-full bg-[#281348] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#7140aa] active:scale-[.97] lg:block">입점 문의</button>
          <button aria-label={navRendered ? "메뉴 닫기" : "메뉴 열기"} aria-controls="mobile-navigation" aria-expanded={navRendered} onClick={() => navRendered ? closeNav() : openNav()} className="grid size-11 place-items-center rounded-full border border-[#eee6f5] bg-[#f8f4fb] text-[#2d194e] shadow-[0_4px_14px_rgba(66,32,102,.08)] transition hover:bg-[#eee4f6] active:scale-[.95] lg:hidden">{navRendered ? <X size={21} /> : <Menu size={22} />}</button>
        </div>
      </header>
      {navRendered && <div id="mobile-navigation" role="dialog" aria-label="모바일 메뉴" className={`mobile-menu-overlay fixed inset-x-0 bottom-0 top-[74px] z-[45] overflow-y-auto border-t border-[#e7dff0] bg-[#fcfaff] px-5 pb-8 pt-9 lg:hidden ${navClosing ? "mobile-menu-overlay--exit" : ""}`}><div className="wide-shell flex min-h-full flex-col"><p className={`mobile-menu-reveal text-[10px] font-bold tracking-[.17em] text-[#8556b6] ${navClosing ? "mobile-menu-reveal--exit" : ""}`}>WASA NAVIGATION</p><nav className="mt-6 grid border-y border-[#e5ddea]">{navItems.map(([name, href], index) => <a onClick={event => { event.preventDefault(); scrollToSection(href); }} key={href} href={href} style={{ animationDelay: navClosing ? "0ms" : `${100 + index * 55}ms` }} className={`mobile-menu-reveal flex min-h-[64px] items-center justify-between border-b border-[#eee8f2] text-[19px] font-extrabold text-[#2b1847] last:border-b-0 ${navClosing ? "mobile-menu-reveal--exit" : ""}`}><span><span className="mr-3 text-[11px] tracking-[.12em] text-[#946cbb]">0{index + 1}</span>{name}</span><ArrowRight size={18} className="text-[#8653b6]" /></a>)}</nav><div className={`mobile-menu-reveal mt-auto pt-8 ${navClosing ? "mobile-menu-reveal--exit" : ""}`} style={{ animationDelay: navClosing ? "0ms" : "340ms" }}><button onClick={scrollToInquiry} className="flex min-h-[58px] w-full items-center justify-between rounded-2xl bg-[#2b164c] px-6 text-[16px] font-bold text-white shadow-[0_12px_30px_rgba(43,22,76,.2)]">WASA 입점 문의하기 <ArrowDownRight size={20} /></button><p className="mt-4 text-center text-[12px] leading-5 text-[#766682]">좋은 브랜드가 더 많은 고객을 만나는 곳.</p></div></div></div>}
      <div aria-hidden="true" className="h-[74px] md:h-[76px]" />

      <main id="top">
        <section className="relative isolate min-h-[680px] overflow-hidden md:min-h-[820px]">
          <div className="hero-visual absolute inset-y-0 right-0 w-full md:w-[64%]"><ProgressiveImage src={ASSETS.heroBanner} previewSrc={WASA_IMAGE_PREVIEWS[ASSETS.heroBanner]} alt="활기찬 WASA 공동 부스와 로컬 브랜드 현장" loading="eager" fetchPriority="high" decoding="async" className="size-full object-cover transition duration-1000 hover:scale-[1.015]" /><div className="hero-photo-shade absolute inset-0" /></div>
          <div className="wide-shell relative flex min-h-[680px] items-end pb-16 pt-16 md:min-h-[820px] md:items-center md:pb-0 md:pt-0"><div className="hero-copy-enter hero-copy-mobile max-w-[850px]"><Kicker>LOCAL BRANDS, TOGETHER</Kicker><h1 className="display-copy mt-7 text-[clamp(40px,11vw,54px)] font-black leading-[1.01] md:mt-8 md:text-[clamp(56px,5.8vw,88px)]"><span className="block md:hidden">혼자 준비하던<br />박람회가 아닌,</span><span className="block md:hidden">함께 고객을 만나는<br /><span className="text-[#7540af]">WASA.</span></span><span className="hidden md:block md:whitespace-nowrap">혼자 준비하는 박람회가 아닌,</span><span className="hidden md:block">함께 고객을 만나는</span><span className="hidden md:block text-[#7540af]">새로운 판로.</span></h1><p className="body-copy mt-7 max-w-[470px] text-[16px] font-semibold leading-7 text-[#403449] md:text-[18px] md:leading-8"><span className="md:hidden">좋은 브랜드가 현장에서 고객을 만나고,<br />행사 뒤에도 다시 연결되는 공동 판로입니다.</span><span className="hidden md:inline">WASA는 좋은 로컬 브랜드를 한곳에 모아, 현장에서의 발견과 체험을 행사 이후 다시 찾고 구매하는 흐름까지 연결하는 공동 판로입니다.</span></p><div className="mt-9 flex flex-wrap gap-3"><button onClick={scrollToInquiry} className="inline-flex items-center gap-3 rounded-full bg-[#281348] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(40,19,72,.2)] transition hover:bg-[#7140aa] active:scale-[.97]">WASA 입점 문의하기 <ArrowDownRight size={17} /></button><a onClick={event => { event.preventDefault(); scrollToSection("#story"); }} href="#story" className="hero-secondary-cta inline-flex items-center gap-2 rounded-full border border-[#c3b5cf] bg-white/90 px-6 py-4 text-sm font-bold text-[#332143] shadow-[0_6px_18px_rgba(37,19,61,.08)] backdrop-blur transition hover:bg-white">WASA 알아보기 <MoveRight size={17} /></a></div></div></div>
          <a href="#story" aria-label="WASA 소개로 스크롤" className="hero-scroll-prompt absolute bottom-7 left-1/2 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-[#d7c9e2] bg-white/85 text-[#5d328c] shadow-[0_5px_18px_rgba(55,27,88,.15)] backdrop-blur-sm transition hover:bg-white md:bottom-9 md:border-white/70 md:bg-white/10 md:text-white md:shadow-none md:hover:bg-white md:hover:text-[#301658]"><ArrowDown size={18} /></a>
        </section>

        <section id="story" className="text-shell editorial-space grid items-center gap-12 lg:grid-cols-12 lg:gap-9"><div className="lg:col-span-4"><Kicker>WHY WASA</Kicker><h2 className="display-copy mt-7 text-[38px] font-extrabold leading-[1.12] md:text-[clamp(48px,4.2vw,62px)]">제품은 준비됐는데,<br />고객을 어디서<br /><span className="text-[#7540af]">만나고 계신가요?</span></h2><p className="body-copy mt-7 max-w-[390px] text-[16px] leading-7 text-[#62566e] md:text-[17px] md:leading-8">좋은 제품을 만든 브랜드에게 필요한 것은 더 많은 준비보다 고객을 직접 만나는 기회일 수 있습니다. WASA는 혼자 감당하던 현장 운영의 부담을 줄이고, 브랜드가 고객과 더 잘 만날 수 있는 현장을 만듭니다.</p></div><figure className="photo-zoom lg:col-span-8 lg:ml-7"><ProgressiveImage loading="lazy" decoding="async" src={ASSETS.brandOwnerContext} previewSrc={WASA_IMAGE_PREVIEWS[ASSETS.brandOwnerContext]} alt="고객을 어디서 만날지 고민하는 로컬 브랜드 대표" className="aspect-[1.58] w-full object-cover" /></figure></section>

        <section id="journey" className="border-y border-[#ebe5ef] bg-[#faf9fb] py-[clamp(80px,9vw,135px)]"><div className="text-shell"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><Kicker>HOW WASA WORKS</Kicker><h2 className="display-copy mt-7 text-[38px] font-extrabold leading-[1.1] md:text-[clamp(50px,4.4vw,64px)]">현장에서 만나고,<br /><span className="text-[#7540af]">행사 뒤에도 다시 만납니다.</span></h2></div><p className="body-copy max-w-[350px] text-[16px] leading-7 text-[#62566e] lg:col-span-4 lg:justify-self-end">행사 한 번을 운영하는 데서 멈추지 않습니다. 제품과 고객이 만나는 순간을 다음 접점과 재구매까지 이어갑니다.</p></div>
          <div className="mt-[clamp(40px,5vw,68px)] space-y-[clamp(38px,5.2vw,84px)]">{journey.map(([number, title, body, image], index) => <article className="grid items-center gap-6 md:grid-cols-12 md:gap-8" key={number}><figure className={`photo-zoom order-2 md:order-1 md:col-span-8 ${index % 2 ? "md:order-2 md:col-start-5" : ""}`}><ProgressiveImage loading="lazy" decoding="async" src={image} previewSrc={WASA_IMAGE_PREVIEWS[image]} alt={title} className="aspect-[1.22] w-full object-cover" /></figure><div className={`order-1 md:col-span-4 ${index % 2 ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-9"}`}><p className="text-[12px] font-bold tracking-[.12em] text-[#885abb]">{number}</p><h3 className="display-copy mt-4 text-[31px] font-extrabold leading-[1.14] md:text-[clamp(36px,3.3vw,50px)]">{title}</h3><p className="body-copy mt-5 text-[16px] leading-7 text-[#675b73]">{body}</p></div></article>)}</div>
        </div></section>

        <section className="text-shell editorial-space"><div className="grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><Kicker>WHAT BRANDS GET</Kicker><h2 className="display-copy mt-7 text-[38px] font-extrabold leading-[1.1] md:text-[clamp(50px,4.4vw,64px)]">좋은 브랜드가<br />더 많은 고객에게 발견되는<br /><span className="text-[#7540af]">장면을 만듭니다.</span></h2></div><p className="body-copy max-w-[470px] text-[16px] leading-7 text-[#62566e] lg:col-span-5 lg:justify-self-end md:text-[17px] md:leading-8">현장에 제품을 진열하는 것만으로는 충분하지 않습니다. WASA는 고객이 브랜드를 직접 경험하고, 행사 이후에도 다시 떠올리고 찾을 수 있는 흐름을 만듭니다.</p></div>
          <div className="mt-[clamp(58px,8vw,106px)] space-y-[clamp(70px,10vw,148px)]">{brandStories.map(([number, title, body, image], index) => <article className="grid items-center gap-9 md:grid-cols-12 md:gap-8" key={number}><figure className={`photo-zoom md:col-span-8 ${index % 2 ? "md:order-2 md:col-start-5" : ""}`}><ProgressiveImage loading="lazy" decoding="async" src={image} previewSrc={WASA_IMAGE_PREVIEWS[image]} alt={title} className="aspect-[1.45] w-full object-cover" /></figure><div className={`md:col-span-4 ${index % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}><p className="text-[12px] font-bold tracking-[.12em] text-[#885abb]">{number}</p><h3 className="display-copy mt-4 text-[32px] font-extrabold leading-[1.14] md:text-[clamp(37px,3.2vw,48px)]">{title}</h3><p className="body-copy mt-5 text-[16px] leading-7 text-[#675b73]">{body}</p></div></article>)}</div>
        </section>

        <section id="gallery" className="overflow-hidden bg-[#2a1549] py-[clamp(92px,10vw,150px)] text-white"><div className="wide-shell"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-6"><Kicker light>WASA IN REAL LIFE</Kicker><h2 className="display-copy mt-7 text-[40px] font-extrabold leading-[1.08] md:text-[clamp(50px,4.5vw,68px)]">실제로 운영되는<br /><span className="text-[#dcbcff]">WASA의 현장.</span></h2></div><div className="lg:col-span-5 lg:justify-self-end"><p className="body-copy max-w-[420px] text-[16px] leading-7 text-white/72">고객과 브랜드가 실제로 만나는 WASA의 현장을 보여드립니다.</p></div></div>
          <div className="media-rail compact-rail gallery-snap mt-12 pr-5 md:mt-16 md:pr-1">{realLifeItems.map((item, index) => <figure key={item.id} className="group"><div className="photo-zoom"><ProgressiveImage loading="lazy" decoding="async" src={item.image} previewSrc={WASA_IMAGE_PREVIEWS[item.image]} alt={item.alt} className="aspect-[1.35] w-full object-cover" /></div><figcaption className="mt-5"><span className="text-[11px] font-bold tracking-[.12em] text-[#dcbcff]">0{index + 1} · {item.category}</span><h3 className="display-copy mt-2 text-[24px] font-extrabold md:text-[29px]">{item.title}</h3><p className="body-copy mt-2 text-[14px] leading-6 text-white/68">{item.description}</p></figcaption></figure>)}</div></div>
        </section>

        <section className="overflow-hidden py-[clamp(92px,10vw,150px)]"><div className="wide-shell"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-6"><Kicker>CURATED BRANDS</Kicker><h2 className="display-copy mt-7 text-[40px] font-extrabold leading-[1.1] md:text-[clamp(52px,4.6vw,68px)]">발견되는 브랜드에는<br /><span className="text-[#7540af]">이유가 있습니다.</span></h2></div><div className="lg:col-span-5 lg:justify-self-end"><p className="body-copy max-w-[420px] text-[16px] leading-7 text-[#62566e] md:text-[17px] md:leading-8">좋은 제품은 단지 놓이는 것이 아니라, 고객이 발견하고 이해할 수 있는 장면 안에서 더 빛납니다.</p></div></div>
          <div className="media-rail compact-rail gallery-snap mt-12 pr-5 md:mt-16 md:pr-1">{productEdit.map(([src, alt, title, body], index) => <figure key={src}><div className="photo-zoom"><ProgressiveImage loading="lazy" decoding="async" src={src} previewSrc={WASA_IMAGE_PREVIEWS[src]} alt={alt} className={`aspect-[1.16] w-full object-cover${index === 2 ? " curation-story-crop" : ""}`} /></div><figcaption className="mt-5"><span className="text-[11px] font-bold tracking-[.12em] text-[#8a62b3]">0{index + 1} · CURATION</span><h3 className="display-copy mt-2 text-[24px] font-extrabold text-[#2d1947] md:text-[29px]">{title}</h3><p className="body-copy mt-2 text-[14px] leading-6 text-[#6d6078]">{body}</p></figcaption></figure>)}</div></div>
          <div className="wide-shell mt-[clamp(88px,11vw,154px)] grid min-h-[560px] overflow-hidden bg-[#f1e7f9] lg:grid-cols-[1.05fr_.95fr]"><div className="flex flex-col justify-center px-7 py-12 md:px-12 lg:px-16"><Kicker>FOR BRANDS</Kicker><h2 className="display-copy mt-7 text-[43px] font-extrabold leading-[1.08] md:text-[clamp(54px,4.8vw,72px)]">좋은 제품을<br />가진 브랜드를 찾습니다.</h2><p className="mt-8 text-[15px] font-semibold leading-7 text-[#5e4b70]">식품 · 음료 · 뷰티 · 리빙 · 반려동물 · 키즈 · 웰니스 · 지역 특산품</p><p className="body-copy mt-5 max-w-[500px] text-[15px] leading-7 text-[#6a5b78]">고객에게 직접 보여주고 싶은 브랜드라면 WASA에 소개해 주세요.</p></div><div className="photo-zoom min-h-[300px]"><ProgressiveImage loading="lazy" decoding="async" src={ASSETS.forBrandsSignal} alt="WASA 퍼플 신호와 함께 다양한 로컬 브랜드 제품을 보여주는 큐레이션 공간" className="size-full object-cover" /></div></div>
        </section>

        <section id="inquiry" className="bg-[#f0e6fb] pt-[clamp(92px,10vw,150px)] pb-10 md:pb-12"><div className="text-shell grid gap-14 lg:grid-cols-12 lg:items-start"><div className="lg:col-span-6"><Kicker>BRAND INQUIRY</Kicker><h2 className="display-copy mt-7 text-[40px] font-extrabold leading-[1.1] md:text-[clamp(52px,4.6vw,68px)]">우리 브랜드도<br /><span className="text-[#7540af]">고객을 만나볼까요?</span></h2><p className="body-copy mt-7 max-w-[420px] text-[16px] leading-7 text-[#62566e]">브랜드와 제품을 소개해 주세요. WASA 팀이 내용을 확인한 뒤, 참여 가능성과 브랜드에 맞는 방식을 안내드립니다.</p><div className="mt-9 border-l-2 border-[#7b48b2] pl-4 text-[14px] font-semibold leading-6 text-[#5f4a70]"><p>아직 참여를 결정하지 않으셔도 괜찮습니다.</p><p>브랜드와 제품부터 편하게 소개해 주세요.</p></div><figure className="photo-zoom mt-12"><ProgressiveImage loading="lazy" decoding="async" src={ASSETS.entrance} previewSrc={WASA_IMAGE_PREVIEWS[ASSETS.entrance]} alt="WASA 부스를 방문해 제품을 둘러보는 고객" className="aspect-[1.42] w-full object-cover" /></figure></div>
          <div className="lg:col-span-6 lg:col-start-7">{showSuccess ? <div className="success-receipt relative flex min-h-[620px] flex-col items-center justify-center overflow-hidden bg-white px-6 text-center" role="status" aria-live="polite"><div className="relative"><div className="success-seal"><Check size={34} strokeWidth={2.8} /></div><span className="success-spark" /><span className="success-spark" /><span className="success-spark" /><span className="success-spark" /></div><p className="mt-10 text-[11px] font-bold tracking-[.15em] text-[#8351b4]">INQUIRY RECEIVED</p><h3 className="display-copy mt-3 text-[33px] font-extrabold">{submittedBrandName ? `${submittedBrandName}의` : "브랜드"}<br />입점 문의가 접수되었습니다.</h3><p className="body-copy mt-5 max-w-[330px] text-[15px] leading-7 text-[#6e6278]">WASA 팀이 브랜드 소개를 확인한 뒤, 적합한 참여 방식이 있는 경우 자세히 안내드리겠습니다.</p><div className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[12px] font-bold text-[#76538f]"><span>문의 접수</span><span>→</span><span>브랜드 검토</span><span>→</span><span>참여 방식 안내</span></div>{!previewSuccess && <button onClick={() => setSubmitted(false)} className="mt-10 border-b border-[#6c3da4] pb-1 text-sm font-bold text-[#6c3da4]">다른 브랜드 문의하기</button>}</div> : <BrandInquiryForm onSuccess={brandName => { setSubmittedBrandName(brandName); setSubmitted(true); }} />}</div>
        </div></section>

        <BrandInquiryFaq />

        <section className="relative isolate min-h-[620px] overflow-hidden text-white md:min-h-[760px]"><ProgressiveImage src={ASSETS.hero} previewSrc={WASA_IMAGE_PREVIEWS[ASSETS.hero]} alt="WASA 공동 부스 현장" loading="lazy" decoding="async" className="absolute inset-0 -z-20 size-full object-cover" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,10,42,.83),rgba(23,10,42,.32)_55%,rgba(23,10,42,.18))]" /><div className="wide-shell flex min-h-[620px] items-end pb-16 md:min-h-[760px] md:pb-24"><div><Kicker light>THE NEXT WASA</Kicker><h2 className="display-copy mt-7 text-[44px] font-extrabold leading-[1.05] md:text-[clamp(60px,5.3vw,82px)]">다음 WASA에서<br /><span className="text-[#dfc2ff]">고객을 만나보세요.</span></h2><p className="body-copy mt-7 max-w-[420px] text-[16px] leading-7 text-white/80 md:text-[18px] md:leading-8">좋은 제품이 더 많은 고객에게 발견될 수 있도록, WASA가 함께합니다.</p><button onClick={scrollToInquiry} className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#351559] transition hover:bg-[#eadcff] active:scale-[.97]">WASA 입점 문의하기 <ArrowRight size={17} /></button></div></div></section>
      </main>

      {showSuccess && <div role="dialog" aria-modal="true" aria-labelledby="thanks-title" className="thank-you-overlay"><div className="thank-you-modal"><div className="thank-you-check"><Check size={28} strokeWidth={2.6} /></div><p className="mt-7 text-[11px] font-bold tracking-[.15em] text-[#8351b4]">THANK YOU</p><h2 id="thanks-title" className="display-copy mt-3 text-[30px] font-extrabold text-[#281348]">입점 문의가 접수되었습니다.</h2><p className="body-copy mt-5 text-[15px] leading-7 text-[#6e6278]">WASA 팀이 확인 후 연락드리겠습니다.</p><button autoFocus onClick={() => { if (previewSuccess) window.history.back(); else setSubmitted(false); }} className="mt-8 min-h-[52px] rounded-full bg-[#2b164c] px-7 text-sm font-bold text-white transition hover:bg-[#7140aa]">확인했습니다</button></div></div>}

      <footer className="bg-[#1f1235] py-14 pb-24 text-white md:pb-14"><div className="wide-shell"><div className="border-b border-white/15 pb-10"><BrandMark className="-ml-3 w-[174px] brightness-0 invert contrast-125 md:w-[194px]" /><p className="mt-5 max-w-[300px] text-[14px] leading-6 text-white/65">좋은 브랜드가 더 많은 고객을 만나는 곳.</p></div><div className="grid gap-2 pt-8 text-[13px] leading-6 text-white/65"><p>회사명 | 헤드리스 주식회사 | 대표 | 남궁지환</p><p>주소 | 서울특별시 마포구 마포대로 122(프론트원), 11,12층</p><p>사업자등록번호 | 694-86-02485</p><p>통신판매번호 | 2022-서울강남-00470</p><p>전화 | <a href="tel:02-6953-1836" className="hover:text-white">02-6953-1836</a></p><p>이메일 | <a href="mailto:contact@headless.co.kr" className="hover:text-white">contact@headless.co.kr</a></p></div><p className="mt-9 text-[11px] text-white/40">Ⓒheadless Inc. All rights reserved</p></div></footer>
      <button onClick={scrollToInquiry} className={`mobile-sticky-cta fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-3 bg-[#281348] px-5 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(40,19,72,.3)] md:hidden ${ctaCompact ? "mobile-sticky-cta--compact" : ""}`}>WASA 입점 문의하기 <ArrowDownRight size={16} /></button>
    </div>
  );
}
