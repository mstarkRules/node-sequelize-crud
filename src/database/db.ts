import { Sequelize } from "sequelize";

export const db = new Sequelize("mysql-docker", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3306, //usa como int
});

async function test() {
  try {
    await db.authenticate();
    console.log("Conectado com sucesso.");
  } catch (error) {
    console.error("Houve falha ao conectar:", error);
  }
}

test();
