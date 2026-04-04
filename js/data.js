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
    title: "ระบบค้นหาและสรุป Ticket Jira ด้วย AI",
    category: "website",
    description: "ระบบค้นหาและสรุป Ticket ใน Jira ด้วย AI ช่วยให้ทีมพัฒนาสามารถเข้าใจเนื้อหาและสถานะของ Ticket ได้อย่างรวดเร็ว ลดเวลาในการจัดการงานและเพิ่มประสิทธิภาพการทำงาน",
    fullDescription: "พัฒนาระบบจัดการ Ticket ใน Jira โดยใช้ AI ในการค้นหาและสรุปข้อมูลจาก Ticket ต่างๆ ด้วยภาษาพูด ช่วยให้ทีมพัฒนาสามารถเข้าใจเนื้อหาและสถานะของ Ticket ได้อย่างรวดเร็ว ลดเวลาในการจัดการงานและเพิ่มประสิทธิภาพการทำงาน โดยระบบสามารถเชื่อมต่อกับ Jira API เพื่อดึงข้อมูล Ticket และใช้โมเดล AI ในการวิเคราะห์และสรุปข้อมูลที่สำคัญออกมาแสดงผลในรูปแบบที่เข้าใจง่าย",
    images: ["images/projects/jira_project_1.jpg", "images/projects/jira_project_2.jpg", "images/projects/jira_project_3.jpg", "images/projects/jira_project_4.jpg"],
    emoji: "🗓️",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    tags: ["HTML", "CSS", "Google app script", "Jira API", "Claude AI" , "Claude API"],
    showLiveUrl: false,
    liveUrl: "https://example.com",
    year: "2026"
  },
  {
    id: 2,
    title: "ระบบ Dashboard สรุปข้อมูลจาก Jira แสดงผลและส่งออกเข้า MS Teams",
    category: "website",
    description: "Dashboard สำหรับสรุปข้อมูลจาก Jira แสดงผลและส่งออกเข้า MS Teams",
    fullDescription: "Dashboard สำหรับสรุปข้อมูลจาก Jira แสดงผลในรูปแบบที่เข้าใจง่าย มี Heatmap แสดงจำนวน defect ชื่อคนรายงานระยะเวลาที่ defect เปิดอยู่ดูภาพรวมโครงการได้ง่าย รวมถึงและสามารถส่งออกข้อมูลเข้า MS Teams สามารถปรับแต่ง Query หรือข้อมูลที่จะส่งได้ตามต้องการ เช่น รายงาน defect ประจำวัน หรือรายงานโครงการ เพื่อให้ทีมงานสามารถเข้าถึงข้อมูลและประสิทธิภาพการทำงานได้อย่างรวดเร็ว",
    images: ["images/projects/Dashboard_jira_1.jpg", "images/projects/Dashboard_jira_2.jpg", "images/projects/Dashboard_jira_3.jpg", "images/projects/Dashboard_jira_4.jpg"],
    emoji: "📊",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    tags: ["Jira API", "HTML", "CSS", "Google app script", "MS Teams Webhook","MS autoflow"],
    showLiveUrl: false,
    liveUrl: "",
    year: "2025"
  },
  {
    id: 3,
    title: "LINE Chatbot สำหรับดูและสรุปตลาดหุ้นด้วย AI",
    category: "chatbot",
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
