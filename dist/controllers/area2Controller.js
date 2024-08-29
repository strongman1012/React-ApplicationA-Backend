"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArea2 = exports.updateArea2 = exports.createArea2 = exports.getArea2 = exports.getAllArea2 = void 0;
const db_1 = __importDefault(require("../config/db"));
// Get all area2
const getAllArea2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAccessLevel } = req.params;
    const level = parseInt(userAccessLevel, 10);
    try {
        let editable;
        if (level >= 1 && level < 5)
            editable = true;
        else
            editable = false;
        const result = yield (0, db_1.default)(`SELECT * FROM area_2 WHERE level >= @level`, { level });
        res.status(200).json({ result: result, editable: editable });
    }
    catch (err) {
        console.error('Error fetching areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllArea2 = getAllArea2;
// Get a specific area2 by ID
const getArea2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.default)('SELECT * FROM area_2 WHERE id = @id', { id });
        if (result && result.length > 0) {
            res.status(200).json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Area not found' });
        }
    }
    catch (err) {
        console.error('Error fetching area:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getArea2 = getArea2;
// Create a new area2
const createArea2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, content, level } = req.body;
    if (!subject) {
        return res.status(400).json({ message: "Subject is required" });
    }
    try {
        const result = yield (0, db_1.default)('INSERT INTO area_2 (subject, content, level) VALUES (@subject, @content, @level)', { subject, content, level });
        if (result && result.length > 0) {
            const insertedArea = yield (0, db_1.default)('SELECT * FROM area_2 ORDER BY id DESC');
            res.status(201).json({ message: 'Area created successfully', area: insertedArea === null || insertedArea === void 0 ? void 0 : insertedArea[0] });
        }
        else {
            res.status(400).json({ message: 'Error creating area' });
        }
    }
    catch (err) {
        console.error('Error creating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createArea2 = createArea2;
// Update an existing area2
const updateArea2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { subject, content, level } = req.body;
    if (!subject) {
        return res.status(400).json({ message: "subject is required" });
    }
    try {
        const result = yield (0, db_1.default)('UPDATE area_2 SET subject = @subject, content = @content, level = @level WHERE id = @id', { id, subject, content, level });
        if (result && result.length > 0) {
            const updatedArea = yield (0, db_1.default)('SELECT * FROM area_2 WHERE id=@id', { id });
            res.status(200).json({ message: 'Area updated successfully', area: updatedArea === null || updatedArea === void 0 ? void 0 : updatedArea[0] });
        }
        else {
            res.status(404).json({ message: 'Area not found or no changes made' });
        }
    }
    catch (err) {
        console.error('Error updating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateArea2 = updateArea2;
// Delete area2
const deleteArea2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.default)(`DELETE FROM area_2 WHERE id=@id`, { id });
        if ((result === null || result === void 0 ? void 0 : result[0]) > 0) {
            res.status(200).json({ message: 'Area deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Area not found' });
        }
    }
    catch (err) {
        console.error('Error deleting areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteArea2 = deleteArea2;
//# sourceMappingURL=area2Controller.js.map