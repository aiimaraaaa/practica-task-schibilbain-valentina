import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskTagModel = sequelize.define(
  "TaskTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tasks",
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tags",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);
