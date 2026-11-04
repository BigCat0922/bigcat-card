// 簡易 Flex Message 預覽器：只支援這張名片用到的元件，畫面會接近 LINE 實際樣子
const SIZE = { xxs: 11, xs: 13, sm: 14, md: 16, lg: 19, xl: 22, xxl: 29 };
const GAP = { none: 0, xs: 2, sm: 4, md: 8, lg: 12, xl: 16, xxl: 20 };
const px = (v) => (v in GAP ? GAP[v] : parseInt(v, 10) || 0) + "px";

function el(tag, style = {}, children = []) {
  const n = document.createElement(tag);
  Object.assign(n.style, style);
  children.forEach((c) => c && n.append(c));
  return n;
}

function linkify(node, action) {
  if (!action) return node;
  node.style.cursor = "pointer";
  node.title = action.uri;
  node.onclick = () => window.open(action.uri, "_blank");
  return node;
}

function renderNode(n, parentLayout, spacing, isFirst) {
  let out;
  if (n.type === "box") {
    const horiz = n.layout !== "vertical";
    out = el("div", {
      display: "flex", flexDirection: horiz ? "row" : "column",
      alignItems: n.layout === "baseline" ? "baseline" : "stretch",
      backgroundColor: n.backgroundColor || "", padding: n.paddingAll ? px(n.paddingAll) : "",
      borderRadius: n.cornerRadius ? px(n.cornerRadius) : "",
    });
    n.contents.forEach((c, i) => out.append(renderNode(c, n.layout, n.spacing, i === 0)));
  } else if (n.type === "text") {
    out = el("div", {
      fontSize: (SIZE[n.size] || 14) + "px", color: n.color || "#111", textAlign: n.align || "start",
      fontWeight: n.weight === "bold" ? "700" : "400", whiteSpace: n.wrap ? "pre-wrap" : "nowrap",
      lineHeight: 1.45, letterSpacing: n.size === "xxs" ? ".08em" : "",
    });
    if (n.contents) {
      n.contents.forEach((s) => out.append(el("span", {
        fontSize: s.size ? SIZE[s.size] + "px" : "", fontWeight: s.weight === "bold" ? "700" : "", color: s.color || "",
      }, [s.text])));
    } else out.textContent = n.text;
  } else if (n.type === "image") {
    const [w, h] = (n.aspectRatio || "1:1").split(":");
    out = el("img", { width: "100%", aspectRatio: `${w}/${h}`, objectFit: n.aspectMode === "cover" ? "cover" : "contain", display: "block" });
    out.src = n.url;
  } else if (n.type === "separator") {
    out = el("div", { borderTop: `1px solid ${n.color || "#ddd"}` });
  } else if (n.type === "button") {
    const solid = n.style === "primary";
    out = el("div", {
      height: "52px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px",
      fontSize: "16px",
      background: n.style === "link" ? "transparent" : n.color || (solid ? "#17c950" : "#dcdfe5"),
      color: solid ? "#fff" : n.style === "link" ? n.color || "#42659a" : "#111",
    }, [n.action.label]);
  }
  out = linkify(out, n.action);
  const gap = n.margin ? px(n.margin) : !isFirst && spacing ? px(spacing) : "0";
  if (parentLayout === "vertical") out.style.marginTop = gap; else if (parentLayout) out.style.marginLeft = gap;
  if (parentLayout && parentLayout !== "vertical") out.style.flex = n.flex === 0 ? "0 0 auto" : String(n.flex ?? 1);
  return out;
}

function renderBubble(b) {
  const card = el("div", {
    width: "300px", flex: "0 0 300px", borderRadius: "14px", overflow: "hidden", background: "#fff",
    display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,.15)",
  });
  if (b.hero) card.append(renderNode(b.hero));
  if (b.body) { const body = renderNode(b.body); body.style.flex = "1"; card.append(body); }
  if (b.footer) card.append(renderNode(b.footer));
  return card;
}

function renderFlex(msg, target) {
  const row = el("div", { display: "flex", gap: "10px", overflowX: "auto", padding: "4px 16px 12px", scrollSnapType: "x mandatory", alignItems: "stretch" });
  msg.contents.contents.forEach((b) => { const c = renderBubble(b); c.style.scrollSnapAlign = "start"; row.append(c); });
  target.replaceChildren(row);
}
