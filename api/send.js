export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, email } = req.body;

  try {
    const body = new URLSearchParams({
      username,
      email,
      locale: "en-SG",
      format: "json",
      id: Date.now().toString()
    });

    const response = await fetch(
      "https://sso.garena.com/api/send_register_code_email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Accept": "application/json, text/plain, */*",
          "Origin": "https://sso.garena.com",
          "Referer": "https://sso.garena.com/",
          "User-Agent": "Mozilla/5.0"
        },
        body
      }
    );

    const data = await response.text();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
