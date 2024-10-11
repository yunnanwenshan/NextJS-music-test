// user api
import {db} from './db'

// 登录
export async function signin(email, password) {
    // return await db.user.findUnique({
    //     where: {email, password}
    // }) error!
    // 连接查询 user的歌单列表
    let users = await db.user.findMany({
        where: {AND: [{email}, {password}]},
        include: {
            musicList: true
        }
    })
    if (users.length !== 1) {
        throw new Error('不止一个user!')
    }
    return users[0]
}

export async function signup(email, username, password) {
    // todo 加盐
    return await db.user.create({
        data: {email, username, password, avatarUrl: '/'}
    })
}

export async function getUserById(id) {
    console.log(id)
    return await db.user.findUnique({
        where: {id}
    })
}