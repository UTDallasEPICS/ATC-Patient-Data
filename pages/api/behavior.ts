// pages/api/behaviors.ts

import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../lib/prisma';
import { Behavior } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch(method) {
    case 'POST':
      return await createBehavior(req, res);

    case 'DELETE':
      return await deleteBehavior(req, res);

    case 'PUT':
      return await updateBehavior(req, res);

    default:  
      return res.status(405).end();

  }

}

const createBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const behaviorData: Behavior = req.body;
    const behavior = await prisma.behavior.create({
      data: {
        name: behaviorData.name,
        description: behaviorData.description,
        datatype: behaviorData.datatype,
        trialsPerEntry: null, 
        entries: [], 
        tags: []
      },
    });
    return res.status(201).json(behavior);
  } catch (error) {
    return res.status(500).json({ error }); 
  }
} 

const deleteBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await prisma.behavior.delete({
      where: { id: Number(id) }
    });
    return res.status(200).json({ message: `Behavior deleted successfully` });;
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const updateBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const behaviorData: Behavior = req.body;
    const updated = await prisma.behavior.update({
      where: { id: Number(id) },
      data: behaviorData
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error })
  }
}
