// // pages/api/behaviors.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import  prisma  from '../../lib/prisma';
// import { Behavior } from '@prisma/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;
//   switch(method) {
//     case 'POST':
//       return await createBehavior(req, res);

//     case 'DELETE':
//       return await deleteBehavior(req, res);

//     case 'PUT':
//       return await updateBehavior(req, res);

//     default:
//       return res.status(405).end();

//   }

// }

// const createBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const behaviorData: Behavior = req.body;
//     const behavior = await prisma.behavior.create({
//       data: {
//         name: behaviorData.name,
//         description: behaviorData.description,
//         datatype: behaviorData.datatype,
//         trialsPerEntry: null,
//         entries: [],
//         tags: []
//       },
//     });
//     return res.status(201).json(behavior);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

// const deleteBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     await prisma.behavior.delete({
//       where: { id: Number(id) }
//     });
//     return res.status(200).json({ message: `Behavior deleted successfully` });;
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

// const updateBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     const behaviorData: Behavior = req.body;
//     const updated = await prisma.behavior.update({
//       where: { id: Number(id) },
//       data: behaviorData
//     });
//     return res.status(200).json(updated);
//   } catch (error) {
//     return res.status(500).json({ error })
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Behavior } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return await createBehavior(req, res);

    case "DELETE":
      return await deleteBehavior(req, res);

    case "PUT":
      return await updateBehavior(req, res);

    case "GET":
      return await searchBehaviors(req, res);

    default:
      return res.status(405).end();
  }
}

const createBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const behaviorData: Behavior = req.body;
    const behavior = await prisma.behavior.create({
      data: behaviorData,
    });
    return res.status(201).json(behavior);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await prisma.behavior.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ message: `Behavior deleted successfully` });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateBehavior = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const behaviorData: Behavior = req.body;
    const updated = await prisma.behavior.update({
      where: { id: Number(id) },
      data: behaviorData,
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const searchBehaviors = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchParams, pageSize, cursor } = req.query;

  const whereClause = JSON.parse(searchParams as string).reduce(
    (acc, param) => {
      acc[param.field] = param.value;
      return acc;
    },
    {}
  );

  try {
    const behaviors = await prisma.behavior.findMany({
      where: whereClause,
      take: parseInt(pageSize as string, 10),
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { id: parseInt(cursor as string, 10) } : undefined,
      orderBy: { id: "asc" },
    });

    const nextCursor =
      behaviors.length === parseInt(pageSize as string, 10)
        ? behaviors[parseInt(pageSize as string, 10) - 1].id
        : null;

    return res.status(200).json({ behaviors, nextCursor });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
