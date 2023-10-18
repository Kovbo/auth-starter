"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTask = exports.editTask = exports.createTask = exports.getAllTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTasks = async (req, res) => {
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
exports.getAllTasks = getAllTasks;
const getTask = async (req, res) => {
    const { id } = req.params;
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
exports.getTask = getTask;
const createTask = async (req, res) => {
    const { name } = req.body;
    const newTask = await prisma.task.create({
        data: {
            name,
            projectId: 1,
        },
    });
    res.status(201).json({ msg: "Created", task: newTask });
};
exports.createTask = createTask;
const editTask = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
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
exports.editTask = editTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.delete({
        where: { id: Number(id) },
    });
    res.json({ msg: "Deleted!" });
};
exports.deleteTask = deleteTask;
