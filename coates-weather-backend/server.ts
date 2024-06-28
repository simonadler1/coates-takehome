import express from "express";
import weatherRoutes from "./routes/weatherRoutes";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());
app.use("/api/weather", weatherRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
