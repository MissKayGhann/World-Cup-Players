import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import ddbClientBuilder from "./ddbClient";

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

/**
 * Create a DynamoDB Document Client
 * @returns The created DynamoDB Document Client
 */
export default function ddbdClientBuilder() {
    return DynamoDBDocumentClient.from(ddbClientBuilder(), translateConfig);
}
