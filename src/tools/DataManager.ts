import { MongoClient, Db, Collection, FindCursor } from "mongodb";
import { Technology } from "@/tools/data.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "dbTechs";	
const MONGO_COLLECTION_TECHS:string = "technologies";

export async function getTechnologies() {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let techArray: Technology[];

    try {
        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db:Db = mongoClient.db(MONGO_DB_NAME);

        let collection:Collection<Technology> = db.collection<Technology>(MONGO_COLLECTION_TECHS);
        // get all documents in the collection
        // let cursor:FindCursor = collection.find();

        // retrieve only certain properties (or exclude!)
        let cursor:FindCursor = collection.find().project({"description":true});

        // retireve techs that have difficulty of 4
        // let cursor:FindCursor = collection.find({"difficulty":4});

        // retireve techs that have difficulty of 4
        // let cursor:FindCursor = collection.find({"difficulty":{$gte : 1}});
        // let cursor:FindCursor = collection.find({"difficulty":{$gte : 1, $lte:3}});
        

        // using regular expressions to query
        // let cursor:FindCursor = collection.find({"name": /^j/i});

        // sort the documents on difficulty
        cursor.sort({"difficulty": 1});


        // get an array of all the documents from the cursor
        techArray = await cursor.toArray();
        // need convert each ObjectID to a string
        techArray.forEach((tech:Technology) => tech._id = tech._id.toString());

    } catch (error:any) {
        console.log(`>>> DB ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return techArray;
}

export async function getTechnologiesForCourse( courseCode: string ){

    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let courseArray: Technology[];

    try {
        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db:Db = mongoClient.db(MONGO_DB_NAME);

        let collection:Collection<Technology> = db.collection<Technology>(MONGO_COLLECTION_TECHS);
        
        courseCode = courseCode.toUpperCase();

        let cursor: FindCursor = collection.find({"courses.code": courseCode}).project({"_id": false, "courses": false }).sort({ name: 1 });


        // get an array of all the documents from the cursor
        courseArray = await cursor.toArray();

    } catch (error:any) {
        console.log(`>>> DB ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return courseArray;

}