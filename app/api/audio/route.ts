import fs, {writeFile} from 'fs/promises'
import {NextRequest, NextResponse} from 'next/server';
import {getMusics, saveMusic} from "@/lib/music";

// 获取音乐列表 -> todo page分页
export async function GET(req: NextRequest) {
    // 应该获取音乐信息
    // const dir = await fs.readdir('./public/audio')
    // console.log(dir);
    // return NextResponse.json({audios: dir})

    let musics = await getMusics()
    return NextResponse.json({musics})
}

// 上传音乐
export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const cover: File | null = data.get('cover') as unknown as File

    if (!file || !cover) {
        return NextResponse.error()
    }

    // 保存音乐
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    // 这里是你要进行保存的文件目录地址
    const path = `./public/audio/${file.name}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    // 保存封面
    const bytes2 = await cover.arrayBuffer()
    const buffer2 = Buffer.from(bytes2)
    // 这里是你要进行保存的文件目录地址现场v在
    const path2 = `./public/cover/${cover.name}`
    await writeFile(path2, buffer2)
    console.log(`open ${path2} to see the uploaded file`)

    // 存入sqlite
    let baseUrl = 'http://localhost:8080'
    let src = `${baseUrl}/audio/${file.name}`
    let coverImgUrl = `${baseUrl}/cover/${cover.name}`

    let music = await saveMusic(
        data.get('title'), data.get('singer'), src, coverImgUrl
    )

    return NextResponse.json({success: true, music})
}