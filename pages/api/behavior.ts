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
    // Setting the status of a response itself does not send the response in NextJS, so here msg has been attached for the response to be properly sent
    return res.status(200).json({ message: `Behavior with ID ${id} deleted successfully` });
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
