// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case "GET":
//       return await search(req, res);
//     case "POST":
//       return await search(req, res);
//     default:
//       return res.status(405).end();
//   }
// }

// const search = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { type } = req.query;
//   // TODO: get where and data to select (from request body)
//   // TODO: perform search and return with pagination cursor
//   // TODO: switch on type to determine which search function to use
//   // switch (type) {
//   //   case "behavior":
//   //     if ("id" in req.query) {
//   //       return await getBehaviorById(req, res);
//   //     } else {
//   //       return await getBehaviors(req, res);
//   //     }
//   // }
//   res.json([]);
// };

// const getBehaviors = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const behaviors = await prisma.behavior.findMany();
//     return res.status(200).json(behaviors);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const getBehaviorById = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     const behavior = await prisma.behavior.findUnique({
//       where: { id: Number(id) },
//     });
//     return res.status(200).json(behavior);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     return await search(req, res);
//   } else {
//     return res.status(405).end(); // Method Not Allowed
//   }
// }

// const search = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { type, searchParams, pageSize, cursor } = req.body;

//   // Construct the where clause based on searchParams
//   const whereClause = searchParams.reduce((acc, param) => {
//     acc[param.field] = param.value;
//     return acc;
//   }, {});

//   try {
//     const results = await prisma[type].findMany({
//       where: whereClause,
//       take: pageSize,
//       skip: cursor ? 1 : undefined, // Skip the cursor if it exists
//       cursor: cursor ? { id: cursor } : undefined, // Use the cursor for pagination
//       orderBy: { id: "asc" }, // Order by id in ascending order
//     });

//     // If we have a full page of results, set the next cursor
//     const nextCursor =
//       results.length === pageSize ? results[pageSize - 1].id : null;

//     return res.status(200).json({ results, nextCursor });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const getBehaviors = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const behaviors = await prisma.behavior.findMany();
//     return res.status(200).json(behaviors);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const getBehaviorById = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   try {
//     const behavior = await prisma.behavior.findUnique({
//       where: { id: Number(id) },
//     });
//     return res.status(200).json(behavior);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { Behavior, User, Session, Program } from "@prisma/client";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case "GET":
//       return await search(req, res);

//     case "POST":
//       return await search(req, res);

//     default:
//       return res.status(405).end();
//   }
// }

// const search = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { type } = req.query;
//   // TODO: get where and data to select (from request body)
//   // TODO: perform search and return with pagination cursor
//   try {
//     let data: Behavior[] | User[] | Session[] | Program[];
//     switch (type) {
//       case "user":
//         data = await getUsers();
//         break;
//       case "program":
//         data = await getPrograms();
//         break;
//       case "session":
//         data = await getSessions();
//         break;
//       case "behavior":
//         data = await getBehaviors();
//         break;
//       default:
//         data = [];
//     }
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// const getUsers = async () => {
//   return await prisma.user.findMany({
//     where: {},
//   });
// };

// const getPrograms = async () => {
//   return await prisma.program.findMany({
//     where: {},
//   });
// };

// const getSessions = async () => {
//   return await prisma.session.findMany({
//     where: {},
//   });
// };

// const getBehaviors = async () => {
//   return await prisma.behavior.findMany({
//     where: {},
//   });
// };
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await search(req, res);
  } else {
    return res.status(405).end();
  }
}

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { model, searchQuery, pageSize = 20, cursor } = req.body;

  const searchFields = ["name", "email"];

  const whereClause = {
    OR: searchFields.map((field) => ({
      [field]: {
        contains: searchQuery,
        mode: "insensitive",
      },
    })),
  };

  const paginationOptions = {
    take: pageSize,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: Number(cursor) } : undefined,
    orderBy: { id: "asc" },
  };

  try {
    const results = await prisma[model].findMany({
      where: whereClause,
      ...paginationOptions,
    });

    const totalCount = await prisma[model].count({ where: whereClause });

    const nextCursor =
      results.length === pageSize ? results[pageSize - 1].id : null;

    return res.status(200).json({ results, nextCursor, totalCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
