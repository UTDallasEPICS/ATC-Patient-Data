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
    // not been tested yet
    // case 'user':
    //   return await getUser(req, res);

    case 'behavior':
      if ('id' in req.query) {
        return await getBehaviorById(req, res);
      } else {
        return await getBehaviors(req, res);
      }

    // has not been tested yet
    // case 'program':
    //   if ('id' in req.query) {
    //     return await getPrograms(req, res);
    //   } else {
    //     return await getProgramById(req, res);
    // }

    // has not been tested yet
    // case 'report':
    //   return getReports(req, res);

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


// const getPrograms = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const programs = await prisma.program.findMany();
//     return res.status(200).json(programs);
//   } catch (error) {
//     return res.status(500).json({error});
//   }
// }

// const getProgramById = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     const program = await prisma.program.findUnique({
//       where: { id: Number(id) }
//     });
//     return res.status(200).json(program);
//   } catch (error) {
//     return res.status(500).json({error}); 
//   }
// }

// const getReports = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.query.id) {
//       const report = await prisma.report.findUnique({
//         where: { id: req.query.id as string },
//       });
//       return res.status(200).json(report);
//     } else {
//       const reports = await prisma.report.findMany();
//       return res.status(200).json(reports);
//     }
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     const user = await prisma.user.findFirst({
//       where: { id: Number(id) },
//       data: {
//         include: {
          // include employee/patient info
//           EmployeeProfile: {
//             include: {
//               Patients: true
//             }
//           },
//           StudentProfile: true,
//         }
//       }
//     });
//     return res.status(200).json(user);

//   } catch (error) {
//     return res.status(500).json({error});
//   }
// }