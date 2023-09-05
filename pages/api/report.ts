import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getReports(req, res);
    case "POST":
      return createReport(req, res);
    case "DELETE":
      return deleteReport(req, res);
  }
}

const getReports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.query.id) {
      const report = await prisma.report.findUnique({
        where: { id: req.query.id as string },
      });
      return res.status(200).json(report);
    } else {
      const reports = await prisma.report.findMany();
      return res.status(200).json(reports);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createReport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const savedReport = await prisma.report.create({
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
    await prisma.report.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
};