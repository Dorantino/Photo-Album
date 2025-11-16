import { NextResponse, NextRequest } from 'next/server';
import { addComments } from "@/tools/DataManager"



export function POST(request: NextRequest) {
    // return new NextResponse("Response from web API via GET request");

    return addComments(request);

}
