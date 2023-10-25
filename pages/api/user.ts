import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getUser(req, res);
    
    /* case 'POST':
      return await createUser(req, res);

    case 'DELETE':
      return await deleteUser(req, res);
    
    case 'PUT':
      return await updateUser(req, res); */

    default:
      return res.status(405).end();
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => { 
  // User sends get request
  // Request tries to get data from database
  // Database either accepts the request and responds with a user or responds with a rejection
  try {
    const user = await prisma.user.find({ // fetches data from Prisma based on user ID
      where: {
        id: req.query.id
      },
      data: {
        include: {
          // include employee/patient info
          EmployeeProfile: {
            include: {
              Patients: true
            }
          },
          PatientProfile: true,
        }
      }
    });
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({error});
  }
}

const createUser = async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userData: User = req.body;
    const user = await prisma.behavior.create({
      data: userData
    });
    return res.status(201).json(behavior);
  } catch (error) {
    return res.status(500).json({error});
  }
}

/* const createBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const behaviorData: Behavior = req.body;
    const behavior = await prisma.behavior.create({
      data: behaviorData
    });
    return res.status(201).json(behavior);
  } catch (error) {
    return res.status(500).json({ error }); 
  }
} */
