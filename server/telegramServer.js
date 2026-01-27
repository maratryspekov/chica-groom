// server/telegramServer.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

/**
 * 1) CORS MUST BE BEFORE express.json()
 * 2) Explicit OPTIONS handler fixes preflight issues
 */
const corsOptions = {
  origin: [
    "https://chica-groom.vercel.app",
    "https://chica-groom-pixvbo5mw-marat-vodochkas-projects.vercel.app",
    /^https:\/\/chica-groom-.*\.vercel\.app$/,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: false, // IMPORTANT: keep false unless you truly use cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight for all routes

// Parse JSON bodies
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("❌ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in env");
}

/**
 * Helper to send message to Telegram
 */
async function sendToTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram env vars missing");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  const result = await response.json();

  if (!result.ok) {
    console.error("Telegram error:", result);
    throw new Error("Telegram API returned not ok");
  }

  return result;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Booking
app.post("/api/booking", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Booking from Website:

👤 Owner: ${data.ownerName}
📧 Email: ${data.email}
📞 Phone: ${data.phone}

🐶 Dog:
- Name: ${data.dogName}
- Breed: ${data.dogBreed}
- Weight: ${data.dogWeight} kg
- Age: ${data.dogAge} years

📦 Selected Package: ${data.servicePackage}

✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/booking:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/booking registered");

// Courses
app.post("/api/courses", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Course Registration 🎓

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
📚 Course Package: ${data.coursePackage}
✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/courses:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/courses registered");

// Franchise
app.post("/api/franchise", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Franchise Inquiry 🏪

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
📦 Package: ${data.franchisePackage}
✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/franchise:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/franchise registered");

// Practice
app.post("/api/practice", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Practice Application 📖

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
📚 Package: ${data.practicePackage}
✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/practice:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/practice registered");

// Workplace
app.post("/api/workplace", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Workplace Rental Request 💼

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
📦 Package: ${data.rentalPackage}
${data.message ? `💬 Message: ${data.message}` : ""}
✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/workplace:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/workplace registered");

// Jobs
app.post("/api/jobs", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
New Job Application 💼

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
💼 Position: ${data.position}
📅 Experience: ${data.experience}
${data.message ? `💬 Message: ${data.message}` : ""}
✅ Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
`.trim();

    await sendToTelegram(textMessage);
    res.json({ ok: true });
  } catch (error) {
    console.error("Server error /api/jobs:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});
console.log("Route /api/jobs registered");

/**
 * Railway: MUST listen on process.env.PORT
 */
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `TELEGRAM_BOT_TOKEN: ${TELEGRAM_BOT_TOKEN ? "✓ Set" : "✗ Not set"}`
  );
  console.log(`TELEGRAM_CHAT_ID: ${TELEGRAM_CHAT_ID ? "✓ Set" : "✗ Not set"}`);
});
