# QuickTools.ai - API Documentation

## External APIs Used

### 1. Groq (Fast Text Generation)
- **Base URL:** `https://api.groq.com/openai/v1/chat/completions`
- **Models:** `llama3-8b-8192` (Fastest for basic tasks), `mixtral-8x7b-32768` (For complex writing).
- **Use Case:** AI Writer, Blog Generator.

### 2. OpenAI / Replicate (Image Generation)
- **Use Case:** AI Image Generator, Background Remover.
- **Method:** POST requests from Next.js server actions.

## Internal APIs (Next.js Route Handlers)

### `POST /api/tools/generate`
- **Body:** `{ "toolId": "string", "prompt": "string" }`
- **Response:** Streaming Server Sent Events (SSE).

### `GET /api/cron/auto-blog`
- **Header:** `Authorization: Bearer CRON_SECRET`
- **Action:** Fetches trends, writes blog via Groq, saves to DB.