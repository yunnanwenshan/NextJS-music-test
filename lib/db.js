// lib/db.js
import {PrismaClient} from "@prisma/client";

export const db = createPrismaClient()

/** @returns {PrismaClient} */
function createPrismaClient() {
    // 全局只保有一个实例
    if (!globalThis.prismaClient) {
        globalThis.prismaClient = new PrismaClient({
            log: [{emit: 'stdout', level: 'query'}]
        })
    }
    return globalThis.prismaClient
}