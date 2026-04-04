# Portfolio Website — Ment

เว็บไซต์ Portfolio แสดงผลงานด้านการพัฒนาเว็บไซต์และ LINE Chatbot

## โครงสร้างไฟล์

```
portfolio/
├── index.html          ← Main HTML (single page)
├── css/
│   └── styles.css      ← All styles (CSS Variables + Media Queries)
├── js/
│   ├── main.js         ← Navigation, scroll, animations, modal logic
│   └── data.js         ← Project data (แก้ไขที่นี่เพื่อเพิ่ม/ลบโปรเจค)
├── images/
│   ├── profile.jpg     ← รูปโปรไฟล์
│   ├── line-qr.png     ← LINE QR Code
│   └── projects/       ← รูป screenshot โปรเจค
├── CNAME               ← Custom domain (GitHub Pages)
└── README.md
```

## วิธีเพิ่ม/แก้ไขโปรเจค

แก้ไขไฟล์ `js/data.js` เท่านั้น ไม่ต้องแตะไฟล์อื่น:

```js
{
  id: 5,
  title: "ชื่อโปรเจค",
  category: "website",   // "website" หรือ "chatbot"
  description: "คำอธิบายสั้น (แสดงบน card)",
  fullDescription: "คำอธิบายยาว (แสดงใน modal)",
  thumbnail: "images/projects/project5-thumb.jpg",
  images: ["images/projects/project5-1.jpg"],
  emoji: "🚀",
  gradient: "linear-gradient(135deg, #667eea, #764ba2)",
  tags: ["HTML", "CSS", "JavaScript"],
  liveUrl: "https://example.com",
  year: "2026"
}
```

## Deploy บน GitHub Pages

1. Push ไฟล์ทั้งหมดขึ้น `main` branch
2. Settings → Pages → Source: main / (root)
3. เว็บจะอยู่ที่ `username.github.io/portfolio`
