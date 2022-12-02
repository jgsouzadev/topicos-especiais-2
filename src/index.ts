// playlist/src/index.ts

import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const SERVER_PORT = 3000

const responseStrings = {
    SUCCESS: "Requisição realizada com sucesso",
    NOT_EXISTS: "Não existe uma requisição para esse endpoint.",
    SERVER_RUNNING: `Servidor Executando na porta ${SERVER_PORT}`
}


//* 7. Fetches all principal.
app.get('/principals', async (req, res) => {
    const principals = await prisma.principal.findMany()
    res.json({
        success: true,
        payload: principals,
    })
})

app.get(`/principal/:id`, async (req, res) => {
    const { id } = req.params
    const principal = await prisma.principal.findFirst({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: principal,
    })
})


//* 3. Creates a new principal.
app.post(`/principal`, async (req, res) => {
    const result = await prisma.principal.create({
        data: { ...req.body },
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.put('/principal/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const sub = await prisma.principal.update({
        where: { id: Number(id) },
        data: { name, },
    })
    res.json({
        success: true,
        payload: sub,
    })
})

app.delete(`/principal/:id`, async (req, res) => {
    const { id } = req.params
    const sub = await prisma.principal.delete({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: sub,
    })
})

app.get('/subs', async (req, res) => {
    const subs = await prisma.sub.findMany({
        where: { released: true },
        include: { principal: true }
    })
    res.json({
        success: true,
        payload: subs,
    })
})

app.get(`/sub/:id`, async (req, res) => {
    const { id } = req.params
    const sub = await prisma.sub.findFirst({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: sub,
    })
})


//* 4. Creates (or compose) a new sub (unreleased)
app.post(`/sub`, async (req, res) => {
    const { title, content, principalEmail } = req.body
    const result = await prisma.sub.create({
        data: {
            title,
            content,
            released: false,
            principal: { connect: { email: principalEmail } },
        },
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.put('/sub/release/:id', async (req, res) => {
    const { id } = req.params
    const sub = await prisma.sub.update({
        where: { id: Number(id) },
        data: { released: true },
    })
    res.json({
        success: true,
        payload: sub,
    })
})

app.delete(`/sub/:id`, async (req, res) => {
    const { id } = req.params
    const sub = await prisma.sub.delete({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: sub,
    })
})

app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: responseStrings.NOT_EXISTS,
    });
});

app.listen(SERVER_PORT, () =>
    console.log(responseStrings.SERVER_RUNNING),
)
