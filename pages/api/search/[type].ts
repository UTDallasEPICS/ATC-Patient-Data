import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prisma';
import { Behavior, User, Session, Program } from '@prisma/client'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch ( req.method ) {
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
  try {
    let data: Behavior[] | User[] | Session[] | Program[];
    switch (type) {
      case 'user':
        data = await getUsers();
        break;
      case 'program':
        data = await getPrograms();
        break;
      case 'session':
        data = await getSessions();
        break;
      case 'behavior':
        data = await getBehaviors();
        break;
      default:
        data = [];
    }
    return res.status(200).json(data);;
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getUsers = async () => {
    return await prisma.user.findMany({
      where: {
        // search logic goes in here
      }
    });
}

const getPrograms = async () => {
    return await prisma.program.findMany({
      where: {
        // search logic goes in here
      }
    });
}

const getSessions = async () => {
    return await prisma.session.findMany({
      where: {
        // search logic goes in here
      }
    });
}

const getBehaviors = async () => {
    return await prisma.behavior.findMany({
      where: {
        // search logic goes in here
      }
    });
}

