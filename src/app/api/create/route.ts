import { NextResponse, NextRequest } from 'next/server';
import { addComments } from "@/tools/DataManager"



export function POST(request: NextRequest) {
    return addComments(request);

}
