import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await search(req, res);

    default:
      return res.status(405).end();
  }
}

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query
  // TODO: get where and data to select (from request body)
  // TODO: perform search and return with pagination cursor
  // TODO: switch on type to determine which search function to use
  res.json([])
}