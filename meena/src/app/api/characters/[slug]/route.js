import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    // Directly access params.slug, no need for await
    const slug = params.slug;

    // Find the character based on the slug
    const character = characters.data.find(item => item.slug === slug);
    
    if (!character) {
      return new NextResponse('Not found', { status: 404 });
    }

    return NextResponse.json({
      character,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
