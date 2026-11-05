// 大貓老師 LINE 電子名片：Flex Message carousel（3 張 bubble）
//
// 分享流程說明：
// - 這個檔案只負責「組出 Flex Message JSON」，本身不會傳訊息。
// - 真正把名片傳給好友／群組的是同資料夾的 index.html：它載入 LIFF SDK，
//   liff.init() 成功、使用者已登入、且 liff.isApiAvailable("shareTargetPicker") 為 true 時，
//   才呼叫 liff.shareTargetPicker([訊息])。
// - 要讓分享可用，LINE Developers Console 需要：
//   1. 一個 LINE Login channel，底下新增 LIFF app（Size: Full，Endpoint URL 填 CONFIG.cardPageUrl）
//   2. 在該 channel 開啟 shareTargetPicker
//   3. channel 狀態設為 Published（開發中狀態只有 channel 管理者／測試者能用）
//   4. 把取得的 LIFF ID 填入 CONFIG.liffId
// - 卡片上的「分享我的名片」按鈕只是「打開 index.html」，由對方自己決定要不要分享；
//   LIFF ID 未設定時，按鈕會改成「開啟名片頁」，直接打開 cardPageUrl。
//
// 需要部署到 CONFIG.imageBase 的圖片（LINE 只接受公開 HTTPS 的 JPEG／PNG，單張建議 1MB 以內）：
// - portrait.jpg：形象照，3:4，建議 900×1200
// - work2.jpg：第二張卡片主圖，3:2（以 20:13 裁切顯示），建議 1000×667
// - work1.jpg：第三張卡片主圖，3:2（以 20:13 裁切顯示），建議 1000×667

const CONFIG = {
  // 公開 HTTPS 圖片資料夾，結尾斜線有無皆可
  imageBase: "https://bigcat0922.github.io/bigcat-card/img",
  images: { portrait: "portrait.jpg", work1: "work1.jpg", work2: "work2.jpg" },

  // 名片頁（index.html）網址；也是 LIFF app 的 Endpoint URL
  cardPageUrl: "https://bigcat0922.github.io/bigcat-card/",
  // LIFF ID 格式為「10 位數字-8 碼英數」，例如 1234567890-AbCdEfGh；未設定時保留空字串
  liffId: "2012386170-G2yztTfr",

  name: "林敬謙",
  nameEn: "Big Cat",
  title: "繆思雅集營運總監／設計師",
  company: "繆思雅集室內裝修設計",
  address: "台北市大安區復興南路一段103號7樓之13",
  phoneDisplay: "0918-333-360",
  phoneTel: "0918333360",

  // 第二張卡片的資格與獎項（只列本人已確認的項目）
  credentials: [
    "台灣病態建築診斷士",
    "綠設計師",
    "2026 鈦美獎百大設計公司 NO.4",
  ],
  // 待本人確認後再把 show 改成 true（文字出自 linkgoods 個人簡介）
  pendingCredential: { show: false, text: "健康裝修認證 70+ 件｜全台第一" },

  // 第三張卡片的精選案例，可替換；show 為 false 時不顯示
  featuredCase: { show: true, label: "精選案例", text: "萬華 60 坪老屋翻新" },
};

const LINKS = {
  line: "https://line.me/ti/p/46WSov1BBm",
  about: "https://musehealthyhome.com/authors/lin-ching-chien",
  works: "https://www.muse-aristo.com.tw/album.php?lang=tw&tb=1",
  youtube: "https://youtube.com/@musearisto",
};

const C = {
  sageDark: "#5F6E5B",
  gold: "#B8975A",
  goldLight: "#E4D3AE",
  cream: "#F6F4EE",
  text: "#4A5247",
  sub: "#8A9387",
};

const LIFF_ID_PATTERN = /^\d{10}-[A-Za-z0-9]{8}$/;
const LABEL_MAX = 20;

// 回傳設定問題清單；空陣列代表可以使用
function checkConfig() {
  const errors = [];
  const isHttps = (u) => /^https:\/\/[^\s/]+\.[^\s]+/.test(u || "");
  if (!isHttps(CONFIG.imageBase) || /請填|example\.com|your/i.test(CONFIG.imageBase)) {
    errors.push("CONFIG.imageBase 必須是公開的 HTTPS 圖片網址");
  }
  if (!isHttps(CONFIG.cardPageUrl)) errors.push("CONFIG.cardPageUrl 必須是 HTTPS 網址");
  Object.entries(LINKS).forEach(([k, u]) => { if (!isHttps(u)) errors.push(`LINKS.${k} 必須是 HTTPS 網址`); });
  if (CONFIG.liffId && !LIFF_ID_PATTERN.test(CONFIG.liffId)) {
    errors.push("CONFIG.liffId 格式不對，應為「10 位數字-8 碼英數」，未設定請留空字串");
  }
  if (!/^\d{9,10}$/.test(CONFIG.phoneTel)) errors.push("CONFIG.phoneTel 只能是 9～10 位數字");
  return errors;
}

const hasLiff = () => LIFF_ID_PATTERN.test(CONFIG.liffId);

