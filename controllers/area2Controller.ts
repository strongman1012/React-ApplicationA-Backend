import { Request, Response } from 'express';
import sql from '../config/db';

// Get all area2
export const getAllArea2 = async (req: Request, res: Response) => {
    const { userAccessLevel } = req.params;
    const level = parseInt(userAccessLevel, 10);
    try {
        let editable: boolean;
        if (level >= 1 && level < 5)
            editable = true;
        else
            editable = false;
        const result = await sql(`SELECT * FROM area_2 WHERE level >= @level`, { level });
        res.status(200).json({ result: result, editable: editable });
    } catch (err) {
        console.error('Error fetching areas:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific area2 by ID
export const getArea2 = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await sql('SELECT * FROM area_2 WHERE id = @id', { id });

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

// Create a new area2
export const createArea2 = async (req: Request, res: Response) => {
    const { subject, content, level } = req.body;

    if (!subject) {
        return res.status(400).json({ message: "Subject is required" });
    }

    try {
        const result = await sql('INSERT INTO area_2 (subject, content, level) VALUES (@subject, @content, @level)', { subject, content, level });

        if (result && result.length > 0) {
            const insertedArea = await sql('SELECT * FROM area_2 ORDER BY id DESC');
            res.status(201).json({ message: 'Area created successfully', area: insertedArea?.[0] });
        } else {
            res.status(400).json({ message: 'Error creating area' });
        }
    } catch (err) {
        console.error('Error creating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing area2
export const updateArea2 = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { subject, content, level } = req.body;

    if (!subject) {
        return res.status(400).json({ message: "subject is required" });
    }
    try {
        const result = await sql('UPDATE area_2 SET subject = @subject, content = @content, level = @level WHERE id = @id', { id, subject, content, level });

        if (result && result.length > 0) {
            const updatedArea = await sql('SELECT * FROM area_2 WHERE id=@id', { id });
            res.status(200).json({ message: 'Area updated successfully', area: updatedArea?.[0] });
        } else {
            res.status(404).json({ message: 'Area not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating area:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete area2
export const deleteArea2 = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await sql(`DELETE FROM area_2 WHERE id=@id`, { id });

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
