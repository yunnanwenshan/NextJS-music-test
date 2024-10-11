import {signup} from "@/lib/user";
import {NextRequest, NextResponse} from "next/server";
import {genJWT} from "@/lib/auth";

interface SignupData {
    email: string
    username: string
    password: string
    token: string
}

export async function POST(req: NextRequest) {
    const payload: SignupData = await req.json()
    console.log(payload);
    // 参数校验
    if (!payload.email || !payload.username || !payload.password) {
        return NextResponse.error()
    }
    let user = {}
    try {
        user = await signup(payload.email, payload.username, payload.password)
    } catch (err) {
        return NextResponse.error()
    }

    // todo: jwt
    let token = await genJWT(user)
    return NextResponse.json({msg: 'success', user: {...user, token}})
}