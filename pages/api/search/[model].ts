import { Behavior, Program, Session, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  /*const { email } = await getSession(req, res)
  const user = await prisma.user.findFirst({
    where: {email}
  })*/
  // TODO: role checking for the user, can pass it into search functions
  switch ( req.method ) {
    case 'GET':
      return await search(req, res);

    case 'POST':
      return await search(req, res);

    default:
      return res.status(405).end();
  }
}

// TODO: model is actually part of the route params, we dont need to pass in the body. 
const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchQuery, pageSize = 20, cursor } = req.body;
  const { model } = req.query        // double check getting route params
  const searchFields = ["first_name", "last_name", "email"];

  const whereClause = {
    OR: searchFields.map((field) => ({
      [field]: {
        contains: searchQuery || "",
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
