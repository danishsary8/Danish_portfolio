import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { TELEGRAM_QR } from "@/assets/telegram-qr";

/**
 * Lanyard badge faces, drawn to match the hero PortraitCard (front) and its card back.
 * Canvas 2D at the lanyard's face resolution (1024 × 1440, card ratio 1.6 : 2.25).
 * Sizes are the hero card's CSS sizes scaled by S (card height 460px → 1440px). The top
 * ~120px stays clear: the lanyard cuts a real clip slot there.
 */
export const FACE_W = 1024;
export const FACE_H = 1440;
const S = FACE_H / 460;
const PAD = 20 * S;
const NAVY = "#0c1527";

// Exact icon outlines from the installed packages (24-unit viewBox).
const PHONE_D =
  "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384";
const TELEGRAM_D =
  "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z";
const AWARD_RIBBON_D =
  "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526";

const SANS = 'Geist, "Kantumruy Pro", ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
const SCRIPT = "Allura, cursive";
const POSTER = '"Plus Jakarta Sans", Geist, sans-serif';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// Canvas text only uses a web font once it is loaded, so wait for every face we draw with.
const ensureFonts = () =>
  Promise.all(
    [
      `400 100px ${SCRIPT}`,
      `400 40px ${SANS}`,
      `500 40px ${SANS}`,
      `400 40px ${MONO}`,
      `800 40px ${POSTER}`,
    ].map((f) => document.fonts.load(f).catch(() => [])),
  );

const newCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_W;
  canvas.height = FACE_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  ctx.textBaseline = "alphabetic";
  // Best resampling for the photo and signature (the photo is upscaled 680 → 1024).
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return { canvas, ctx };
};

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const drawPath = (
  ctx: CanvasRenderingContext2D,
  d: string,
  x: number,
  y: number,
  size: number,
  paint: { fill?: string; stroke?: string; lineWidth?: number },
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  const path = new Path2D(d);
  if (paint.fill) {
    ctx.fillStyle = paint.fill;
    ctx.fill(path);
  }
  if (paint.stroke) {
    ctx.strokeStyle = paint.stroke;
    // In path units (24-unit box), like an SVG stroke-width.
    ctx.lineWidth = paint.lineWidth ?? 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(path);
  }
  ctx.restore();
};

// Real Telegram mark: the plane is cut out of the disc, so a white dot fills it.
const drawTelegramMark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - size * 0.19, 0, Math.PI * 2);
  ctx.fill();
  drawPath(ctx, TELEGRAM_D, x, y, size, { fill: "#26A5E4" });
};

// iOS Phone app: green disc with a glossy top and a white handset.
const drawPhoneMark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const cx = x + size / 2;
  const cy = y + size / 2;
  ctx.fillStyle = "#34C759";
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.fill();
  const gloss = ctx.createLinearGradient(0, y, 0, y + size * 0.55);
  gloss.addColorStop(0, "rgba(255,255,255,0.35)");
  gloss.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gloss;
  ctx.fill();
  const icon = size * 0.56;
  drawPath(ctx, PHONE_D, cx - icon / 2, cy - icon / 2, icon, { fill: "#ffffff" });
};

// Holographic foil sticker with the initials, as on the card back.
const drawHolo = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const r = size * 0.205;
  ctx.save();
  roundRect(ctx, x, y, size, size, r);
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 2 * S;
  ctx.shadowOffsetY = 1 * S;
  const conic = ctx.createConicGradient((200 * Math.PI) / 180, x + size * 0.6, y + size * 0.4);
  ["#c9d6ff", "#f5c6e8", "#fff1b8", "#b8f0e0", "#c4d2ff", "#f0c8f0", "#c9d6ff"].forEach((c, i, a) =>
    conic.addColorStop(i / (a.length - 1), c),
  );
  ctx.fillStyle = conic;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.clip();
  const sheen = ctx.createLinearGradient(x, y, x + size, y + size);
  sheen.addColorStop(0, "rgba(255,255,255,0.55)");
  sheen.addColorStop(0.38, "rgba(255,255,255,0)");
  sheen.addColorStop(0.62, "rgba(255,255,255,0.25)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, size, size);
  ctx.restore();
  roundRect(ctx, x + 1, y + 1, size - 2, size - 2, r);
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(59,66,112,0.55)";
  ctx.font = `800 ${size * 0.32}px ${POSTER}`;
  ctx.textAlign = "center";
  ctx.fillText("SD", x + size / 2, y + size / 2 + size * 0.115);
  ctx.textAlign = "left";
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
};

