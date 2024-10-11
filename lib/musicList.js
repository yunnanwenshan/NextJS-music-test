import {db} from './db'

export async function getLists() {
    return await db.musicList.findMany({})
}

// 根据userid获取list
export async function getListsByUid(userId) {
    return await db.musicList.findMany({where: {userId}})
}


// 创建歌单
export async function addList(title, user) {
    console.log(title, user)
    return await db.musicList.create({
        data: {title, userId: user.id}
    })
}

// 添加歌曲到歌单
export async function addMusicToList(musicId, listId) {
    return await db.listToMusic.create({
        data: {musicId, listId}
    })
}

// 获取歌单下歌曲
export async function getPlaylistMusics(lid) {
    return await db.listToMusic.findMany({
        where: {listId: lid}
    })
}

// 获取歌单信息 byid
export async function getPlaylistById(lid) {
    return await db.musicList.findUnique({
        where: {id: lid}
    })
}