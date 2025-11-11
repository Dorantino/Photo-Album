import Album from './components/Album';
import { Photo } from "@/tools/samples.model";
import { getPhotos } from "@/tools/DataManager";


export default async function  Home() {

  const albumData: Photo[] = await getPhotos();
  return (
    <div className="text-blue-400 p-4">
      <Album albumData={albumData}/>
    </div>
  );
}
