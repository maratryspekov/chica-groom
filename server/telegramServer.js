// server/telegramServer.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// load environment variables from .env file
dotenv.config();

const app = express();

// so we can parse JSON in request body
app.use(express.json());

// CORS configuration - allow requests from Vercel and localhost
const corsOptions = {
  origin: [
    "https://chica-groom.vercel.app",
    "https://chica-groom-pixvbo5mw-marat-vodochkas-projects.vercel.app",
    /^https:\/\/chica-groom-.*\.vercel\.app$/,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("❌ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in .env");
}

// simple health check to see if server is alive
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// main endpoint where the form will send requests
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

      Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
            `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("Telegram URL:", url);

    // in Node 22 fetch is available globally
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
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
    💬 Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
            `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("Telegram URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
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
    💬 Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
            `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("Telegram URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});

console.log("Route /api/courses registered");
console.log("Route /api/franchise registered");

app.post("/api/practice", async (req, res) => {
  try {
    const data = req.body;

    const textMessage = `
    New Practice Application 📖

    👤 Name: ${data.name}
    📞 Phone: ${data.phone}
    📧 Email: ${data.email}
    📚 Package: ${data.practicePackage}
    💬 Privacy Consent: ${data.privacyConsent ? "Yes" : "No"}
            `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("Telegram URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});

console.log("Route /api/practice registered");

// endpoint for workplace rental
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

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});

console.log("Route /api/workplace registered");

// endpoint for job applications
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

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult);
      return res
        .status(500)
        .json({ ok: false, message: "Fehler beim Senden an Telegram" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ ok: false, message: "Serverfehler" });
  }
});

console.log("Route /api/jobs registered");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // Important for Railway

app.listen(PORT, HOST, () => {
  console.log(`✅ Telegram server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `TELEGRAM_BOT_TOKEN: ${TELEGRAM_BOT_TOKEN ? "✓ Set" : "✗ Not set"}`
  );
  console.log(`TELEGRAM_CHAT_ID: ${TELEGRAM_CHAT_ID ? "✓ Set" : "✗ Not set"}`);
});
