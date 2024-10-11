import {NextRequest, NextResponse} from "next/server";
import {getPlaylistById, getPlaylistMusics} from "@/lib/musicList";
import {getManyMusicById} from "@/lib/music";

// 获取歌单详情, 包括歌单下歌曲
export async function GET(req: NextRequest) {
    let sIdx = req.url.indexOf('lid')
    let lid = req.url.slice(
        sIdx + 4, req.url.length
    )
    // 将url的中文解码为正常的
    lid = decodeURI(lid)
    console.log(lid)
    // 根据歌单id获取歌单详情
    let list = await getPlaylistById(lid);
    // 获取listid到mid的映射关系
    let ltms = await getPlaylistMusics(lid)
    // 根据歌单id获取歌单下的 歌曲id[]
    let mids = ltms.map((m) => m.musicId)
    // 根据歌曲id获取歌曲列表
    let musics = await getManyMusicById(mids)
    console.log(list, mids, musics)

    return NextResponse.json({list, mids, musics})
}