import { MongoClient, Db, Collection, FindCursor } from "mongodb";
// import { getJSONData } from "./Toolkit";
import { Photo } from "./samples.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "dbPhotoAlbum";	
const MONGO_COLLECTION_PHOTOS:string = "photoAlbum";

export async function getPhotos() {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let albumData: Photo[];

    try {
        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db:Db = mongoClient.db(MONGO_DB_NAME);

        let collection:Collection<Photo> = db.collection<Photo>(MONGO_COLLECTION_PHOTOS);
        // get all documents in the collection
        
        let cursor:FindCursor = collection.find();

        // get an array of all the documents from the cursor
        albumData = await cursor.toArray();
        // need convert each ObjectID to a string
        albumData.forEach((photoData:Photo) => photoData._id = photoData._id.toString());

        console.log(albumData)

    } catch (error:any) {
        console.log(`>>> DB ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return albumData;
}