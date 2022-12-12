import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";
import { addBodyValidationError, isValidDate, validateDefaultOfZero } from "./helpers";

const validPlayerKeys = {
    required: ["name", "dob", "photo"],
    optional: ["goalsScored", "ownGoals", "assists", "yellowCards", "redCards", "manOfMatchCount"],
};

const teamParamsWithDefault = [
    "Wins",
    "Draws",
    "Losses",
    "Points",
    "Clean Sheets",
    "Total Goals Scored",
    "Total Goals Conceived",
    "Total Red Cards",
    "Total Yellow Cards",
];

/**
 * Validate the provided players (ensures players is a list of object with appropriate keys).
 * @param players The value provided in the body of the API call for the `players` key.
 * @returns The validation error, if there is one.
 */
function validatePlayers(players: any): string | undefined {
    const errMsg = "Players must be provided as an array of player objects for the team";

    // If players isn't an array, then it's invalid
    if (!Array.isArray(players)) return errMsg;

    for (let player of players) {
        // If the player isn't an object (as in {}) then it's invalid
        if (!(!!player && player.constructor === Object)) return errMsg;

        // If the player doesn't have 3-9 keys, then it's invalid
        const keys = Object.keys(player);
        if (keys.length < 3 || keys.length > 9) return errMsg;

        // If the player doesn't have all the required keys, then it's invalid
        for (let key of validPlayerKeys.required) {
            if (player[key] === undefined) return `Missing required key for a player: ${key}`;
        }

        // If the player has any keys not in validPlayerKeys, then it's invalid
        for (let key of Object.keys(player)) {
            const formattedValue =
                typeof player[key] === "string" ? `'${player[key]}'` : player[key];
            if (validPlayerKeys.required.includes(key)) {
                // Validate player's name
                if (key === "name" && typeof player[key] !== "string")
                    return `Invalid name for a player: ${formattedValue}`;
                // Validate player's dob
                else if (key === "dob" && !isValidDate(player[key]))
                    return `Invalid dob for a player: ${formattedValue}`;
                // Validate player's photo
                else if (key === "photo" && typeof player[key] !== "string")
                    return `Invalid photo for a player: ${formattedValue}`;
            } else if (validPlayerKeys.optional.includes(key)) {
                // Validate optional player attributes (e.g. goalsScored)
                if (
                    player[key] !== undefined &&
                    (typeof player[key] !== "number" || player[key] < 0)
                )
                    return `Invalid ${key} for a player: ${formattedValue}`;
            } else return `Invalid key for a player: '${key}'`;
        }
    }
}

/**
 * Validate the provided team information.
 * @param req The request object for the API call.
 * @param resp The response object for the API call.
 * @param next Method to call the next piece of middleware.
 */
export async function validateTeam(req: Request, resp: Response, next: NextFunction) {
    let validationErrors: ValidationError[] = [];

    const nation = req.body.nation;
    if (
        typeof nation !== "string" || // isn't a string
        !/^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/.test(nation) // isn't an uppercase letter followed by only lowercase letters
    )
        validationErrors = addBodyValidationError(
            validationErrors,
            "nation",
            nation,
            "Nation must be a valid title-case alpha-string"
        );

    const flag = req.body.flag;
    if (
        typeof flag !== "string" || // isn't a string
        // All flag files must conform to the above nation regex (but hypen instead of space), with a .png extension
        !/^[A-Z][a-z]+(?:-[A-Z][a-z]+)*.png$/.test(flag) // isn't a valid flag filename
    )
        validationErrors = addBodyValidationError(
            validationErrors,
            "flag",
            flag,
            "Flag must be a non-empty, title-case, hyphenated string, ending with .png"
        );

    const fifaCode = req.body.fifaCode;
    if (
        typeof fifaCode !== "string" || // isn't a string
        !/^[A-Z]{3}$/.test(fifaCode) // isn't three uppercase letters
    )
        validationErrors = addBodyValidationError(
            validationErrors,
            "fifaCode",
            fifaCode,
            "Fifa Code must be a three-letter uppercase string"
        );

    for (let bodyParam of teamParamsWithDefault) {
        validationErrors = validateDefaultOfZero(validationErrors, req, bodyParam);
    }

    const players = req.body.players;
    const playerValidationError = validatePlayers(players);
    if (playerValidationError)
        validationErrors = addBodyValidationError(
            validationErrors,
            "players",
            players,
            playerValidationError
        );

    if (validationErrors.length !== 0) {
        // Validation error(s) occured, so respond to the
        // API call with a 400 Bad Request, along with error(s)
        resp.status(400).json(validationErrors);
    } else {
        // No errors, so continue to next middleware
        next();
    }
}
