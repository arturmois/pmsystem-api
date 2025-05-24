import express from "express";
import User from "./model/User";
import { PORT } from "./config/env";
import authRoutes from "./router/authRoutes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  const user = User.create("john.doe@example.com", "password");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});