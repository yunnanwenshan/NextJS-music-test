import {NextRequest, NextResponse} from "next/server";
import {getMusic} from "@/lib/music";

export async function GET(req: NextRequest) {
    let sIdx = req.url.indexOf('searchInput')
    let searchInput = req.url.slice(
        sIdx + 12, req.url.length
    )
    // 将url的中文解码为正常的
    searchInput = decodeURI(searchInput)
    let musics = []
    try {
        musics = await getMusic(searchInput)
    } catch (e) {
        return NextResponse.error()
    }

    return NextResponse.json({msg: 'success', musics})
}