import { sendJSONData} from "@/tools/Toolkit";
import { Photo } from "@/tools/samples.model";
import { useEffect, useState } from "react";

export default function Comments({ selectedPhoto, refreshComments }: { selectedPhoto: Photo; refreshComments:Function }) {

    const [author, setAuthor] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const SEND_SCRIPT:string = "http://localhost:8081/addComment.php";


    // datatype data!!!
    const data = { 
    "photoId": selectedPhoto.id, 
    "author": author, 
    "comment": comment
    };

    const sendComment= async (e:any) => {
                    console.log(selectedPhoto.id)
                    await sendJSONData(SEND_SCRIPT,data, true);
                    setAuthor("");
                    setComment("");
                    await refreshComments();
                    
                };

    return (
        <div className="mt-4 p-2 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
            <h3 className="mb-2 text-2lg">Add a Comment:</h3>
            <input
                type="text"
                placeholder="Enter your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full mb-2 p-1 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <textarea
                placeholder="Enter your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mb-2 p-1 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <button className="bg-blue-400 text-white px-4 py-2 rounded" onClick={sendComment}>
                Submit Comment
            </button>
        </div>
        


    );
}