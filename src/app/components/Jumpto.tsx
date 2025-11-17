import Image from "next/image";
import { Photo } from "@/tools/samples.model";

export default function Jumpto({ albumData, onJumpToPhoto, selectedIndex }: { albumData: Photo[]; onJumpToPhoto: Function; selectedIndex: number}) {

    return (
        <>
            {/* Container for all thumbnails */}
            <div className="flex flex-row flex-wrap gap-2 ">
                {albumData.map((photo, index) => (
                    <div key={photo._id} onClick={() => onJumpToPhoto(index)} className={`cursor-pointer rounded-lg  `}>
                        <Image
                            src={`/images/photos/${photo.source}`}
                            alt={photo.title}
                            width={parseInt(photo.width)}
                            height={parseInt(photo.height)}
                            priority
                            className={`rounded-lg mb-2 border ${index === selectedIndex ? "border-amber-400" : "border-blue-400"
                                } w-[50px] h-[50px] transform hover:scale-120 transition-transform duration-300`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
