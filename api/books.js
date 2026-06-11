export default async function handler(req, res) {
  const { q, maxResults = 10, orderBy = 'relevance' } = req.query;

  if (!q) {
    return res.status(400).json({ error: "請提供搜尋關鍵字" });
  }

  try {
    // 🚨 把下面引號裡面的字，換成你剛剛申請到的 API Key！
    const MY_GOOGLE_API_KEY = "AIzaSyBDV_gPhW3mHfk2JYA30AMK8wU4HwqGXHA";

    // 關鍵：在網址最後面加上 &key=你的金鑰，正式向 Google 亮出通行證！
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=${maxResults}&orderBy=${orderBy}&langRestrict=zh-Hant&key=${MY_GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: "後端伺服器連線異常" });
  }
}
