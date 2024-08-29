"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const area1Routes_1 = __importDefault(require("./routes/area1Routes"));
const area2Routes_1 = __importDefault(require("./routes/area2Routes"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const API_VERSION = 'v0';
app.use(`/api/${API_VERSION}`, area1Routes_1.default);
app.use(`/api/${API_VERSION}`, area2Routes_1.default);
const PORT = config_1.default.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=index.js.map