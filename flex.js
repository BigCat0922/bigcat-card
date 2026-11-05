// 大貓老師 LINE 電子名片：Flex Message carousel（5 張 bubble）
//   1. 名片  2. 近期獲獎（公司獲獎＋黑松酒覓作品獲獎）  3. 歷年作品獎項
//   4. 個人專業資格＋專業經歷  5. 我們做的事＋團隊實績
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
// - work1.jpg：作品卡片主圖，3:2（以 20:13 裁切顯示），建議 1000×667
//
// 完整獲獎紀錄頁 awards.html 也讀取本檔的 AWARDS／CREDENTIALS／EXPERIENCE／TEAM，兩邊資料只需改這裡。

const CONFIG = {
  // 公開 HTTPS 圖片資料夾，結尾斜線有無皆可
  imageBase: "https://bigcat0922.github.io/bigcat-card/img",
  images: { portrait: "portrait.jpg", work1: "work1.jpg" },

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

  // 作品卡片的精選案例，可替換；show 為 false 時不顯示
  featuredCase: { show: true, label: "精選案例", text: "萬華 60 坪老屋翻新" },
};

const LINKS = {
  line: "https://line.me/ti/p/46WSov1BBm",
  about: "https://musehealthyhome.com/authors/lin-ching-chien",
  works: "https://www.muse-aristo.com.tw/album.php?lang=tw&tb=1",
  youtube: "https://youtube.com/@musearisto",
  awardsPage: "https://bigcat0922.github.io/bigcat-card/awards.html",
};

// 公司獲獎、作品獲獎與個人資格分開存放，不可混寫
const AWARDS = {
  // 公司獲獎：rank 照獎座標示
  company: [
    { year: "2026", name: "鈦美獎百大設計公司", rank: "No.04", of: "/100" },
    { year: "2024", name: "鈦美獎百大設計公司", rank: "No.07", of: "/100" },
  ],
  // 作品獲獎：名片第二張重點呈現的近期作品
  featuredWork: {
    title: "Liquor Explorer／黑松酒覓",
    summary: "同一作品｜3 項國際金獎＋A' Design Award 銅獎",
    link: "https://musehealthyhome.com/articles/muse-legacy-3032",
    linkLabel: "黑松酒覓得獎紀錄",
    awards: [
      { text: "MUSE Design Awards 2026｜Gold Winner" },
      { text: "Tokyo Design Awards 2026｜Gold" },
      { text: "London Design Awards 2026｜Gold" },
      { text: "A' Design Award 2025–2026｜Bronze（Spatial Design）",
        note: "依主辦方電子證書；官方作品頁目前未公開" },
      { text: "Twin-Cities Award Space Design 雙城獎｜優秀獎" },
    ],
  },
  // 作品獲獎：歷年代表作品
  pastWorks: [
    {
      title: "Real Explorer／拓荒者真美式",
      link: "https://musehealthyhome.com/articles/real-explorer-international-design-awards",
      awards: [
        { text: "2021 MUSE Design Awards｜Silver Winner" },
        { text: "2021 NOVUM Design Award｜Silver" },
        { text: "2022 A' Design Award｜Iron" },
        { text: "BERLIN Design Awards 2022｜入選紀錄", note: "官方 archive 顯示 Shortlist" },
      ],
    },
    {
      title: "2022 第二屆綠裝修設計大賞",
      link: "https://musehealthyhome.com/articles/green-design-awards-2022",
      awards: [
        { text: "《二柴一貓》｜住宅類金獎" },
        { text: "《星座與光》｜住宅類銀獎" },
        { text: "《倚山謐境》｜住宅類銀獎" },
      ],
    },
    {
      title: "Lightly／輕輕",
      link: "https://musehealthyhome.com/articles/lightly-tsda-green-design-recognition",
      awards: [
        { text: "2023–2024 鈦美獎｜B1 GD 認證組佳作" },
        { text: "鈦美獎百大室內設計｜獎座標示 No.07/100" },
      ],
    },
  ],
};

// 個人證照與專業資格：名稱以官方個人介紹頁（LINKS.about）為準；
// 證號、效期只寫來源頁有明列的，沒有就留空，不自行補寫
const CREDENTIALS = {
  // 名片上逐項顯示的主要資格
  main: [
    { name: "建築物室內設計乙級技術士", details: ["證號 125-003298"] },
    { name: "病態建築診斷協會一級診斷士", details: [] },
    {
      name: "綠設計師／Green Designer",
      details: ["GD綠裝修認證專案執行人員合格證書", "證書編號 GDTW2009009", "有效期間 2026.10.01–2029.09.30"],
      link: "https://musehealthyhome.com/articles/gd-green-designer-credentials",
    },
  ],
  // 名片上以兩欄並列的其他資格（官方頁「永續與管理」）
  others: ["ESG 永續規劃師", "危老重建推動師", "防火管理人", "租賃住宅管理師"],
};

