/**
 * Executive Badge Texture Generator
 * Composes a high-craft, 2x retina executive developer badge
 * featuring Sary Danish's portrait photo and telemetry.
 * Conforms strictly to AGENTS.md and /impeccable standards.
 */

import { PROFILE } from "@/content/portfolio";

// Vector fallback SVG (renders instantly before canvas composite)
export const BADGE_FRONT_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850" fill="%23111113">
  <defs>
    <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="%23e6be68"/>
      <stop offset="50%" stop-color="%23c9973a"/>
      <stop offset="100%" stop-color="%2385601f"/>
    </linearGradient>
    <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%2327272a"/>
      <stop offset="100%" stop-color="%2318181b"/>
    </linearGradient>
  </defs>
  <rect width="600" height="850" rx="36" fill="%23111113"/>
  <rect x="20" y="20" width="560" height="810" rx="26" fill="none" stroke="%23c9973a" stroke-width="2" stroke-opacity="0.45"/>
  <rect x="250" y="24" width="100" height="14" rx="7" fill="%2309090b" stroke="%233f3f46" stroke-width="1.5"/>
  
  <text x="300" y="85" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="14" letter-spacing="4" font-weight="bold">DEVELOPER PORTFOLIO</text>
  <text x="300" y="112" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12" letter-spacing="1">NORTON UNIVERSITY • ICT UTC+7</text>
  <line x1="50" y1="135" x2="550" y2="135" stroke="%2327272a" stroke-width="1.5"/>

  <g transform="translate(180, 155)">
    <rect width="240" height="270" rx="28" fill="url(%23shield-grad)" stroke="%23c9973a" stroke-width="2.5" stroke-opacity="0.8"/>
    <rect x="10" y="10" width="220" height="250" rx="20" fill="none" stroke="%23ffffff" stroke-width="1" stroke-opacity="0.1"/>
    
    <circle cx="120" cy="100" r="50" fill="%23111113" stroke="url(%23gold-grad)" stroke-width="3"/>
    <text x="120" y="120" text-anchor="middle" fill="url(%23gold-grad)" font-family="sans-serif" font-size="52" font-weight="900">SD</text>
    
    <g transform="translate(80, 185)" fill="%23c9973a" opacity="0.9">
      <rect width="80" height="50" rx="8" fill="none" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="25" y1="0" x2="25" y2="50" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="55" y1="0" x2="55" y2="50" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="0" y1="25" x2="80" y2="25" stroke="%23c9973a" stroke-width="1.5"/>
      <circle cx="40" cy="25" r="10" fill="%23c9973a"/>
    </g>
  </g>

  <text x="300" y="468" text-anchor="middle" fill="%23ededef" font-family="sans-serif" font-size="34" font-weight="bold" letter-spacing="1">SARY DANISH</text>
  <text x="300" y="505" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="16" font-weight="bold" letter-spacing="1">Junior Web Developer</text>
  <text x="300" y="535" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="14">React • Laravel • PostgreSQL • REST</text>

  <g transform="translate(160, 560)">
    <rect width="280" height="36" rx="18" fill="%2318181b" stroke="%23c9973a" stroke-width="1.5" stroke-opacity="0.6"/>
    <circle cx="24" cy="18" r="6" fill="%23c9973a"/>
    <text x="42" y="23" fill="%23c9973a" font-family="sans-serif" font-size="13" font-weight="bold">OPEN TO WEB DEV ROLES</text>
  </g>

  <line x1="50" y1="625" x2="550" y2="625" stroke="%2327272a" stroke-width="1.5"/>
  <text x="70" y="660" fill="%2371717a" font-family="monospace" font-size="12">GITHUB</text>
  <text x="70" y="690" fill="%23ededef" font-family="monospace" font-size="19" font-weight="bold">danishsary8</text>
  <text x="530" y="690" text-anchor="end" fill="%23c9973a" font-family="monospace" font-size="14" font-weight="bold">@danishsary</text>

  <g transform="translate(70, 720)" fill="%23c9973a" opacity="0.85">
    <rect x="0" y="0" width="5" height="45"/>
    <rect x="9" y="0" width="3" height="45"/>
    <rect x="16" y="0" width="11" height="45"/>
    <rect x="33" y="0" width="5" height="45"/>
    <rect x="43" y="0" width="8" height="45"/>
    <rect x="58" y="0" width="13" height="45"/>
    <rect x="78" y="0" width="4" height="45"/>
    <rect x="88" y="0" width="9" height="45"/>
    <rect x="103" y="0" width="6" height="45"/>
    <rect x="114" y="0" width="15" height="45"/>
    <rect x="136" y="0" width="4" height="45"/>
    <rect x="146" y="0" width="8" height="45"/>
    <rect x="160" y="0" width="11" height="45"/>
    <rect x="178" y="0" width="5" height="45"/>
    <rect x="188" y="0" width="14" height="45"/>
    <rect x="208" y="0" width="6" height="45"/>
    <rect x="220" y="0" width="9" height="45"/>
    <rect x="236" y="0" width="4" height="45"/>
    <rect x="246" y="0" width="13" height="45"/>
    <rect x="266" y="0" width="6" height="45"/>
    <rect x="278" y="0" width="8" height="45"/>
    <rect x="292" y="0" width="15" height="45"/>
    <rect x="314" y="0" width="5" height="45"/>
    <rect x="324" y="0" width="9" height="45"/>
    <rect x="340" y="0" width="4" height="45"/>
    <rect x="350" y="0" width="11" height="45"/>
    <rect x="368" y="0" width="6" height="45"/>
    <rect x="380" y="0" width="14" height="45"/>
    <rect x="401" y="0" width="4" height="45"/>
    <rect x="411" y="0" width="9" height="45"/>
    <rect x="426" y="0" width="11" height="45"/>
    <rect x="444" y="0" width="6" height="45"/>
  </g>
  <text x="300" y="795" text-anchor="middle" fill="%2352525b" font-family="monospace" font-size="11">PHNOM PENH, CAMBODIA • 2026</text>
