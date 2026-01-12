import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = z.treeifyError(error);

      console.log(error);

      res.status(400).json(formattedError);

      error.issues;
    }

    next(error);
  }
};

export default validate;
