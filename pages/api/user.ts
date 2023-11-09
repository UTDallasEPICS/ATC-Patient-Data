import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { User, Behavior } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch ( req.method ) {
    case 'GET':
      return await getUser(req, res);
  
    case 'POST':
      return await createUser(req, res);

    case 'DELETE':
      return await deleteUser(req, res);
    
    case 'PUT':
      return await updateUser(req, res); 

    default:
      return res.status(405).end();
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
        OR: [
          {
            StudentProfile: {
              isNot: null
            }
          },
          {
            EmployeeProfile: {
              isNot: null
            }
          }
        ]
      },
      include: {
        StudentProfile: true,
        EmployeeProfile: true
      }
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({error});
  }
}


const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
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

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
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

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
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