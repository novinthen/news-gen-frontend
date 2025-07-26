import React, { useState } from "react";

const CABANGS = [
  "KEPONG", "BATU", "WANGSA MAJU", "SEGAMBUT", "SETIAWANGSA", "TITIWANGSA",
  "BUKIT BINTANG", "LEMBAH PANTAI", "SEPUTEH", "CHERAS", "BANDAR TUN RAZAK", "PUTRAJAYA", "LABUAN"
];

function App() {
  const [articleUrl, setArticleUrl] = useState("");
  const [stance, setStance] = useState("PRO");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch("https://news-gen-backend.vercel.app/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleUrl, stance }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>News Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Article URL: </label>
          <input
            type="url"
            value={articleUrl}
            onChange={e => setArticleUrl(e.target.value)}
            required
            style={{ width: "80%" }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>Stance: </label>
          <select value={stance} onChange={e => setStance(e.target.value)}>
            <option value="PRO">PRO (Support Anwar Ibrahim)</option>
            <option value="ANTI">ANTI (Critical of Perikatan Nasional)</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      <hr />
      {results.length > 0 && (
        <div>
          <h3>Generated Content</h3>
          {results.map(({ cabang, facebook, tweet }, idx) => (
            <div key={cabang} style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc" }}>
              <strong>{idx + 1}. {cabang}</strong>
              <div><b>Facebook:</b> <span>{facebook}</span></div>
              <div><b>Tweet:</b> <span>{tweet}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
