import { Request } from "express";
import { ValidationError } from "express-validator";

/**
 * Add a validation error to the provided errors array.
 * @param errors The list of errors to append to.
 * @param paramName The parameter that was being validated when the error occured.
 * @param paramValue The value that caused the validation error.
 * @param msg The error that occured.
 * @returns The updated `errors` array
 */
export function addBodyValidationError(
    errors: ValidationError[],
    paramName: string,
    paramValue: string,
    msg: string
) {
    errors.push({ location: "body", msg, param: paramName, value: paramValue });
    return errors;
}

/**
 * Validate the provided body parameter, setting the value to zero if not provided.
 * If a validation error occurs, then it will be added to provided errors array.
 * @param errors The list of errors to append to, if a validation error occurs.
 * @param req The request object for the API call.
 * @param prettyBodyParam The prettified version of the body parameter to validate.
 * @returns The updated errors array. This will only be different to the provided errors array
 * when a validation error occcurs.
 */
export function validateDefaultOfZero(
    errors: ValidationError[],
    req: Request,
    prettyBodyParam: string
): ValidationError[] {
    const bodyParam = prettyBodyParam
        .split(" ")
        .map((word, index) => (index === 0 ? word.toLowerCase() : word))
        .join("");
    const value = req.body[bodyParam];
    if (value === undefined) {
        req.body[bodyParam] = 0;
        return errors;
    }

    if (typeof value !== "number" || value < 0) {
        errors = addBodyValidationError(
            errors,
            bodyParam,
            value,
            `${prettyBodyParam} must be a positive integer (defaults to 0 when not param provided)`
        );
        return errors;
    }
    return errors;
}
