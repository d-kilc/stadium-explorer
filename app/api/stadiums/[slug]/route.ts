import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest } from 'next/server';
import type { StadiumFeature } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = join(process.cwd(), 'data', 'stadiums.geojson');
    const fileContents = await readFile(filePath, 'utf-8');
    const features: StadiumFeature[] = JSON.parse(fileContents);
    
    // Find the feature that matches the slug in properties.id
    const feature = features.find(f => f.properties.id === slug);
    
    if (!feature) {
      return Response.json(
        { error: 'Stadium not found' },
        { status: 404 }
      );
    }
    
    return Response.json(feature);
  } catch (error) {
    console.error('Error reading stadiums data:', error);
    return Response.json(
      { error: 'Failed to load stadium data' },
      { status: 500 }
    );
  }
}

