// drop collection if already exists
db.photoAlbum.drop();
// insert new documents into collection
db.photoAlbum.insert([
    {
        title: "Rawdon River Bridge",
        caption: "Our little bridge after an ice storm",
        source: "winterBridge.jpg",
        width: 375,
        height: 500,
        comments: [
            { comment: "For testing purposes of course ;)", author: "This is a new comment added here!" },
            { comment: "And another comment added!", author: "Sean Morrow" }
        ]
    },
    {
        title: "Canoeing and Camping",
        caption: "Camping deep in the interior of Algonquin Provincial Park",
        source: "algonquinPark.jpg",
        width: 375,
        height: 500,
        comments: [
            { comment: "Josh was here!", author: "Some guy" }
        ]
    },
    {
        title: "Saturday at the Beach",
        caption: "Getting in some beach fun at White Point Beach Resort",
        source: "beach.jpg",
        width: 500,
        height: 375,
        comments: [
            { comment: "Some comments added to this picture :P", author: "Some Guy" },
            { comment: "and another comment here", author: "another guy" }
        ]
    },
    {
        title: "Rainy Day",
        caption: "Rainy day on the shores of Bras d`Or Lake in Cape Breton",
        source: "capeBreton.jpg",
        width: 375,
        height: 500
    },
    {
        title: "Fall is here!",
        caption: "Taking in the fall colours at the top of Wentworth",
        source: "fallColours.jpg",
        width: 375,
        height: 500,
        comments: [
            { comment: "Take this picture down now!", author: "Annonymous" }
        ]
    },
    {
        title: "Final Work Experience Debrief",
        caption: "The graduating IT class of NSCC, Truro Campus",
        source: "itGrads.jpg",
        width: 500,
        height: 375
    },
    {
        title: "Bottom of the Sea View",
        caption: "An amazing aquarium right at the base of the CN Tower",
        source: "ripleysAquarium.jpg",
        width: 500,
        height: 375
    },
    {
        title: "Hitting the Hill",
        caption: "Minus twenty degrees celsius and we are still on the hill!",
        source: "wentworth.jpg",
        width: 500,
        height: 375
    },
    {
        title: "Camping along the Rocks",
        caption: "Best camping spot ever!",
        source: "camping.jpg",
        width: 500,
        height: 375
    },
    {
        title: "Stay off the Black Rocks!",
        caption: "Warning sign posted at Peggy`s Cove for foolish tourists",
        source: "peggysCove.jpg",
        width: 500,
        height: 375
    },
    {
        title: "Altitude Sickness",
        caption: "The long climb up Jacob`s Ladder in Victoria Park, Truro",
        source: "jacobsLadder.jpg",
        width: 375,
        height: 500,
        comments: [
            { comment: "first posting!", author: "testing dude" }
        ]
    }
]);