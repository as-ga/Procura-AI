import app from "@/app";
const env = { PORT: 8000 };

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
