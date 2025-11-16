"use client"

// need to install react-spinners for this component to work
// with docker - must shut down, clear volumes, and rebuild / spinup all containers
import PuffLoader from 'react-spinners/PuffLoader';

// included this here and not in quotes.model.ts so that LoadingOverlay component is easily reusable in other apps
interface LoadingOverlayProps {
    show?:boolean;
    showSpinner?:boolean    
    spinnerColor?:string;
    bgColor?:string;
    
    
}

export default function LoadingOverlay({show = true, bgColor = "#000000", spinnerColor = "#FFFFFF", showSpinner = true}:LoadingOverlayProps) {
    return (
        (show)
        ? 
        <div className="flex justify-center items-center fixed z-50 inset-0 w-full h-full " style={{backgroundColor:"bg-greyAccent", position: "relative", width:"100%", height:"100%", display:"flex" , justifyContent:"left", alignItems:"center"}}><>Loading...</>
            {(showSpinner) ? 
            <PuffLoader 
                color={spinnerColor}
                size={25} />
            : <div></div>}
        </div>
        : <div></div>
    );
}