import {NextRequest, NextResponse} from "next/server";
import {addList, addMusicToList, getLists} from "@/lib/musicList";
import {getUserById, signin} from "@/lib/user";

// 返回所有歌单
export async function GET(req: NextRequest) {
    let lists = await getLists()
    return NextResponse.json({lists})
}

// 创建歌单
interface ListData {
    title: string
    userId: string
}

// 创建歌单是公用的, 每个user都可以
export async function POST(req: NextRequest) {
    const payload: ListData = await req.json()
    console.log(payload);
    let user = await getUserById(payload.userId)
    console.log(user)
    if (!user) {
        return NextResponse.error()
    }
    let list
    try {
        list = await addList(payload.title, user)
    } catch (err) {
        return NextResponse.error()
    }
    return NextResponse.json({list})
}

interface AddData {
    musicId: string
    listId: string
}

// 添加歌曲到歌单是更新歌单
export async function PUT(req: NextRequest) {
    const payload: AddData = await req.json()
    if (!payload.listId || !payload.musicId) {
        return NextResponse.error()
    }
    let ref
    try {
        ref = await addMusicToList(payload.musicId, payload.listId)
    } catch (e) {
        return NextResponse.error()
    }
    return NextResponse.json({ref})
}