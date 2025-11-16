import { getJSONData } from "./Toolkit";
import { Photo } from "./samples.model";

export async function getPhotos() {
  // // request url of Web API to retrieve JSON
  const RETRIEVE_SCRIPT: string = "http://my-api-server/retrieveAlbum.php?count=11";

  // fetch the data from the web api
  const data = await getJSONData(RETRIEVE_SCRIPT, 0, true);

  const albumData: Photo[] = data.photos;

  return albumData;
}