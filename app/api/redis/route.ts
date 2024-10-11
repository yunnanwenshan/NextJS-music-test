// import { NextRequest, NextResponse } from 'next/server';
// import redisClient from '../../../lib/redis';

// export async function POST(req: NextRequest) {
//     const { key, value } = await req.json();

//     if (!key || !value) {
//         return NextResponse.json({ message: 'Key and value must be provided.' }, { status: 400 });
//     }

import { NextRequest, NextResponse } from 'next/server';
import redisClient from '../../../lib/redis';

export async function POST(req: NextRequest) {
    const { key, value } = await req.json();

    if (!key || !value) {
        return NextResponse.json({ message: 'Key and value must be provided.' }, { status: 400 });
    }

    await redisClient.set(key, value);
    return NextResponse.json({ message: 'Success' });
}
// }