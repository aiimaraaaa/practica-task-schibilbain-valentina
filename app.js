import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
