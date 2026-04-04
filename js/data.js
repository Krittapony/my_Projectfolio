// =============================================================
// data.js — Project Data
// แก้ไขไฟล์นี้เพื่อเพิ่ม / ลบ / แก้ไขโปรเจค
// ไม่ต้องแตะ index.html หรือ main.js
// =============================================================
//
// คำอธิบาย fields:
//   id              : ตัวเลข unique ของโปรเจค
//   title           : ชื่อโปรเจค
//   category        : "website" หรือ "chatbot"
//   description     : คำอธิบายสั้น (แสดงบน card, max 2 บรรทัด)
//   fullDescription : คำอธิบายยาว (แสดงใน modal)
//   images          : array ของ path รูปภาพ (รองรับหลายรูป, ทุกอัตราส่วน)
//                     ถ้าไม่มีรูปให้ใส่ [] → ระบบใช้ gradient + emoji แทน
//   emoji           : emoji แสดงแทนรูป (ใช้เมื่อ images = [])
//   gradient        : CSS gradient สำหรับ placeholder (ใช้เมื่อ images = [])
//   tags            : array ของ technology tags
//   showLiveUrl     : true  = แสดงปุ่ม "ดูเว็บไซต์จริง" ใน modal
//                     false = ซ่อนปุ่ม (โปรเจคที่ไม่สามารถโชว์สาธารณะได้)
//   liveUrl         : URL เว็บไซต์จริง (ใช้เมื่อ showLiveUrl: true)
//   year            : ปีที่ทำ

var projects = [
  {
    id: 1,
    title: "ระบบจองคิวออนไลน์",
    category: "website",
    description: "ระบบจองคิวออนไลน์สำหรับคลินิกและสปา รองรับการแจ้งเตือนอัตโนมัติและการจัดการตารางนัด",
    fullDescription: "พัฒนาระบบจองคิวออนไลน์ที่ครบครัน สามารถกำหนดเวลาเปิด-ปิดบริการ จัดการ slot การจอง ส่ง reminder ทาง LINE และ Email อัตโนมัติ พร้อม admin dashboard สำหรับจัดการคิวแบบ real-time รองรับการใช้งานทั้ง Mobile และ Desktop",
    images: [],
    emoji: "🗓️",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    showLiveUrl: true,
    liveUrl: "https://example.com",
    year: "2026"
  },
  {
    id: 2,
    title: "LINE Chatbot ร้านอาหาร",
    category: "chatbot",
    description: "Chatbot สำหรับร้านอาหาร รับออร์เดอร์ผ่าน LINE OA จัดการเมนูและแจ้งสถานะออร์เดอร์แบบ Real-time",
    fullDescription: "LINE Chatbot สำหรับธุรกิจร้านอาหาร รองรับการดูเมนู เลือกสินค้า ชำระเงินผ่าน PromptPay และ LINE Pay แสดงสถานะออร์เดอร์แบบ real-time ช่วยลดภาระพนักงานและเพิ่มยอดขายได้อย่างมีประสิทธิภาพ",
    images: [],
    emoji: "🍜",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    tags: ["LINE API", "Node.js", "Dialogflow", "Firebase"],
    showLiveUrl: false,
    liveUrl: "",
    year: "2025"
  },
  {
    id: 3,
    title: "เว็บไซต์ร้านค้า E-Commerce",
    category: "website",
    description: "ร้านค้าออนไลน์ครบวงจร พร้อมระบบตะกร้าสินค้า ชำระเงิน และจัดการ order สำหรับ SME",
    fullDescription: "เว็บไซต์ E-Commerce สำหรับ SME ไทย รองรับการแสดงสินค้าหลายหมวดหมู่ ตะกร้าสินค้า ระบบชำระเงินผ่าน QR Code และบัตรเครดิต พร้อม admin panel จัดการสต็อกและออร์เดอร์ รองรับทั้ง Mobile และ Desktop",
    images: [],
    emoji: "🛒",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    tags: ["HTML", "CSS", "JavaScript", "Payment API", "Node.js"],
    showLiveUrl: true,
    liveUrl: "https://example.com",
    year: "2025"
  },
  {
    id: 4,
    title: "LINE Chatbot นัดหมาย",
    category: "chatbot",
    description: "Chatbot จัดการนัดหมายผ่าน LINE สามารถดูตาราง จอง ยกเลิก และ sync กับ Google Calendar อัตโนมัติ",
    fullDescription: "LINE Chatbot สำหรับจัดการนัดหมายอัตโนมัติ ลูกค้าสามารถดูเวลาว่าง จองนัด และยกเลิกผ่าน LINE ได้ทันที ระบบ sync กับ Google Calendar ส่ง reminder อัตโนมัติ 24 ชม. ก่อนนัด ลดการ no-show ได้อย่างมีประสิทธิภาพ",
    images: [],
    emoji: "📅",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    tags: ["LINE API", "Google Calendar", "Node.js", "MongoDB"],
    showLiveUrl: false,
    liveUrl: "",
    year: "2026"
  }
];
