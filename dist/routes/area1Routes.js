"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const area1Controller_1 = require("../controllers/area1Controller");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.get('/area1/all/:userAccessLevel', authenticate_1.checkJwt, area1Controller_1.getAllArea1);
router.get('/area1/:id', authenticate_1.checkJwt, area1Controller_1.getArea1);
router.post('/area1', authenticate_1.checkJwt, area1Controller_1.createArea1);
router.put('/area1/:id', authenticate_1.checkJwt, area1Controller_1.updateArea1);
router.delete('/area1/:id', authenticate_1.checkJwt, area1Controller_1.deleteArea1);
exports.default = router;
//# sourceMappingURL=area1Routes.js.map