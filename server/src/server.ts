import express from "express";
import { teamsRouter } from "./routes";
import {
    fetchNationToIdMapping,
    fetchPlayerNamesAndTeams,
    fetchAndStorePlayerPhotos,
    fetchPlayerToIdMapping,
} from "./api";
import { Nation, Player, PlayerName } from "./api/types";
const app = express();
app.use(express.json());

app.use("/teams", teamsRouter);

app.listen(5001, async () => {
    let [nations, nationToPlayerNames] = (await fetchPlayerNamesAndTeams()) as [
        Set<Nation>,
        Record<Nation, PlayerName[]>
    ];

    const nationToId = await fetchNationToIdMapping(nations);
    const nationToPlayers: Record<Nation, Player[]> = await fetchPlayerToIdMapping(
        nationToId,
        nationToPlayerNames
    );
    await fetchAndStorePlayerPhotos(nationToPlayers);

    console.log("Listening on port 5001");
});
