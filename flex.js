// 大貓的 LINE 電子名片：Flex Message 內容
// 上線後只需要改 LIFF_ID 這一行
const LIFF_ID = "請填入你的LIFF_ID";

const C = {
  sage: "#84927F",
  sageDark: "#5F6E5B",
  gold: "#B8975A",
  goldLight: "#E4D3AE",
  cream: "#F6F4EE",
  text: "#4A5247",
  sub: "#8A9387",
};

const LINKS = {
  line: "https://line.me/ti/p/46WSov1BBm",
  about: "https://musehealthyhome.com/authors/lin-ching-chien",
  works: "https://www.muse-aristo.com.tw/album.php?lang=tw&tb=1",
  youtube: "https://youtube.com/@musearisto",
};

const t = (text, o = {}) => ({ type: "text", text, wrap: true, color: C.text, size: "sm", ...o });
const sep = (margin = "lg") => ({ type: "separator", margin, color: C.goldLight });
const eyebrow = (text, align = "start") =>
  t(text, { size: "xxs", color: C.gold, weight: "bold", align });
const bullet = (text) => ({
  type: "box", layout: "baseline", spacing: "sm", margin: "sm",
  contents: [
    t("◆", { size: "xxs", color: C.gold, flex: 0 }),
    t(text, { size: "sm", flex: 1 }),
  ],
});
const btn = (label, uri, style, color) => ({
  type: "button", style, color, height: "md", action: { type: "uri", label, uri },
});

function buildFlex(base) {
  const img = (name) => `${base}img/${name}`;
  const shareUri = `https://liff.line.me/${LIFF_ID}`;

  const card = {
    type: "bubble", size: "mega",
    hero: { type: "image", url: img("portrait.jpg"), size: "full", aspectRatio: "3:4", aspectMode: "cover" },
    body: {
      type: "box", layout: "vertical", paddingAll: "20px", backgroundColor: C.cream,
      contents: [
        eyebrow("MUSE ARISTO INTERIOR DESIGN", "end"),
        {
          type: "text", align: "end", margin: "md", color: C.text,
          contents: [
            { type: "span", text: "林敬謙 ", size: "xl", weight: "bold" },
            { type: "span", text: "Big Cat", size: "md", color: C.sub },
          ],
        },
        t("營運總監／設計師", { align: "end", color: C.sageDark }),
        sep(),
        t("繆思雅集室內裝修設計", { weight: "bold", size: "md", margin: "lg", align: "end", color: C.sageDark }),
        t("健康裝修・綠裝修・老屋翻新", { size: "xs", color: C.sub, align: "end" }),
        t("台北市大安區復興南路一段103號7樓之13", { size: "xs", align: "end", margin: "md" }),
        t("0918-333-360", { size: "sm", align: "end", margin: "sm", color: C.sageDark, weight: "bold",
          action: { type: "uri", label: "撥打手機", uri: "tel:0918333360" } }),
      ],
    },
    footer: {
      type: "box", layout: "vertical", spacing: "sm", paddingAll: "16px", backgroundColor: C.cream,
      contents: [
        btn("分享我的名片", shareUri, "primary", C.sageDark),
        btn("加我 LINE", LINKS.line, "secondary", C.goldLight),
      ],
    },
  };

  const promise = {
    type: "bubble", size: "mega",
    hero: { type: "image", url: img("work2.jpg"), size: "full", aspectRatio: "20:13", aspectMode: "cover" },
    body: {
      type: "box", layout: "vertical", paddingAll: "20px", backgroundColor: C.cream,
      contents: [
        eyebrow("OUR PROMISE"),
        t("安全・舒適・健康", { size: "xl", weight: "bold", margin: "sm", color: C.sageDark }),
        t("始終堅持的六個字｜低甲醛健康裝修專家", { size: "xs", color: C.sub, margin: "sm" }),
        sep(),
        { type: "box", layout: "vertical", margin: "lg", contents: [
          bullet("健康裝修認證 70+ 件｜全台第一"),
          bullet("台灣病態建築診斷士｜綠設計師"),
          bullet("病態建築診斷自檢委員"),
          bullet("2024 鈦美獎百大設計公司 NO.7"),
          bullet("104 講師｜ESG 永續規劃師"),
        ] },
      ],
    },
    footer: {
      type: "box", layout: "vertical", paddingAll: "16px", backgroundColor: C.cream,
      contents: [btn("認識大貓老師", LINKS.about, "secondary", C.goldLight)],
    },
  };

  const works = {
    type: "bubble", size: "mega",
    hero: { type: "image", url: img("work1.jpg"), size: "full", aspectRatio: "20:13", aspectMode: "cover",
      action: { type: "uri", label: "作品集", uri: LINKS.works } },
    body: {
      type: "box", layout: "vertical", paddingAll: "20px", backgroundColor: C.cream,
      contents: [
        eyebrow("WHAT WE DO"),
        t("我們做的事", { size: "xl", weight: "bold", margin: "sm", color: C.sageDark }),
        t("老屋翻新・新成屋裝修\n健康宅・低甲醛規劃\n綠建材標章・綠裝修認證", { margin: "lg", size: "sm" }),
        sep(),
        t("精選作品", { size: "xxs", color: C.gold, weight: "bold", margin: "lg" }),
        t("萬華 60 坪老屋翻新｜從工程停擺到綠裝修黃金級認證", { size: "xs", color: C.sub, margin: "sm" }),
      ],
    },
    footer: {
      type: "box", layout: "vertical", spacing: "sm", paddingAll: "16px", backgroundColor: C.cream,
      contents: [
        btn("看更多作品", LINKS.works, "primary", C.sageDark),
        btn("YouTube 頻道", LINKS.youtube, "link", C.sageDark),
      ],
    },
  };

  return {
    type: "flex",
    altText: "林敬謙 Big Cat｜繆思雅集 營運總監／設計師的名片",
    contents: { type: "carousel", contents: [card, promise, works] },
  };
}
