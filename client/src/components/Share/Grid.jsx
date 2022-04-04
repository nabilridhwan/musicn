import Item from "./Item";

export default function Grid({ elemRef, tracks, username, term }) {

    console.log(tracks);

    const ALL_TERMS = {
        short_term: "the last month",
        medium_term: "the last 6 months",
        long_term: "all time"
    }

    return (
        <div ref={elemRef}
        className="bg-white p-1"
        >
                <p className="font-bold text-2xl my-2">{username}'s top tracks of {ALL_TERMS[term]}</p>
            <div
                className="grid grid-cols-3 mx-auto"
            >


                {tracks.map((track, index) => (
                    <Item key={track.id} track={track} />
                ))}
            </div>
        </div>
    )
}