import Jumbotron from "../Jumbotron";
import { FaArrowRight, FaSave } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import DOMToImage from "dom-to-image";
import { saveAs } from 'file-saver';

export default function StepTwo({ username, term, onClickButton }) {

    const [topSongs, setTopSongs] = useState([]);
    const elemRef = useRef(null);

    useEffect(() => {

        (async () => {

            let data = await fetch(`/api/v1/songs/${username}/top_songs?term=${term}`).then(res => res.json());
            setTopSongs(data);

            console.log(data)
        })();
    }, [])

    const handleSave = () => {
        if (elemRef.current) {
            DOMToImage.toBlob(elemRef.current)
                .then(function (blob) {
                    saveAs(blob, 'my-node.png');
                });
        }
    }


    return (
        <Jumbotron>
            <p className="my-4 muted text-lg leading-relaxed">
                Okay... we're done!
            </p>

            <h1 className="my-10">
                Here you go!
            </h1>

            <button onClick={handleSave} className="flex justify-center items-center mt-10 w-fit m-auto btn p-4 shadow-lg shadow-brand-color/50">
                Save
                <FaSave className="ml-5" />
            </button>

            <div className="my-10">
                {topSongs.length != 0 && topSongs.hasOwnProperty("items") && (
                    <Grid elemRef={elemRef} tracks={topSongs.items} username={username} term={term}/>
                )}
            </div>

        </Jumbotron>
    )
}