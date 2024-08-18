"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user = express_1.default.Router();
const validationMiddleware = [
    (0, express_validator_1.query)('firstName').exists().withMessage('Parameter is required').trim(),
    (0, express_validator_1.query)('lastName').exists().withMessage('Parameter is required').trim(),
    (0, express_validator_1.query)('age')
        .exists()
        .withMessage('Parameter is required')
        .isNumeric()
        .withMessage('Value must be numeric'),
];
user.get('/', validationMiddleware, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(422).send({
            code: res.statusCode,
            text: 'Unprocessable Content',
            message: 'Query parameter validation failed',
            data: result,
        });
    }
    const data = (0, express_validator_1.matchedData)(req);
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
exports.default = user;
