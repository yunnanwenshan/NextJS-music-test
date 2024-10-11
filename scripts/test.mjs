// scripts/test-db.mjs
import {PrismaClient} from "@prisma/client";

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}]
})

const user = await db.user.findMany({
    where: {AND: [{email: '123@1.com'}, {password: '123'}]}
})
console.log(user)

const user2 = await db.user.findMany({
    where: {id: '237c394f-cc0f-4a87-bae1-3b2baf9d3226'}
})
console.log(user2)

const user3 = await db.user.findUnique({
    where: {id: '237c394f-cc0f-4a87-bae1-3b2baf9d3226'}
})
console.log(user3)

// const l = await db.musicList.create({
//     data: {title: 't', userId: '237c394f-cc0f-4a87-bae1-3b2baf9d3226'}
// })

console.log(
    await db.listToMusic.create({
        data: {musicId: '1', listId: "2"}
    })
)

let ltms = await db.listToMusic.findMany({
    where: {listId: '96b2cd7c-a787-4907-8e28-0a2f20aaac08'},
})

let musics=await db.music.findMany({})
let ids=['83b07eac-6c49-4f4b-98b4-23e50d6965cd','5ca41256-b24e-4f5f-9c7e-bf29b4649576']
console.log(musics.filter((m) => ids.includes(m.id)));

let ms = await db.music.findUnique({
    where: {id: ltms[0].musicId}
})

console.log(ms)