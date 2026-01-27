// server/telegramServer.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "https://chica-groom.vercel.app",
    "https://chica-groom-pixvbo5mw-marat-vodochkas-projects.vercel.app",
    /^https:\/\/chica-groom-.*\.vercel\.app$/,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: false, // cookie не используешь — значит false
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // ✅ вместо "*" — иначе сервер падает

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("❌ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in env");
}

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

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

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

/**
 * Railway MUST use process.env.PORT
 */
const PORT = process.env.PORT;
if (!PORT) console.error("❌ PORT is not set by Railway");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on 0.0.0.0:${PORT}`);
});
