import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await search(req, res);
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
  switch (type) {
    case 'behavior':
      if ('id' in req.query) {
        return await getBehaviorById(req, res);
      } else {
        return await getBehaviors(req, res);
      }
  }
  res.json([])
}

const getBehaviors = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const behaviors = await prisma.behavior.findMany();
    return res.status(200).json(behaviors); 
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getBehaviorById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const behavior = await prisma.behavior.findUnique({
      where: { id: Number(id) }
    });
    return res.status(200).json(behavior);
  } catch (error) {
    return res.status(500).json({ error });
  }
}