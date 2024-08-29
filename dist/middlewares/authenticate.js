"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_1 = require("../config/jwt");
const checkJwt = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        if (decoded)
            next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=authenticate.js.map