/** Front: the hero card's face. Photo melting into navy, script name, role pill,
 *  phone and Telegram, and the holographic foil where a real badge carries one. */
export async function drawBadgeFront(): Promise<string> {
  const [photo] = await Promise.all([loadImage(ASSETS.profile.photo), ensureFonts()]);
  const { canvas, ctx } = newCanvas();

  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, FACE_W, FACE_H);

  // Portrait: full width, top aligned, cropped to the hero card's 398px photo band.
  const photoH = 398 * S;
  const srcH = (photoH / FACE_W) * photo.naturalWidth;
  ctx.drawImage(photo, 0, 0, photo.naturalWidth, Math.min(srcH, photo.naturalHeight), 0, 0, FACE_W, photoH);
  const fade = ctx.createLinearGradient(0, photoH * 0.82, 0, photoH);
  fade.addColorStop(0, "rgba(12,21,39,0)");
  fade.addColorStop(1, NAVY);
  ctx.fillStyle = fade;
  ctx.fillRect(0, photoH * 0.82, FACE_W, photoH * 0.18 + 2);

  // Headroom shade so the name reads on the backdrop.
  const shade = ctx.createLinearGradient(0, 0, 0, 128 * S);
  shade.addColorStop(0, "rgba(0,0,0,0.25)");
  shade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, FACE_W, 128 * S);

  // Name in script, below the clip slot.
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = `400 ${37 * S}px ${SCRIPT}`;
  ctx.shadowColor = "rgba(10,25,70,0.4)";
  ctx.shadowBlur = 14 * S;
  ctx.shadowOffsetY = 1 * S;
  ctx.fillText(PROFILE.name, FACE_W / 2, 232);
  ctx.restore();

  // Frosted role capsule with the gold available dot.
  ctx.font = `500 ${12.5 * S}px ${SANS}`;
  const label = PROFILE.role;
  const textW = ctx.measureText(label).width;
  const dot = 7 * S;
  const pillH = 24 * S;
  const pillW = 8 * S + dot + 6 * S + textW + 10 * S;
  const pillX = (FACE_W - pillW) / 2;
  const pillY = 262;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#C9973A";
  ctx.beginPath();
  ctx.arc(pillX + 8 * S + dot / 2, pillY + pillH / 2, dot / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, pillX + 8 * S + dot + 6 * S, pillY + pillH / 2 + 12.5 * S * 0.36);

  // Footer: phone and Telegram on the left, holographic foil on the right.
  const mark = 16 * S;
  const rowGap = 26 * S;
  const lastRowY = FACE_H - PAD - 12 * S - mark / 2;
  const rows: [string, (x: number, y: number) => void][] = [
    [PROFILE.phone, (x, y) => drawPhoneMark(ctx, x, y, mark)],
    [PROFILE.telegramHandle, (x, y) => drawTelegramMark(ctx, x, y, mark)],
  ];
  ctx.font = `500 ${14 * S}px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  rows.forEach(([text, drawMark], i) => {
    const cy = lastRowY - (rows.length - 1 - i) * rowGap;
    drawMark(PAD, cy - mark / 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, PAD + mark + 8 * S, cy + 14 * S * 0.36);
  });
  const holo = 44 * S;
  drawHolo(ctx, FACE_W - PAD - holo, FACE_H - PAD - holo, holo);

  return canvas.toDataURL("image/png");
}

/** Back: the hero card back. Magnetic stripe, the owner's signature on security paper,
 *  printed data beside the Telegram QR, fine print, the award line and holographic foil. */
export async function drawBadgeBack(): Promise<string> {
  const [signature] = await Promise.all([loadImage(ASSETS.profile.signature), ensureFonts()]);
  const { canvas, ctx } = newCanvas();

  // Matte navy card stock, lit softly from the top left.
  const stock = ctx.createLinearGradient(0, 0, 0, FACE_H);
  stock.addColorStop(0, "#13203a");
  stock.addColorStop(1, NAVY);
  ctx.fillStyle = stock;
  ctx.fillRect(0, 0, FACE_W, FACE_H);
  const lamp = ctx.createRadialGradient(FACE_W * 0.18, 0, 0, FACE_W * 0.18, 0, FACE_W * 0.9);
  lamp.addColorStop(0, "rgba(255,255,255,0.07)");
  lamp.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = lamp;
  ctx.fillRect(0, 0, FACE_W, FACE_H);

  // Magnetic stripe, edge to edge, below the clip slot.
  const stripeY = 150;
  const stripeH = 40 * S;
  const oxide = ctx.createLinearGradient(0, stripeY, FACE_W, stripeY + stripeH);
  oxide.addColorStop(0, "#17130f");
  oxide.addColorStop(0.38, "#2a241e");
  oxide.addColorStop(0.52, "#1a1611");
  oxide.addColorStop(1, "#0d0b08");
  ctx.fillStyle = oxide;
  ctx.fillRect(0, stripeY, FACE_W, stripeH);
  const band = ctx.createLinearGradient(0, stripeY, 0, stripeY + stripeH);
  band.addColorStop(0, "rgba(255,255,255,0.07)");
  band.addColorStop(0.3, "rgba(255,255,255,0)");
  band.addColorStop(0.7, "rgba(255,255,255,0)");
  band.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = band;
  ctx.fillRect(0, stripeY, FACE_W, stripeH);

  // Signature panel: security paper with a fine guilloche weave and the real signature.
  const panelX = PAD;
  const panelY = stripeY + stripeH + 16 * S;
  const panelW = FACE_W - PAD * 2;
  const panelH = 54 * S;
  ctx.save();
  roundRect(ctx, panelX, panelY, panelW, panelH, 4 * S);
  ctx.clip();
  const paper = ctx.createLinearGradient(0, panelY, 0, panelY + panelH);
  paper.addColorStop(0, "#f6f3ea");
  paper.addColorStop(1, "#e9e4d6");
  ctx.fillStyle = paper;
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.lineWidth = 3;
  const weave = (angle: number, color: string) => {
    ctx.strokeStyle = color;
    const step = 5 * S;
    const t = Math.tan((angle * Math.PI) / 180);
    for (let x = panelX - panelH * Math.abs(t); x < panelX + panelW + panelH; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, panelY + panelH);
      ctx.lineTo(x + panelH * t, panelY);
      ctx.stroke();
    }
  };
  weave(32, "rgba(64,92,150,0.13)");
  weave(-32, "rgba(176,130,45,0.11)");
  // The signature photo is blue ink on white; multiply drops the paper.
  const sigH = 128 * S;
  const sigW = (signature.naturalWidth / signature.naturalHeight) * sigH;
  ctx.globalCompositeOperation = "multiply";
  ctx.translate(panelX + panelW / 2, panelY + panelH / 2);
  ctx.rotate((-2 * Math.PI) / 180);
  ctx.drawImage(signature, -sigW / 2, -sigH * 0.52, sigW, sigH);
  ctx.restore();
  // Inset edge so the panel reads as printed into the card.
  roundRect(ctx, panelX, panelY, panelW, panelH, 4 * S);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = `400 ${10 * S}px ${SANS}`;
  ctx.fillText("Authorized signature", panelX, panelY + panelH + 6 * S + 10 * S);

  // Printed card data (left) and the Telegram QR (right).
  const blockY = panelY + panelH + 6 * S + 10 * S + 14 * S;
  const qrTile = 92 * S;
  const qrX = FACE_W - PAD - qrTile;
  roundRect(ctx, qrX, blockY, qrTile, qrTile, 10 * S);
  ctx.fillStyle = "#f6f3ea";
  ctx.fill();
  const qrInner = qrTile - 6 * S * 2;
  const modules = TELEGRAM_QR.size + 4;
  ctx.save();
  ctx.translate(qrX + 6 * S, blockY + 6 * S);
  ctx.scale(qrInner / modules, qrInner / modules);
  ctx.translate(2, 2);
  ctx.fillStyle = "#162447";
  ctx.fill(new Path2D(TELEGRAM_QR.path));
  ctx.restore();
  ctx.font = `400 ${10 * S}px ${SANS}`;
  const caption = "Scan for Telegram";
  const capW = ctx.measureText(caption).width + 10 * S + 4 * S;
  const capX = qrX + (qrTile - capW) / 2;
  const capY = blockY + qrTile + 6 * S + 10 * S;
  drawPath(ctx, TELEGRAM_D, capX, capY - 9 * S, 10 * S, { fill: "#26A5E4" });
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(caption, capX + 10 * S + 4 * S, capY);

  const data: [string, string, boolean][] = [
    ["ID No.", "B20235079", true],
    ["Email", PROFILE.email, false],
    ["Phone", PROFILE.phone, true],
    ["GitHub", `github.com/${PROFILE.githubHandle}`, false],
  ];
  let y = blockY;
  data.forEach(([label, value, mono]) => {
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = `400 ${10 * S}px ${SANS}`;
    ctx.fillText(label, PAD, y + 10 * S * 0.8);
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = mono ? `400 ${12 * S}px ${MONO}` : `500 ${12 * S}px ${SANS}`;
    ctx.fillText(value, PAD, y + 10 * S + 4 * S + 12 * S * 0.8);
    y += 10 * S + 4 * S + 12 * S + 8 * S;
  });

  // Fine print.
  ctx.fillStyle = "rgba(226,232,244,0.7)";
  ctx.font = `400 ${11 * S}px ${SANS}`;
  const fine = `The holder builds full-stack web apps with secure REST APIs, using React, Laravel and PostgreSQL. Designed by ${PROFILE.shortName} in Cambodia.`;
  const fineTop = Math.max(y, capY) + 12 * S;
  wrapText(ctx, fine, panelW).forEach((line, i) => {
    ctx.fillText(line, PAD, fineTop + 11 * S + i * 11 * S * 1.55);
  });

  // Bottom: gold award line and the holographic foil.
  const holo = 44 * S;
  drawHolo(ctx, FACE_W - PAD - holo, FACE_H - PAD - holo, holo);
  const awardBase = FACE_H - PAD - 2 * S;
  const awardIcon = 14 * S;
  drawPath(ctx, AWARD_RIBBON_D, PAD, awardBase - awardIcon + 1 * S, awardIcon, {
    stroke: "#c9973a",
    lineWidth: 2,
  });
  ctx.save();
  ctx.strokeStyle = "#c9973a";
  ctx.lineWidth = (2 * awardIcon) / 24;
  ctx.beginPath();
  ctx.arc(PAD + (12 * awardIcon) / 24, awardBase - awardIcon + 1 * S + (8 * awardIcon) / 24, (6 * awardIcon) / 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#c9973a";
  ctx.font = `500 ${11.5 * S}px ${SANS}`;
  ctx.fillText("2026 Award Winner · Team", PAD + awardIcon + 6 * S, awardBase - 2 * S);

  return canvas.toDataURL("image/png");
}

let cachedFacesPromise: Promise<{ front: string; back: string }> | null = null;
let cachedFaces: { front: string; back: string } | null = null;

export function preloadBadgeFaces(): Promise<{ front: string; back: string }> {
  if (cachedFaces) return Promise.resolve(cachedFaces);
  if (!cachedFacesPromise) {
    cachedFacesPromise = Promise.all([drawBadgeFront(), drawBadgeBack()])
      .then(([front, back]) => {
        cachedFaces = { front, back };
        return cachedFaces;
      })
      .catch((err) => {
        cachedFacesPromise = null;
        console.error("Failed to draw badge faces:", err);
        throw err;
      });
  }
  return cachedFacesPromise;
}

export function getCachedBadgeFaces(): { front: string; back: string } | null {
  return cachedFaces;
}

