import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) { 
  switch ( req.method ) {
    case "GET":
      return getSession(req, res);

    case "POST":
      return createSession(req, res);

    case "DELETE":
      return deleteSession(req, res);
    
    default:
      return res.status(405).end();
  }
}

const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const session = await prisma.session.findFirst({
        where: { id: Number(id) },
      });
      return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const savedSession = await prisma.session.create({
      data: req.body,
    });
    return res
      .status(201)
      .json(savedSession);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.session.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
};