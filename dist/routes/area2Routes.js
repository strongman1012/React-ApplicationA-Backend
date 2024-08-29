"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const area2Controller_1 = require("../controllers/area2Controller");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.get('/area2/all/:userAccessLevel', authenticate_1.checkJwt, area2Controller_1.getAllArea2);
router.get('/area2/:id', authenticate_1.checkJwt, area2Controller_1.getArea2);
router.post('/area2', authenticate_1.checkJwt, area2Controller_1.createArea2);
router.put('/area2/:id', authenticate_1.checkJwt, area2Controller_1.updateArea2);
router.delete('/area2/:id', authenticate_1.checkJwt, area2Controller_1.deleteArea2);
exports.default = router;
//# sourceMappingURL=area2Routes.js.map