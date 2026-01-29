import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dbConnect from '@/lib/mongodb';
import User from "@/models/User"
import {hash} from '@node-rs/argon2'


export async function POST(request: Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const body = await request.json();
    if (session) {
        return NextResponse.json({ error: 'You are already logged in' }, { status: 403 });
    }
    if (!body.name || !body.username || !body.password){
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    try {
        const userExists = await User.findOne({ username: body.username });
        if (userExists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const user = await User.create({
            name: body.name,
            username: body.username,
            password: await hash(body.password)
        })
       
        return NextResponse.json({ message: 'User Created', user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong'}, { status: 400 });
    }
}