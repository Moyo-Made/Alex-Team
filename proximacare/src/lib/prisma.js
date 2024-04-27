import { PrismaClient } from '@prisma/client'

const prismaClientSingleton =() => {
    return PrismaClient;
}

globalthis.globalPrisma = globalThis.globalPrisma || prismaClientSingleton();

export const prisma =globalThis.globalPrisma;


if (process.env.NODE_ENV !== 'production') {
    globalThis.globalPrisma = prisma
}