// 接起 base 和檔名，不論 base 結尾有沒有斜線都只留一個
const joinUrl = (base, file) => `${base.replace(/\/+$/, "")}/${file.replace(/^\/+/, "")}`;
const img = (key) => joinUrl(CONFIG.imageBase, CONFIG.images[key]);

const t = (text, o = {}) => ({ type: "text", text, wrap: true, color: C.text, size: "sm", ...o });
const sep = (margin = "lg") => ({ type: "separator", margin, color: C.goldLight });
const eyebrow = (text, align = "start") => t(text, { size: "xxs", color: C.gold, weight: "bold", align });
const bullet = (text) => ({
  type: "box", layout: "baseline", spacing: "sm", margin: "md",
  contents: [t("◆", { size: "xxs", color: C.gold, flex: 0 }), t(text, { flex: 1 })],
});
const btn = (label, uri, style, color, extra = {}) => {
  if (label.length > LABEL_MAX) throw new Error(`按鈕文字超過 ${LABEL_MAX} 字：${label}`);
  return { type: "button", style, color, height: "sm", action: { type: "uri", label, uri }, ...extra };
};
const hero = (url, aspectRatio) => ({ type: "image", url, size: "full", aspectRatio, aspectMode: "cover" });
const footer = (contents) => ({
  type: "box", layout: "vertical", spacing: "sm", paddingAll: "16px", backgroundColor: C.cream, contents,
});
const body = (contents) => ({
  type: "box", layout: "vertical", paddingAll: "20px", backgroundColor: C.cream, contents,
});

function buildFlex() {
  const errors = checkConfig();
  if (errors.length) throw new Error("名片設定有誤：\n" + errors.join("\n"));

  const shareBtn = hasLiff()
    ? btn("分享我的名片", `https://liff.line.me/${CONFIG.liffId}`, "primary", C.sageDark)
    : btn("開啟名片頁", CONFIG.cardPageUrl, "primary", C.sageDark);

  const profile = {
    type: "bubble", size: "mega",
    hero: hero(img("portrait"), "3:4"),
    body: body([
      eyebrow("MUSE ARISTO INTERIOR DESIGN", "end"),
      {
        type: "text", align: "end", margin: "md", color: C.text, wrap: true,
        contents: [
          { type: "span", text: `${CONFIG.name} `, size: "xl", weight: "bold" },
          { type: "span", text: CONFIG.nameEn, size: "md", color: C.sub },
        ],
      },
      t(CONFIG.title, { align: "end", color: C.sageDark }),
      sep(),
      t(CONFIG.company, { weight: "bold", size: "md", margin: "lg", align: "end", color: C.sageDark }),
      t(CONFIG.address, { size: "xs", align: "end", margin: "sm", color: C.sub }),
      t(CONFIG.phoneDisplay, { size: "sm", align: "end", margin: "sm", color: C.sageDark, weight: "bold" }),
    ]),
    footer: footer([
      shareBtn,
      {
        type: "box", layout: "horizontal", spacing: "sm",
        contents: [
          btn("加大貓 LINE", LINKS.line, "secondary", C.goldLight, { flex: 1 }),
          btn("撥打電話", `tel:${CONFIG.phoneTel}`, "secondary", C.goldLight, { flex: 1 }),
        ],
      },
    ]),
  };

  const credentials = [...CONFIG.credentials];
  if (CONFIG.pendingCredential.show) credentials.unshift(CONFIG.pendingCredential.text);

  const promise = {
    type: "bubble", size: "mega",
    hero: hero(img("work2"), "20:13"),
    body: body([
      eyebrow("OUR PROMISE"),
      t("安全・舒適・健康", { size: "xl", weight: "bold", margin: "sm", color: C.sageDark }),
      t("低甲醛健康裝修", { size: "xs", color: C.sub, margin: "sm" }),
      sep(),
      { type: "box", layout: "vertical", margin: "md", contents: credentials.map(bullet) },
    ]),
    footer: footer([btn("認識大貓老師", LINKS.about, "secondary", C.goldLight)]),
  };

  const workBody = [
    eyebrow("WHAT WE DO"),
    t("我們做的事", { size: "xl", weight: "bold", margin: "sm", color: C.sageDark }),
    t("老屋翻新・新成屋裝修\n健康宅・低甲醛規劃", { margin: "lg" }),
  ];
  if (CONFIG.featuredCase.show) {
    workBody.push(
      sep(),
      t(CONFIG.featuredCase.label, { size: "xxs", color: C.gold, weight: "bold", margin: "lg" }),
      t(CONFIG.featuredCase.text, { size: "xs", color: C.sub, margin: "sm" }),
    );
  }

  const works = {
    type: "bubble", size: "mega",
    hero: hero(img("work1"), "20:13"),
    body: body(workBody),
    footer: footer([
      btn("看更多作品", LINKS.works, "primary", C.sageDark),
      btn("YouTube 頻道", LINKS.youtube, "link", C.sageDark),
    ]),
  };

  return {
    type: "flex",
    altText: `${CONFIG.name} ${CONFIG.nameEn}｜${CONFIG.title}的名片`,
    contents: { type: "carousel", contents: [profile, promise, works] },
  };
}
