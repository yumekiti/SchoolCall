import type { NextApiHandler } from "next"
import prisma from "../../libs/prisma"

const handler: NextApiHandler = async (req, res) => {
  const { method, body, query: { id } } = req;

  switch (method) {
    case "POST": {
      try {
        const newClassroom = await prisma.classroom.create({ data: { ...body } })
        res.status(200).json(newClassroom);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "GET": {
      try {
        if (id) {
          const classroom = await prisma.classroom.findUnique({ where: { id: Number(id) } })
          res.status(200).json(classroom);
        } else {
          const classrooms = await prisma.classroom.findMany();
          res.status(200).json(classrooms);
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "PUT": {
      try {
        const updatedClassroom = await prisma.classroom.update({
          where: { id: Number(id) },
          data: { ...body }
        });
        res.status(200).json(updatedClassroom);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    case "DELETE": {
      try {
        const deletedClassroom = await prisma.classroom.delete({ where: { id: Number(id) } });
        res.status(200).json(deletedClassroom);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
      break;
    }
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler

