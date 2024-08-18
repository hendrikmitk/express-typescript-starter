import express, { Request, Response, Router } from 'express';
import {
  query,
  matchedData,
  validationResult,
  ValidationChain,
} from 'express-validator';

const user: Router = express.Router();

const validationMiddleware: ValidationChain[] = [
  query('firstName').exists().withMessage('Parameter is required').trim(),
  query('lastName').exists().withMessage('Parameter is required').trim(),
  query('age')
    .exists()
    .withMessage('Parameter is required')
    .isNumeric()
    .withMessage('Value must be numeric'),
];

user.get('/', validationMiddleware, (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).send({
      code: res.statusCode,
      text: 'Unprocessable Content',
      message: 'Query parameter validation failed',
      data: result,
    });
  }

  const data = matchedData(req);

  return res.status(200).send({
    code: res.statusCode,
    text: 'OK',
    message: undefined,
    data: {
      fullName: data.firstName + ' ' + data.lastName,
      age: data.age,
    },
  });
});

export default user;
