import { Request, Response } from "express";
import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTasks = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: 1,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      project: {
        user: user,
      },
    },
  });

  res.json({ tasks: tasks });
};

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: 1,
    },
  });

  const task = await prisma.task.findFirstOrThrow({
    where: {
      id: Number(id),
      project: {
        user: user,
      },
    },
  });

  res.json({ task: task });
};

const createTask = async (req: Request, res: Response) => {
  const { name } = req.body as Task;
  const newTask = await prisma.task.create({
    data: {
      name,
      projectId: 1,
    },
  });

  res.status(201).json({ msg: "Created", task: newTask });
};

const editTask = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { name, completed } = req.body as Task;

  const task = await prisma.task.findFirstOrThrow({
    where: { id: Number(id) },
  });

  const updatedTask = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      completed: completed ?? task.completed,
      name: name || task.name,
    },
  });
  res.json({ data: updatedTask });
};

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const task = await prisma.task.delete({
    where: { id: Number(id) },
  });

  res.json({ msg: "Deleted!" });
};

export { getAllTasks, createTask, editTask, getTask, deleteTask };
