import express from "express";
import cors from "cors";
import { teamsRouter } from "./routes";

const app = express();
app.use(express.json(), cors());

app.use("/teams", teamsRouter);

app.listen(5001, () => {
    console.log("Listening on port 5001");
});
