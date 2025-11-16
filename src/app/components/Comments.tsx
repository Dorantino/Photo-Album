"use client"

import { sendJSONData } from "@/tools/Toolkit";
import { Photo, Comment } from "@/tools/samples.model";
import LoadingOverlay from "./LoadingOverlay";
import { useEffect, useState } from "react";

export default function Comments({ selectedPhoto, setPhotos }: { selectedPhoto: Photo; setPhotos: Function }) {

    // useState for author and comment input
    const [author, setAuthor] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    // API URl for sending the comment
    const SEND_SCRIPT: string = "http://localhost/addComment.php";
    
    // Event handler for sending comments
    const sendComment = async (e: any) => {

        if (author.trim() === "" || comment.trim() === "") {
        setShowError(true);
        return; 
        } 
        setShowError(false);
        
        // Data object that will be sent to the server
        const data: Comment = {
            "photoId": selectedPhoto._id,
            "author": author,
            "comment": comment
        };

        setIsLoading(true);
        console.log("Sending comment:", data);
        let newData = await sendJSONData(SEND_SCRIPT, data);
        setPhotos(newData.photos);
        setIsLoading(false);
        setAuthor("");
        setComment("");
    };

    return (
        <>
            <LoadingOverlay show={isLoading} spinnerColor="#FDD835" bgColor="rgba(0,0,0,0.7)" />
            <div className="mt-4 p-2 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
                <h3 className="mb-2 text-2lg">Add a Comment:</h3>
                {/* author input field */}
                <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full mb-2 p-1 rounded border border-gray-600 bg-gray-700 text-white"
                />
                {/* Comment input field */}
                <textarea
                    placeholder="Enter your Comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full mb-2 p-1 rounded border border-gray-600 bg-gray-700 text-white"
                />

                {showError && (
                    <p className="text-red-500 mb-2">
                        Both fields are required!
                    </p>
                )}
                {/* Submit button */}
                <button className="bg-blue-400 text-white px-4 py-2 rounded" onClick={sendComment} >
                    Submit Comment
                </button>
            </div>

        </>
    );
}