</svg>`;

// Crisp SVG texture for the back of the physical developer badge
export const BADGE_BACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850" fill="%23111113">
  <rect width="600" height="850" fill="%23111113"/>
  <rect x="24" y="24" width="552" height="802" rx="20" fill="none" stroke="%23c9973a" stroke-width="2" stroke-opacity="0.35"/>
  <text x="300" y="85" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="20" letter-spacing="4" font-weight="bold">DEVELOPER PROFILE</text>
  <text x="300" y="120" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="14">PHNOM PENH, CAMBODIA • ICT UTC+7</text>
  <line x1="50" y1="145" x2="550" y2="145" stroke="%2327272a" stroke-width="1.5"/>
  
  <text x="70" y="200" fill="%2371717a" font-family="monospace" font-size="12">ROLE</text>
  <text x="70" y="230" fill="%23ededef" font-family="monospace" font-size="20" font-weight="bold">Junior Web Developer</text>
  
  <text x="70" y="290" fill="%2371717a" font-family="monospace" font-size="12">ORGANIZATION</text>
  <text x="70" y="320" fill="%23ededef" font-family="sans-serif" font-size="17" font-weight="bold">Norton University</text>
  <text x="70" y="345" fill="%23a1a1aa" font-family="sans-serif" font-size="14">B.S. Software Development (Year 4)</text>
  
  <text x="70" y="405" fill="%2371717a" font-family="monospace" font-size="12">CORE EXPERTISE</text>
  <text x="70" y="435" fill="%23c9973a" font-family="monospace" font-size="16" font-weight="bold">React • Laravel • PostgreSQL • REST</text>
  
  <text x="70" y="495" fill="%2371717a" font-family="monospace" font-size="12">CONTACT</text>
  <text x="70" y="525" fill="%23ededef" font-family="monospace" font-size="15">github.com/danishsary8</text>
  <text x="70" y="555" fill="%23ededef" font-family="monospace" font-size="15">t.me/danishsary</text>
  
  <g transform="translate(70, 620)" fill="%23c9973a" opacity="0.85">
    <rect x="0" y="0" width="5" height="50"/>
    <rect x="9" y="0" width="3" height="50"/>
    <rect x="16" y="0" width="11" height="50"/>
    <rect x="33" y="0" width="5" height="50"/>
    <rect x="43" y="0" width="8" height="50"/>
    <rect x="58" y="0" width="13" height="50"/>
    <rect x="78" y="0" width="4" height="50"/>
    <rect x="88" y="0" width="9" height="50"/>
    <rect x="103" y="0" width="6" height="50"/>
    <rect x="114" y="0" width="15" height="50"/>
    <rect x="136" y="0" width="4" height="50"/>
    <rect x="146" y="0" width="8" height="50"/>
    <rect x="160" y="0" width="11" height="50"/>
    <rect x="178" y="0" width="5" height="50"/>
    <rect x="188" y="0" width="14" height="50"/>
    <rect x="208" y="0" width="6" height="50"/>
    <rect x="220" y="0" width="9" height="50"/>
    <rect x="236" y="0" width="4" height="50"/>
    <rect x="246" y="0" width="13" height="50"/>
    <rect x="266" y="0" width="6" height="50"/>
    <rect x="278" y="0" width="8" height="50"/>
    <rect x="292" y="0" width="15" height="50"/>
    <rect x="314" y="0" width="5" height="50"/>
    <rect x="324" y="0" width="9" height="50"/>
    <rect x="340" y="0" width="4" height="50"/>
    <rect x="350" y="0" width="11" height="50"/>
    <rect x="368" y="0" width="6" height="50"/>
    <rect x="380" y="0" width="14" height="50"/>
    <rect x="401" y="0" width="4" height="50"/>
    <rect x="411" y="0" width="9" height="50"/>
    <rect x="426" y="0" width="11" height="50"/>
    <rect x="444" y="0" width="6" height="50"/>
  </g>
  <text x="300" y="700" text-anchor="middle" fill="%2371717a" font-family="monospace" font-size="12" letter-spacing="3">danishsary4@gmail.com</text>
  <text x="300" y="755" text-anchor="middle" fill="%2352525b" font-family="monospace" font-size="11">PORTFOLIO 2026 • PHNOM PENH</text>
</svg>`;

