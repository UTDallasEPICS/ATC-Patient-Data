import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import {  } from '@prisma/client';

export default async function handler( req: NextApiRequest, res: NextApiResponse ) { 
  switch ( req.method ) {
    case "GET":
      return getReport(req, res);

    case "POST":
      return createReport(req, res);

    case "DELETE":
      return deleteReport(req, res);
    
    default:
      return res.status(405).end();
  }
}

const getReport = async (req: NextApiRequest, res: NextApiResponse) => {
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

const createReport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const savedReport = await prisma.session.create({
      data: req.body,
    });
    return res
      .status(201)
      .json(savedReport);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteReport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.session.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
};