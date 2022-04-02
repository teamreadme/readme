//https://github.com/codecoolture/next-joi/blob/trunk/src/index.ts
import { Schema, ValidationError } from "@hapi/joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextHandler, RequestHandler } from "next-connect";
import "joi-extract-type";

export type ValidableRequestFields = Pick<NextApiRequest, "body" | "headers" | "query">;

export type ValidationSchemas = {
  [K in keyof ValidableRequestFields]?: Schema;
};

export type ValidationFunction = (schemas: ValidationSchemas, handler?: NextApiHandler) => NextApiHandler | RequestHandler<NextApiRequest, NextApiResponse>;

export type OnValidationError = (req: NextApiRequest, res: NextApiResponse, error: ValidationError) => void | Promise<void>;

export type Configuration = { onValidationError: OnValidationError };

const onValidationError: OnValidationError = (_, res, error: ValidationError) => {
    console.log(error)
  let errorMessage = error?.details.map(({ message }) => message).join(", ");
  console.log(errorMessage);
  res.status(422).json({ error: errorMessage });
};
export default function withJoi(schemas: ValidationSchemas, handler?: NextApiHandler): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse, next?: NextHandler) => {
    const fields: (keyof ValidableRequestFields)[] = ["body", "headers", "query"];

    const validationError = fields.reduce<ValidationError | undefined>((error, field) => {
      if (undefined !== error) {
        return error;
      }

      const schema = schemas[field];

      return schema && schema.required().validate(req[field]).error;
    }, undefined);

    if (undefined != validationError) {
        console.log(validationError)
      return onValidationError(req, res, validationError);
    }

    if (undefined !== next) {
      return next();
    }

    if (undefined !== handler) {
      return handler(req, res);
    }

    res.status(404).end();
  };
}
