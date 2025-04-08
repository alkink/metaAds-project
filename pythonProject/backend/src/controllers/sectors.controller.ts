import { Request, Response } from 'express';
import { getSectorsList } from '../services/sectors.service';

/**
 * Get all sectors
 * @route GET /api/v1/sectors
 */
export const getSectors = async (req: Request, res: Response) => {
  try {
    const sectors = await getSectorsList();
    res.json(sectors);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    res.status(500).json({ message: 'Error fetching sectors' });
  }
}; 