// 業界經歷與專業分享：不是證照，分開呈現
const EXPERIENCE = {
  roles: [
    "104 人力銀行「工作世界」業界講師",
    "企業營運管理顧問",
    "曾任新瓦建設管理部經理、廣西菓緹 GOTEA 總經理",
  ],
  sharing: "自 2017 年起持續於企業、學校與專業組織分享室內設計、健康裝修、職涯、創業與 AI 應用",
};

// 繆思雅集團隊實績：公司成果，不是個人證照
const TEAM = {
  gd: { total: 71, gold: 62, standard: 9, asOf: "2026.08.01" },
  sbsPassed: 17, // 病態建築診斷合格案件；來源頁未標示統計日期
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

const isHttps = (u) => /^https:\/\/[^\s/]+\.[^\s]+/.test(u || "");

// 回傳設定問題清單；空陣列代表可以使用
function checkConfig() {
  const errors = [];
  if (!isHttps(CONFIG.imageBase) || /請填|example\.com|your/i.test(CONFIG.imageBase)) {
    errors.push("CONFIG.imageBase 必須是公開的 HTTPS 圖片網址");
  }
  if (!isHttps(CONFIG.cardPageUrl)) errors.push("CONFIG.cardPageUrl 必須是 HTTPS 網址");
  Object.entries(LINKS).forEach(([k, u]) => { if (!isHttps(u)) errors.push(`LINKS.${k} 必須是 HTTPS 網址`); });
  [AWARDS.featuredWork, ...AWARDS.pastWorks, ...CREDENTIALS.main].forEach((x) => {
    if (x.link && !isHttps(x.link)) errors.push(`「${x.title || x.name}」的連結必須是 HTTPS 網址`);
  });
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
const heading = (text) => t(text, { size: "xl", weight: "bold", margin: "sm", color: C.sageDark });
// 區分「公司獲獎／作品獲獎／個人資格／專業經歷／團隊實績」的分類標籤
const tag = (text) => t(text, { size: "xs", color: C.gold, weight: "bold", margin: "lg" });
const bullet = (text, margin = "sm") => ({
  type: "box", layout: "baseline", spacing: "sm", margin,
  contents: [t("◆", { size: "xxs", color: C.gold, flex: 0 }), t(text, { size: "xs", flex: 1 })],
});
const uri = (label, url) => ({ type: "uri", label, uri: url });
const btn = (label, url, style, color, extra = {}) => {
  if (label.length > LABEL_MAX) throw new Error(`按鈕文字超過 ${LABEL_MAX} 字：${label}`);
  return { type: "button", style, color, height: "sm", action: uri(label, url), ...extra };
};
const hero = (url, aspectRatio) => ({ type: "image", url, size: "full", aspectRatio, aspectMode: "cover" });
const footer = (contents) => ({
  type: "box", layout: "vertical", spacing: "sm", paddingAll: "16px", backgroundColor: C.cream, contents,
});
const body = (contents) => ({
  type: "box", layout: "vertical", paddingAll: "20px", backgroundColor: C.cream, contents,
});
const bubble = (parts) => ({ type: "bubble", size: "mega", ...parts });

// 公司排名列：左邊年份＋獎名，右邊大字名次
const rankRow = (a, big) => ({
  type: "box", layout: "horizontal", margin: big ? "sm" : "md", alignItems: "center",
  contents: [
    big
      ? { type: "box", layout: "vertical", flex: 1, contents: [
          t(a.year, { size: "xs", color: C.gold, weight: "bold" }),
          t(a.name, { size: "sm", weight: "bold" }),
        ] }
      : t(`${a.year} ${a.name}`, { size: "xs", flex: 1 }),
    {
      type: "text", flex: 0, align: "end", color: big ? C.gold : C.sageDark,
      contents: [
        { type: "span", text: a.rank, size: big ? "xxl" : "lg", weight: "bold" },
        { type: "span", text: a.of, size: "xs" },
      ],
    },
  ],
});

function buildFlex() {
  const errors = checkConfig();
  if (errors.length) throw new Error("名片設定有誤：\n" + errors.join("\n"));

  const shareBtn = hasLiff()
    ? btn("分享我的名片", `https://liff.line.me/${CONFIG.liffId}`, "primary", C.sageDark)
    : btn("開啟名片頁", CONFIG.cardPageUrl, "primary", C.sageDark);

  const profile = bubble({
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
  });

  const fw = AWARDS.featuredWork;
  const [topCompany, ...otherCompany] = AWARDS.company;
  const recentAwards = bubble({
    body: body([
      eyebrow("AWARDS & RECOGNITION"),
      heading("獲獎與專業肯定"),
      sep(),
      tag("公司獲獎"),
      rankRow(topCompany, true),
      ...otherCompany.map((a) => rankRow(a, false)),
      sep(),
      tag("作品獲獎"),
      t(fw.title, { size: "md", weight: "bold", margin: "sm", color: C.sageDark, action: uri("得獎紀錄", fw.link) }),
      t(fw.summary, { size: "xs", color: C.sub, margin: "xs" }),
      { type: "box", layout: "vertical", margin: "sm", contents: fw.awards.map((a) => bullet(a.text)) },
    ]),
    footer: footer([
      btn(fw.linkLabel, fw.link, "primary", C.sageDark),
      btn("查看完整獲獎紀錄", LINKS.awardsPage, "secondary", C.goldLight),
    ]),
  });

  const pastAwards = bubble({
    body: body([
      eyebrow("AWARD ARCHIVE"),
      heading("歷年作品獎項"),
      t("點作品名稱可查看該作品的得獎紀錄", { size: "xxs", color: C.sub, margin: "sm" }),
      ...AWARDS.pastWorks.flatMap((w) => [
        sep(),
        t(`${w.title}  ›`, { size: "sm", weight: "bold", margin: "lg", color: C.sageDark, action: uri("得獎紀錄", w.link) }),
        ...w.awards.map((a) => bullet(a.text, "xs")),
      ]),
    ]),
    footer: footer([btn("查看完整獲獎紀錄", LINKS.awardsPage, "primary", C.sageDark)]),
  });

  // 主要資格：名稱用 sm 粗體、可換行，細節另起一行，避免被裁切
  const mainRows = CREDENTIALS.main.map((c) => ({
    type: "box", layout: "vertical", margin: "md",
    contents: [
      t(c.name, { weight: "bold", color: C.sageDark, ...(c.link ? { action: uri("資格說明", c.link) } : {}) }),
      ...c.details.map((d) => t(d, { size: "xs", color: C.sub })),
    ],
  }));
  // 其他資格兩兩一列
  const otherRows = [];
  for (let i = 0; i < CREDENTIALS.others.length; i += 2) {
    const pair = CREDENTIALS.others.slice(i, i + 2);
    otherRows.push({
      type: "box", layout: "horizontal", spacing: "md", margin: "sm",
      contents: pair.map((name) => ({
        type: "box", layout: "baseline", spacing: "sm", flex: 1,
        contents: [t("◆", { size: "xxs", color: C.gold, flex: 0 }), t(name, { flex: 1 })],
      })),
    });
  }
  const gdLink = CREDENTIALS.main.find((c) => c.link);

  const credentials = bubble({
    body: body([
      eyebrow("PERSONAL CREDENTIALS"),
      heading("個人專業資格"),
      tag("個人證照與資格"),
      ...mainRows,
      { type: "box", layout: "vertical", margin: "md", contents: otherRows },
      sep(),
      tag("專業經歷"),
      ...EXPERIENCE.roles.map((r) => bullet(r)),
      bullet("2017 年起持續於企業、學校與專業組織公開分享"),
    ]),
    footer: footer([
      btn("查看完整專業介紹", LINKS.about, "primary", C.sageDark),
      ...(gdLink ? [btn("綠設計師資格說明", gdLink.link, "secondary", C.goldLight)] : []),
    ]),
  });

  // 團隊實績：大數字＋說明
  const stat = (num, label, note) => ({
    type: "box", layout: "vertical", flex: 1,
    contents: [
      {
        type: "text", color: C.gold,
        contents: [
          { type: "span", text: String(num), size: "xxl", weight: "bold" },
          { type: "span", text: " 件", size: "xs" },
        ],
      },
      t(label, { size: "xs", weight: "bold", color: C.sageDark }),
      ...(note ? [t(note, { size: "xxs", color: C.sub })] : []),
    ],
  });
  const g = TEAM.gd;

  const workBody = [
    eyebrow("WHAT WE DO"),
    heading("我們做的事"),
    t("老屋翻新・新成屋裝修\n健康宅・低甲醛規劃", { margin: "lg" }),
    sep(),
    tag("團隊實績｜繆思雅集"),
    {
      type: "box", layout: "horizontal", spacing: "md", margin: "sm",
      contents: [
        stat(g.total, "GD 綠裝修認證", `黃金級 ${g.gold}・標準級 ${g.standard}`),
        stat(TEAM.sbsPassed, "病態建築診斷合格"),
      ],
    },
    t(`GD 綠裝修認證案件統計至 ${g.asOf}`, { size: "xxs", color: C.sub, margin: "sm" }),
  ];
  if (CONFIG.featuredCase.show) {
    workBody.push(
      sep(),
      t(CONFIG.featuredCase.label, { size: "xxs", color: C.gold, weight: "bold", margin: "lg" }),
      t(CONFIG.featuredCase.text, { size: "xs", color: C.sub, margin: "sm" }),
    );
  }

  const works = bubble({
    hero: hero(img("work1"), "20:13"),
    body: body(workBody),
    footer: footer([
      btn("看更多作品", LINKS.works, "primary", C.sageDark),
      btn("YouTube 頻道", LINKS.youtube, "link", C.sageDark),
    ]),
  });

  return {
    type: "flex",
    altText: `${CONFIG.name} ${CONFIG.nameEn}｜${CONFIG.title}的名片`,
    contents: { type: "carousel", contents: [profile, recentAwards, pastAwards, credentials, works] },
  };
}
