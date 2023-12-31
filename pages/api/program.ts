import { Behavior } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  switch( req.method ) {
    case 'GET':
      return await getProgram(req, res);
    
    case 'POST':
      return await createProgram(req, res);

    case 'DELETE':
      return await deleteProgram(req, res);
    
    default:
      return res.status(405).end();
  }
}

const getProgram = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; 
  try {
    const program  = await prisma.program.findFirst({
      where: { id: Number(id) },
    });
    return res.status(200).json(program);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const createProgram = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, datatype } = req.body;
    const program = await prisma.program.create({
      data: {
        name, 
        description,
        datatype  
      }
    });
    return res.status(201).json(program);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const deleteProgram = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await prisma.program.delete({
      where: { id: Number(id) }
    });
    return res.status(200)
  } catch (error) {
    return res.status(500).json({ error });
  }
}