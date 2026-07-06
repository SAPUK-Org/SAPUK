import { devData } from "../data/dev-data";
import { prodData } from "../data/prod-data";
import seed from "./seed";
import db from "../connection";

const runSeed = async () => {
  const data = process.env.NODE_ENV === "production" ? prodData : devData;
  await seed(data);
  await db.end();
};

runSeed();
