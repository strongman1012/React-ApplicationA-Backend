import { Request, Response } from 'express';
import sql from '../config/db';

// Get all area1
export const getAllArea1 = async (req: Request, res: Response) => {
    const { userAccessLevel } = req.params;
    const level = parseInt(userAccessLevel, 10);
    try {
        let editable: boolean;
        if (level >= 1 && level < 5)
            editable = true;
        else
            editable = false;
        const result = await sql(`SELECT * FROM area_1 WHERE level >= @level`, { level });
        res.status(200).json({ result: result, editable: editable });
    } catch (err) {
        console.error('Error fetching areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific area1 by ID
export const getArea1 = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await sql('SELECT * FROM area_1 WHERE id = @id', { id });

        if (result && result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Area not found' });
        }
    } catch (err) {
        console.error('Error fetching area:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new area1
export const createArea1 = async (req: Request, res: Response) => {
    const { title, description, level } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const result = await sql('INSERT INTO area_1 (title, description, level) VALUES (@title, @description, @level)', { title, description, level });

        if (result && result.length > 0) {
            const insertedArea = await sql('SELECT * FROM area_1 ORDER BY id DESC');
            res.status(201).json({ message: 'Area created successfully', area: insertedArea?.[0] });
        } else {
            res.status(400).json({ message: 'Error creating area' });
        }
    } catch (err) {
        console.error('Error creating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing area1
export const updateArea1 = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, level } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const result = await sql('UPDATE area_1 SET title = @title, description = @description, level = @level WHERE id = @id', { id, title, description, level });

        if (result && result.length > 0) {
            const updatedArea = await sql('SELECT * FROM area_1 WHERE id=@id', { id });
            res.status(200).json({ message: 'Area updated successfully', area: updatedArea?.[0] });
        } else {
            res.status(404).json({ message: 'Area not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete area1
export const deleteArea1 = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await sql(`DELETE FROM area_1 WHERE id=@id`, { id });

        if (result?.[0] > 0) {
            res.status(200).json({ message: 'Area deleted successfully' });
        } else {
            res.status(404).json({ message: 'Area not found' });
        }
    } catch (err) {
        console.error('Error deleting areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
