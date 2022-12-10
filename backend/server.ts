import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const port: unknown = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});