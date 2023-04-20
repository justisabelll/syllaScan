// pages/api/deleteSyllabus.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { syllabusId } = req.body;

  if (req.method === 'DELETE') {
    try {
      await prisma.syllabi.delete({
        where: {
          Syllabi_ID: syllabusId,
        },
      });

      res.status(200).json({ message: 'Syllabus deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the syllabus.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
};
