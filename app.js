import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";

import { UserModel } from "./src/models/user.model.js";
import { TaskModel } from "./src/models/task.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { TaskTagModel } from "./src/models/tasktag.model.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);

UserModel.hasMany(TaskModel, { foreignKey: "userId", as: "tareas" });
TaskModel.belongsTo(UserModel, { foreignKey: "userId", as: "usuario" });
UserModel.hasOne(ProfileModel, { foreignKey: "userId", as: "perfil" });
ProfileModel.belongsTo(UserModel, { foreignKey: "userId", as: "usuario" });
TaskModel.belongsToMany(TagModel, {
  through: TaskTagModel,
  foreignKey: "taskId",
  as: "etiquetas",
});
TagModel.belongsToMany(TaskModel, {
  through: TaskTagModel,
  foreignKey: "tagId",
  as: "tareas",
});

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
