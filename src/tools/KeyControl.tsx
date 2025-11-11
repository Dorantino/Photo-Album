// KeyControl Component
// runs a designated event handler (function) when a specific key is pressed
// properties:
// eventHandler:Function - the function to run when the key press is detected
// keyToDetect:string - the key to detect. The key is represented as a string (for instance "Tab" for the tab key). See the following for all key codes: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values

"use client";

import { useEffect } from "react";

export default function KeyControl({eventHandler, keyToDetect}:{eventHandler:Function, keyToDetect:string}) {

    // ---------------------------------------------- event handers
    const handleKeyPress = (e:KeyboardEvent) => {
        if (e.key === keyToDetect) {
            // keyToDetect has been pressed - call event handler!
            eventHandler(e);
        }
    };
    
    // useEffect() to wire up the event listener
    // Why do this in a useEffect?
    // Everytime a re-render happens, all the component functions run again. This means a new event handler has been constructed and the previous one no longer exists. Therefore, the new event handler needs to be wired up to the event listener again on every change of the event handler. This is why the eventHandler property is in the useEffect's depenency array.
    useEffect(() => {
        // add event listener to listen for key presses
        document.addEventListener('keydown', handleKeyPress);

        // this is the useEffect's cleanup function
        // it is executed when the eventHandler property changes before running the effect. Utlimately, it removes the old event listener before wiring up a new one - otherwise you would end up with multiple event listeners for the same key press after repeate renders of the component
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [eventHandler]);

    return null;
}