import {NextRequest, NextResponse} from "next/server";
import {signin} from '@/lib/user'
import {genJWT} from "@/lib/auth";

interface LoginData {
    email: string
    password: string
}

export async function POST(req: NextRequest) {
    const payload: LoginData = await req.json()
    console.log(payload);
    let user
    try {
        user = await signin(payload.email, payload.password)
        console.log(user)
    } catch (err) {
        return NextResponse.error()
    }

    // jwt token
    let token = await genJWT(user)

    // return new Response(null, {status: 204})
    return NextResponse.json({msg: 'ok', user: {...user, token}})
}