import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest } from 'next/server';
import type { StadiumFeature } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const filePath = join(process.cwd(), 'data', 'stadiums.geojson');
    const fileContents = await readFile(filePath, 'utf-8');
    const features: StadiumFeature[] = JSON.parse(fileContents);
    
    return Response.json(features);
  } catch (error) {
    console.error('Error reading stadiums data:', error);
    return Response.json(
      { error: 'Failed to load stadiums data' },
      { status: 500 }
    );
  }
}