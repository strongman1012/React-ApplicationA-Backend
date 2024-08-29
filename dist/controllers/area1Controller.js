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
exports.deleteArea1 = exports.updateArea1 = exports.createArea1 = exports.getArea1 = exports.getAllArea1 = void 0;
const db_1 = __importDefault(require("../config/db"));
// Get all area1
const getAllArea1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAccessLevel } = req.params;
    const level = parseInt(userAccessLevel, 10);
    try {
        let editable;
        if (level >= 1 && level < 5)
            editable = true;
        else
            editable = false;
        const result = yield (0, db_1.default)(`SELECT * FROM area_1 WHERE level >= @level`, { level });
        res.status(200).json({ result: result, editable: editable });
    }
    catch (err) {
        console.error('Error fetching areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllArea1 = getAllArea1;
// Get a specific area1 by ID
const getArea1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.default)('SELECT * FROM area_1 WHERE id = @id', { id });
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
exports.getArea1 = getArea1;
// Create a new area1
const createArea1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, level } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const result = yield (0, db_1.default)('INSERT INTO area_1 (title, description, level) VALUES (@title, @description, @level)', { title, description, level });
        if (result && result.length > 0) {
            const insertedArea = yield (0, db_1.default)('SELECT * FROM area_1 ORDER BY id DESC');
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
exports.createArea1 = createArea1;
// Update an existing area1
const updateArea1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, level } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const result = yield (0, db_1.default)('UPDATE area_1 SET title = @title, description = @description, level = @level WHERE id = @id', { id, title, description, level });
        if (result && result.length > 0) {
            const updatedArea = yield (0, db_1.default)('SELECT * FROM area_1 WHERE id=@id', { id });
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
exports.updateArea1 = updateArea1;
// Delete area1
const deleteArea1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.default)(`DELETE FROM area_1 WHERE id=@id`, { id });
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
exports.deleteArea1 = deleteArea1;
//# sourceMappingURL=area1Controller.js.map