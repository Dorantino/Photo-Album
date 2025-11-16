import Album from './components/Album';
import { Photo } from "@/tools/samples.model";
import { getPhotos } from "@/tools/DataManager";


export default async function  Home() {

  // a variable to store the fetched data
  const albumData: Photo[] = await getPhotos();

  return (
    // displaying page based on data or no data
    <>
    {(albumData.length > 0)?
    <div className="text-blue-400 p-4 ">
      <Album albumData={albumData}/>
    </div> :
    <div className="flex items-center justify-center h-screen text-4xl">Oops! No Photos available😒</div>}
    </>
  );
}
