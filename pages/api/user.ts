import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch ( req.method ) {
    case 'GET':
      return await getUser(req, res);
  
    // case 'POST':
    //   return await createUser(req, res);

    // case 'DELETE':
    //   return await deleteUser(req, res);
    
    // case 'PUT':
    //   return await updateUser(req, res); 

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