/**
 * Creates a high-craft 2x retina Canvas PNG with Danish's authentic photo
 */
export function generateExecutiveBadgeWithPhoto(photoImage: HTMLImageElement): string {
  const width = 1200;
  const height = 1700;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 1. Base Obsidian Background with subtle vertical gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#161619");
  bgGrad.addColorStop(0.4, "#111113");
  bgGrad.addColorStop(1, "#0a0a0c");
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 0, 0, width, height, 72);
  ctx.fill();

  // 2. Outer Precision Gold Hairline Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(201, 151, 58, 0.45)";
  roundRect(ctx, 40, 40, width - 80, height - 80, 52);
  ctx.stroke();

  // 3. Top Lanyard Slot Cutout Indicator
  ctx.fillStyle = "#09090b";
  ctx.strokeStyle = "#3f3f46";
  ctx.lineWidth = 3;
  roundRect(ctx, width / 2 - 100, 48, 200, 28, 14);
  ctx.fill();
  ctx.stroke();

  // 4. Header: Executive Developer Pass
  ctx.textAlign = "center";
  ctx.fillStyle = "#c9973a";
  ctx.font = "bold 28px Geist, ui-monospace, SFMono-Regular, Menlo, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "6px";
  }
  ctx.fillText("DEVELOPER PORTFOLIO", width / 2, 170);

  ctx.fillStyle = "#71717a";
  ctx.font = "500 24px Geist, -apple-system, BlinkMacSystemFont, sans-serif";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "2px";
  }
  ctx.fillText("NORTON UNIVERSITY • ICT UTC+7", width / 2, 224);

  // Divider
  ctx.strokeStyle = "#27272a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 265);
  ctx.lineTo(width - 100, 265);
  ctx.stroke();

  // 5. Danish's Portrait Photo Centerpiece
  // 480x600 matches exactly 4:5 aspect ratio of Danish's 680x850 photo
  const photoW = 480;
  const photoH = 580;
  const photoX = (width - photoW) / 2;
  const photoY = 305;
  const photoRadius = 36;

  // Photo Frame Outer Bevel & Glow
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 15;

  ctx.fillStyle = "#18181b";
  roundRect(ctx, photoX - 10, photoY - 10, photoW + 20, photoH + 20, photoRadius + 8);
  ctx.fill();
  ctx.restore();

  // Outer Gold Border on Photo Frame
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(201, 151, 58, 0.75)";
  roundRect(ctx, photoX - 10, photoY - 10, photoW + 20, photoH + 20, photoRadius + 8);
  ctx.stroke();

  // Draw Clipped Photo
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.clip();

  // Calculate cover aspect ratio
  const imgAspect = (photoImage.naturalWidth || photoImage.width) / (photoImage.naturalHeight || photoImage.height);
  const frameAspect = photoW / photoH;
  let sW = photoImage.naturalWidth || photoImage.width;
  let sH = photoImage.naturalHeight || photoImage.height;
  let sx = 0;
  let sy = 0;

  if (imgAspect > frameAspect) {
    sW = (photoImage.naturalHeight || photoImage.height) * frameAspect;
    sx = ((photoImage.naturalWidth || photoImage.width) - sW) / 2;
  } else {
    sH = (photoImage.naturalWidth || photoImage.width) / frameAspect;
    sy = ((photoImage.naturalHeight || photoImage.height) - sH) / 2;
  }

  ctx.drawImage(photoImage, sx, sy, sW, sH, photoX, photoY, photoW, photoH);

  // Soft Vignette at bottom of photo to merge into dark card
  const vignette = ctx.createLinearGradient(0, photoY + photoH - 100, 0, photoY + photoH);
  vignette.addColorStop(0, "rgba(17, 17, 19, 0)");
  vignette.addColorStop(1, "rgba(17, 17, 19, 0.75)");
  ctx.fillStyle = vignette;
  ctx.fillRect(photoX, photoY + photoH - 100, photoW, 100);

  // Inner border highlight
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 2;
  roundRect(ctx, photoX + 1, photoY + 1, photoW - 2, photoH - 2, photoRadius - 1);
  ctx.stroke();
  ctx.restore();

  // Corner Security Accents
  drawCornerAccents(ctx, photoX - 10, photoY - 10, photoW + 20, photoH + 20, 24, "#c9973a");

  // Floating verified badge on photo corner
  ctx.fillStyle = "rgba(9, 9, 11, 0.92)";
  ctx.strokeStyle = "rgba(201, 151, 58, 0.65)";
  ctx.lineWidth = 2;
  roundRect(ctx, photoX + photoW - 145, photoY + photoH - 46, 135, 36, 18);
  ctx.fill();
  ctx.stroke();

  // Green status beacon inside the pill
  ctx.fillStyle = "#c9973a";
  ctx.beginPath();
  ctx.arc(photoX + photoW - 128, photoY + photoH - 28, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ededef";
  ctx.font = "bold 15px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "1px";
  }
  ctx.textAlign = "center";
  ctx.fillText("ICT UTC+7", photoX + photoW - 74, photoY + photoH - 23);

  // 6. Name & Role Typography (Impeccable optical scale)
  ctx.textAlign = "center";
  ctx.fillStyle = "#ededef";
  ctx.font = "bold 64px Geist, -apple-system, BlinkMacSystemFont, sans-serif";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "-1px";
  }
  ctx.fillText(PROFILE.name.toUpperCase(), width / 2, 955);

  ctx.fillStyle = "#c9973a";
  ctx.font = "600 30px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "1.5px";
  }
  ctx.fillText("Junior Web Developer", width / 2, 1010);

  ctx.fillStyle = "#a1a1aa";
  ctx.font = "500 26px Geist, -apple-system, BlinkMacSystemFont, sans-serif";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";
  }
  ctx.fillText("React • Laravel • PostgreSQL • REST", width / 2, 1060);

  // 7. Status pill: open to Web Developer roles
  const pillW = 540;
  const pillH = 64;
  const pillX = (width - pillW) / 2;
  const pillY = 1110;

  ctx.fillStyle = "#18181b";
  ctx.strokeStyle = "rgba(201, 151, 58, 0.65)";
  ctx.lineWidth = 2.5;
  roundRect(ctx, pillX, pillY, pillW, pillH, 32);
  ctx.fill();
  ctx.stroke();

  // Green status dot with aura
  ctx.fillStyle = "rgba(201, 151, 58, 0.25)";
  ctx.beginPath();
  ctx.arc(pillX + 42, pillY + 32, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#c9973a";
  ctx.beginPath();
  ctx.arc(pillX + 42, pillY + 32, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#c9973a";
  ctx.font = "bold 23px Geist, -apple-system, BlinkMacSystemFont, sans-serif";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.5px";
  }
  ctx.textAlign = "left";
  ctx.fillText("OPEN TO WEB DEVELOPER ROLES", pillX + 68, pillY + 40);

  // Divider
  ctx.strokeStyle = "#27272a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 1225);
  ctx.lineTo(width - 100, 1225);
  ctx.stroke();

  // 8. Contact handles
  ctx.textAlign = "left";
  ctx.fillStyle = "#71717a";
  ctx.font = "500 22px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "1px";
  }
  ctx.fillText("GITHUB", 140, 1285);

  ctx.fillStyle = "#ededef";
  ctx.font = "bold 34px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "1px";
  }
  ctx.fillText("danishsary8", 140, 1335);

  ctx.textAlign = "right";
  ctx.fillStyle = "#71717a";
  ctx.font = "500 22px Geist, ui-monospace, monospace";
  ctx.fillText("TELEGRAM", width - 140, 1285);

  ctx.fillStyle = "#c9973a";
  ctx.font = "bold 32px Geist, ui-monospace, monospace";
  ctx.fillText("@danishsary", width - 140, 1335);

  // 9. Precision Barcode
  drawBarcode(ctx, 140, 1385, width - 280, 85, "#c9973a");

  // Serial & Authority footer
  ctx.textAlign = "center";
  ctx.fillStyle = "#71717a";
  ctx.font = "500 24px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "6px";
  }
  ctx.fillText("danishsary4@gmail.com", width / 2, 1520);

  ctx.fillStyle = "#52525b";
  ctx.font = "500 20px Geist, ui-monospace, monospace";
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = "2px";
  }
  ctx.fillText("PHNOM PENH, CAMBODIA • PORTFOLIO 2026", width / 2, 1575);

  return canvas.toDataURL("image/png");
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number,
  color: string
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  const bars = [
    5, 3, 9, 3, 11, 5, 8, 13, 4, 9, 6, 15, 4, 8, 11, 5, 14, 6, 9, 4,
    13, 6, 8, 15, 5, 9, 4, 11, 6, 14, 4, 9, 11, 6, 8, 13, 5, 11, 4,
    9, 6, 14, 4, 8, 13, 6, 9, 15, 5, 11, 4, 8, 6, 14, 5, 9, 11, 6
  ];
  const total = bars.reduce((a, b) => a + b + 6, 0);
  const scale = width / total;

  ctx.fillStyle = color;
  let curX = x;
  for (const bar of bars) {
    const w = bar * scale;
    ctx.fillRect(curX, y, Math.max(2, w), height);
    curX += (bar + 6) * scale;
  }
}
