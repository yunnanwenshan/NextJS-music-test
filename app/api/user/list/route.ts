import {NextRequest, NextResponse} from "next/server";
import {getListsByUid} from "@/lib/musicList";

export async function GET(req: NextRequest) {
    let sIdx = req.url.indexOf('uid')
    let userId = req.url.slice(
        sIdx + 4, req.url.length
    )
    // 将url的中文解码为正常的
    userId = decodeURI(userId)
    console.log(userId)

    let list = await getListsByUid(userId);

    return NextResponse.json({list})
}