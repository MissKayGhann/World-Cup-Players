import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const REGION = "eu-west-2";

export default function ddbClientBuilder() {
    if (process.env.ACCESS_KEY_ID === undefined || process.env.SECRET_ACCESS_KEY === undefined)
        throw new Error("Failed to load AWS credentials from .env file.");
    return new DynamoDBClient({
        region: REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
    });
}
