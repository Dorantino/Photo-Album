import { getTechnologies, getTechnologiesForCourse } from "@/tools/DataManager";
import { Technology } from "@/tools/data.model";


export default async function Home() {

  // let technologies:Technology[] = await getTechnologies();
  let technologiesForCourse:Technology[] = await getTechnologiesForCourse("PROG3017");

  return (
    <pre>
      {/* {JSON.stringify(technologies, null, "\t")} */}
      {JSON.stringify(technologiesForCourse, null, "\t")}
    </pre>
  );
  
}