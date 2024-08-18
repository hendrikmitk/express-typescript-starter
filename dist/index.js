"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(404).send({
        code: res.statusCode,
        text: 'Not Found',
        message: undefined,
        data: undefined,
    });
});
app.use('/user', user_1.default);
app.listen(port, () => {
    console.log(`[SERVER] Server is running at http://localhost:${port}`);
});
