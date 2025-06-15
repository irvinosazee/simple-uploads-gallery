import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Image from '@/models/image'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const body = await req.json()
        const { name, url } = body
        
        // Validate required fields
        if (!name || !url ) {
            return NextResponse.json({ error: 'Missing name or URL' }, { status: 400 })
        }

        const image = await Image.create({ name, url })

        return NextResponse.json({ image }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        await dbConnect()
        const images = await Image.find().sort({ createdAt: -1 })
        return NextResponse.json({ images }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
export async function DELETE(req: Request , id : string) {
    try {
        await dbConnect()
        
        if (!id) {
            return NextResponse.json({ error: 'Missing image ID' }, { status: 400 })
        }

        const image = await Image.findByIdAndDelete(id)
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
