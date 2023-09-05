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
  try {
    const user = await prisma.user.find({
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
