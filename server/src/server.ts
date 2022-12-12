import express from "express";
import { teamsRouter } from "./routes";

const app = express();
app.use(express.json());

app.use("/", teamsRouter);

app.listen(5001, () => {
    console.log("Listening on port 5001");
});
