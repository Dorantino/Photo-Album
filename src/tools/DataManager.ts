import { MongoClient, Db, Collection, FindCursor, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
// import { getJSONData } from "./Toolkit";
import { Photo } from "./samples.model";
import sanitizeHtml from "sanitize-html";
import { NextResponse, NextRequest } from 'next/server';

// MongoDB constants
const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbPhotoAlbum";
const MONGO_COLLECTION_PHOTOS: string = "photoAlbum";

export async function getPhotos() {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let albumData: Photo[];

    try {
        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db: Db = mongoClient.db(MONGO_DB_NAME);

        let collection: Collection<Photo> = db.collection<Photo>(MONGO_COLLECTION_PHOTOS);
        // get all documents in the collection

        let cursor: FindCursor = collection.find();

        // get an array of all the documents from the cursor
        albumData = await cursor.toArray();
        // need convert each ObjectID to a string
        albumData.forEach((photoData: Photo) => photoData._id = photoData._id.toString());

        console.log(albumData)

    } catch (error: any) {
        console.log(`>>> DB ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return albumData;
}


export async function addComments(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();

        // fetch the json from the request
        const body: any = await request.json();

        // Correct field access
        const photoId: ObjectId = new ObjectId(sanitizeHtml(body.photoId));

        // Create sanitized comment object
        const newComment = {
            author: sanitizeHtml(body.author),
            comment: sanitizeHtml(body.comment),
            createdAt: new Date()
        };

        const photoCollection: Collection<Photo> = mongoClient.db(MONGO_DB_NAME).collection<Photo>(MONGO_COLLECTION_PHOTOS);
        let selector: Object = { "_id": photoId };
        let newValues: any = {$push: {comments: {
                    $each: [newComment],
                    $sort: { createdAt: -1 }}}
        };

        // Push new comment into array
        const updateResult: any = await photoCollection.updateOne(selector, newValues);

        if (!updateResult.matchedCount) {
            return NextResponse.json({ error: "Photo not found" }, { status: 404 });
        }

        const result = await photoCollection.find().toArray();

        // Sort comments in each photo
        // result.forEach((photo: any) => {
        //     if (photo.comments) {
        //         photo.comments.reverse(); 
        //     }
        // });

        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        // return new NextResponse(JSON.stringify({error: error.message}), {status:500 });
        return NextResponse.json({ error: error.message }, { status: 500 });

    } finally {
        mongoClient.close();
    }
}