"use client";

import { Photo } from "@/tools/samples.model";
import { getPhotos } from "@/tools/DataManager";
import KeyControl from "@/tools/KeyControl";
import Comments from "./Comments";
import Jumpto from "./Jumpto";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Album({ albumData }: { albumData: Photo[] }) {
    // useStates for the album component 
    const [photos, setPhotos] = useState<Photo[]>(albumData);
    const [photoNumber, setPhotoNumber] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isDisabledPrev, setIsDisabledPrev] = useState<boolean>(true);
    const [isDisabledNext, setDisabledNext] = useState<boolean>(false);
    const [isJumpto, setIsJumpto] = useState<boolean>(false);
    const [isAddComment, setIsAddComment] = useState<boolean>(false);

    // a constant to store the current photo
    const selectedPhoto: Photo = photos[photoNumber];

    // Update button states and selectedIndex whenever photoNumber changes 
    useEffect(() => {
        setIsDisabledPrev(photoNumber === 0);
        setDisabledNext(photoNumber === photos.length - 1);
        setSelectedIndex(photoNumber);
    }, [photoNumber, photos.length]);

    // previous photo navigation event handler
    const onPrevious = (e: any) => {
        if (photoNumber > 0) setPhotoNumber(photoNumber - 1);
    };

    // next photo navigation event handler
    const onNext = (e: any) => {
        if (photoNumber < photos.length - 1) setPhotoNumber(photoNumber + 1);
    };

    // Toggle the JumpTo component visibility
    const onJumpto = (e: any) => {
        setIsJumpto(!isJumpto);
    };

    // Navigate directly to a photo from JumpTo component
    const onJumpToPhoto = (index: number) => {
        setPhotoNumber(index);
        setSelectedIndex(index);
    };

    // event handler for add comment
    const onAddComment = (e:any) => {
        setIsAddComment(!isAddComment);
    }

    return (
        <div className="mt-2 p-2 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
            {/* displaying thumbnails conditionally */}
            <div>
                {isJumpto ? <Jumpto albumData={albumData} onJumpToPhoto={onJumpToPhoto} selectedIndex={selectedIndex} /> : null}
            </div>

            {/* ----------------------------------------------------------current photo info */}
            {/* photo counter */}
            <span className="rounded bg-blue-400 text-amber-50 px-1.5 ">Photo {photoNumber + 1} of {photos.length}</span>
            <p className="pb-2">{selectedPhoto?.title}</p>
            <Image
                src={`/images/photos/${selectedPhoto?.source}`}
                alt={selectedPhoto?.caption}
                width={400}
                height={400}
                priority

                className="rounded-lg mb-2 border border-amber-400 w-[400px] h-[400px]"
            />
            <p className="mb-2.5 text-xs">{selectedPhoto?.caption}</p>

            {/* Navigation buttons */}
            <div className="mb-6">
                <button
                    disabled={isDisabledPrev}
                    className={` text-white rounded mr-3 p-1 ${isDisabledPrev ? "bg-amber-400" : "bg-blue-400"}`} onClick={onPrevious}>Previous</button>

                <button
                    disabled={isDisabledNext}
                    className={` text-white rounded mr-3 p-1 ${isDisabledNext ? "bg-amber-400" : "bg-blue-400"}`} onClick={onNext}>Next</button>

                <button
                    className={` text-white rounded mr-3 p-1 ${isJumpto ? "bg-amber-400" : "bg-blue-400"}`} onClick={onJumpto}>JumpTo</button>

                <button
                    className={` text-white rounded mr-3 p-1 ${isAddComment ? "bg-amber-400" : "bg-blue-400"}`} onClick={onAddComment}>Add Comment</button>
            </div>

            {/* comment section rendering */}
            <div className="mt-4 space-y-3">
                {selectedPhoto?.comments?.map((com) => (
                    <div
                        key={com.author}
                        className="bg-gray-700 text-white p-3 rounded-xl shadow-md border-l-4 border-amber-400 hover:shadow-lg transition-shadow duration-200 mb-1.5"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">{com.author}</span>
                        </div>
                        <p className="text-sm">{com.comment}</p>
                    </div>
                ))}
            </div>

            <div>
                {isAddComment? <Comments selectedPhoto={selectedPhoto} setPhotos={setPhotos} /> : null}
            </div>

            {/* keyboard navigation using keyControl */}
            <KeyControl eventHandler={onNext} keyToDetect={"ArrowRight"} />
            <KeyControl eventHandler={onPrevious} keyToDetect={"ArrowLeft"} />
        </div>
    );
}
