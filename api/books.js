// 這是你的專屬後端伺服器 (運行在 Vercel 雲端)
export default async function handler(req, res) {
  // 1. 接收前端網頁傳來的搜尋關鍵字 (q)
  const { q, maxResults = 10, orderBy = 'relevance' } = req.query;

  if (!q) {
    return res.status(400).json({ error: "請提供搜尋關鍵字" });
  }

  try {
    // 2. 伺服器代替網頁出面，去抓取 Google 的資料 (不受瀏覽器限制)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=${maxResults}&orderBy=${orderBy}&langRestrict=zh-Hant`;
    
    const response = await fetch(url);
    const data = await response.json();

    // 3. 設定安全標頭，並把乾淨的資料送回給前端網頁
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: "後端伺服器連線異常" });
  }
}
