import express, { Request,Response } from "express";
import connectDB from "./config/database";
import userRoutes from "./routes/Users.routes";
import authRoutes from "./auth/auth.routes";
import { authMiddleware } from "./auth/auth.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/v1",authMiddleware, userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});