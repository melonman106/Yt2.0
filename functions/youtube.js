export async function onRequestGet(context) {
  const apiKey = context.env.YOUTUBE_API_KEY;

  const url = new URL(context.request.url);
  const query = url.searchParams.get("q");
  const max = url.searchParams.get("max") || 20;

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiUrl =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet&type=video&maxResults=${max}` +
    `&q=${encodeURIComponent(query)}` +
    `&key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
