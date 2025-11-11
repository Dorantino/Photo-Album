"use client";

import Image from "next/image";
import { Photo } from "@/tools/samples.model";
import Comments from "./Comments";
import Jumpto from "./Jumpto";
import { getPhotos } from "@/tools/DataManager";
import { useEffect, useState } from "react";

export default function Album({ albumData }: { albumData: Photo[] }) {

    const [photos, setPhotos]= useState<Photo[]>(albumData);
    const [photoNumber, setPhotoNumber] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isDisabledPrev, setIsDislabledPrev] = useState<boolean>(true);
    const [isDisabledNext, setIsDislabledNext] = useState<boolean>(false);
    const [isJumpto, setIsJumpto] = useState<boolean>(false);
    
    const selectedPhoto: Photo = photos[photoNumber];

    useEffect(() => {
        setIsDislabledPrev(photoNumber === 0);
        setIsDislabledNext(photoNumber === photos.length - 1);

        setSelectedIndex(photoNumber);

    }, [photoNumber, photos.length]);

    const onPrevious = (e: any) => {
    if (photoNumber > 0) setPhotoNumber(photoNumber - 1); 
        
    };

    const onNext = (e: any) => {
    if (photoNumber < albumData.length - 1)setPhotoNumber(photoNumber + 1);
        
    };

    const onJumpto = (e:any) => {
        setIsJumpto(!isJumpto);
    };

    const onJumpToPhoto = (index: number) => {
        setPhotoNumber(index);
        setSelectedIndex(index);
    }

    const refreshComments = async () => {
      const updatedPhotos = await getPhotos();
      if (updatedPhotos.length > 0) setPhotos(updatedPhotos);
  };


    return (
        
        <div className="mt-2 p-2 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
            <div>
                {isJumpto ? <Jumpto albumData={albumData} onJumpToPhoto={onJumpToPhoto} selectedIndex={selectedIndex} /> : null}
            </div>

            <span className="rounded bg-blue-400 text-amber-50 px-1.5 ">Photo {photoNumber + 1} of {albumData.length}</span>
            <p className="pb-2">{selectedPhoto.title}</p>
            <Image
                src={`/images/photos/${selectedPhoto.source}`}
                alt={selectedPhoto.caption}
                width={400}
                height={400}
                priority

                className="rounded-lg mb-2 border border-amber-400 w-[400px] h-[400px]"
            />            
            <p className="mb-2.5 text-xs">{selectedPhoto.caption}</p>

            <div className="mb-6">
                <button
                disabled={isDisabledPrev}
                 className={` text-white rounded mr-3 p-1 ${isDisabledPrev? "bg-amber-400" : "bg-blue-400" }`} onClick={onPrevious}>Previous</button>

                <button
                disabled={isDisabledNext}
                 className={` text-white rounded mr-3 p-1 ${isDisabledNext? "bg-amber-400" : "bg-blue-400" }`} onClick={onNext}>Next</button>

                <button
                 className={` text-white rounded mr-3 p-1 ${isJumpto? "bg-amber-400" : "bg-blue-400" }`} onClick={onJumpto}>JumpTo</button>
            </div>
            
            <div>
                {selectedPhoto.comments.map((com) =>
                    <div key={com.author} className="border-t border-gray-700 mt-2 pt-2 shadow-sm">
                        <strong>{com.author}:</strong><br /> {com.comment}
                    </div>
                )}
            </div>

            <div>
                <Comments selectedPhoto={selectedPhoto} refreshComments={refreshComments}/>
            </div>
        </div>
    );
}
