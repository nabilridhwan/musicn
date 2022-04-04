import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaUser, FaSpotify, FaShareAlt, FaPlay, FaPause, FaExclamationTriangle, FaStopCircle, FaPlus, FaPlusCircle } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import SpotifyButton from "../components/SpotifyButton";
import CurrentlyPlayingCard from "../components/CurrentlyPlaying/CurrentlyPlayingCard";
import CurrentlyPlayingError from "../components/CurrentlyPlaying/CurrentlyPlayingError";
import TopSong from "../components/TopSongs/TopSong";
import TopSongs from "../components/TopSongs/TopSongs";
import RecentlyPlayed from "../components/RecentlyPlayed/RecentlyPlayed";
import Container from "../components/Container";
import DOMToImage from "dom-to-image";

export default function User() {

    const params = useParams();
    const app_userid = params.id;

    const [user, setUser] = useState({});
    const [currentSong, setCurrentSong] = useState({});
    const [topSongs, setTopSongs] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

    const saveRef = useRef(null);


    const [sections] = useState(["Top Songs", "Recently Played"]);
    const [currentActiveSection, setCurrentActiveSection] = useState("Top Songs");

    useEffect(() => {

        (async () => {
            const userData = await fetch(`/api/v1/user/${app_userid}`).then(res => res.json())
            setUser(userData)
        })();

        (async () => {
            const currentSongData = await fetch(`/api/v1/songs/${app_userid}/currently_playing`).then(res => res.json())
            console.log(currentSongData)
            setCurrentSong(currentSongData)
        })();


        (async () => {
            const topSongData = await fetch(`/api/v1/songs/${app_userid}/top_songs`).then(res => res.json())
            setTopSongs(topSongData)
        })();

        (async () => {
            const recentlyPlayedData = await fetch(`/api/v1/songs/${app_userid}/recently_played`).then(res => res.json())
            setRecentlyPlayed(recentlyPlayedData)
        })();
    }, [app_userid])

    async function handleShare() {
        // console.log(saveRef)
        // DOMToImage.toPng(saveRef.current).then(function (dataUrl) {
        //     console.log(dataUrl)
        //     var link = document.createElement('a');
        //     link.download = 'topSongs.png';
        //     link.href = dataUrl;
        //     link.click();
        // })

        try {

            await navigator.share({
                url: window.location.href,
                title: "Musicn",
                text: "Check out my top songs of the month!"
            })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>

            <NavigationBar />

            {/* <div className="py-2 flex">
                <p className="flex-1 text-sm text-black/50 text-center">
                    Want your profile too? <Link className="underline" to="/">Click here</Link>
                </p>
            </div> */}


            <div className="my-10 flex items-center justify-center">

                {user.profile_pic_url && user.profile_pic_url != "null" ?

                    <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                    :
                    <div className="h-24 w-24 m-1 flex justify-center items-center bg-brand-color rounded-full">
                        <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                    </div>
                }

                <div className="ml-4">

                    {user.name && user.username ? (
                        <>

                            <h2 className="text-3xl font-bold">{user.name && decodeURI(user.name)}</h2>
                            <p className="text-sm text-black/50" id="follower-count-text">
                                @{user.username}
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold">
                                Unknown User
                            </h2>
                            <p className="text-sm text-black/50" id="follower-count-text">
                                Unknown User
                            </p>
                        </>
                    )}


                    {user.name && user.username ? (
                        <SpotifyButton href={"https://open.spotify.com/user/" + user.spotify_userid} text="Profile" profileButton={true} />
                    ) : (

                        <SpotifyButton href={""} text="Profile" profileButton={true} />
                    )

                    }

                </div>

            </div>

            <h5 className="text-sm text-center font-bold text-black/50">
                I'm currently listening to
            </h5>

            <div className="currently-listening my-5 flex justify-center">

                <>

                    {currentSong.hasOwnProperty("error") ? (

                        <CurrentlyPlayingError>
                            <FaExclamationTriangle className="fa fa-exclamation-triangle text-xl text-center text-red-500" aria-hidden="true" />
                            <p className="text-center mt-2 md:mt-0 md:ml-2 text-red-500">Error fetching songs. Click <a className="underline" href="/error/3">here</a> for more info!</p>
                        </CurrentlyPlayingError>
                    ) : (
                        currentSong.hasOwnProperty("item") ? (
                            <CurrentlyPlayingCard track={currentSong} />
                        ) : (

                            <CurrentlyPlayingError>
                                <p className="muted">
                                    I'm not playing anything right now
                                </p>
                            </CurrentlyPlayingError>
                        )
                    )}
                </>
            </div>

            {/* Section tab bar */}

            <div className="flex justify-evenly">
                {sections.map((section, key) => (
                    <div key={key} onClick={() => setCurrentActiveSection(section)} className="flex flex-col items-center cursor-pointer">
                        <div>
                            <p className={`text-center transition-all ${currentActiveSection == section && "font-bold text-brand-color"}`}>
                                {section}
                            </p>
                        </div>

                        <div className={`transition-all rounded-full w-1.5 h-1.5 mt-2 ${currentActiveSection == section ? "bg-brand-color" : "bg-white"}`}></div>
                    </div>
                ))}

            </div>



            {currentActiveSection == "Top Songs" && (
                topSongs.hasOwnProperty("items") && topSongs.items.length > 0 ? (
                    <TopSongs elemRef={saveRef} tracks={topSongs} />
                ) : (
                    <p className="text-center italic">Wow this is scary! This user does not have their top songs!</p>
                )
            )}



            {currentActiveSection == "Recently Played" && (
                recentlyPlayed.hasOwnProperty("items") ? (
                    <>
                        <RecentlyPlayed tracks={recentlyPlayed} />
                    </>
                ) : (
                    <p className="text-center italic">Wow this is scary! This user does not have their recent songs!</p>
                )
            )}


            {/* Share button */}
            <div className="fixed bottom-0 w-full flex justify-center items-center">
                <button onClick={handleShare} className="bg-blue-500 transition ease-out duration-500 rounded-lg p-3 mb-5 flex items-center btn-anim shadow-lg shadow-blue-500/50 text-white">

                    <FaShareAlt className="mr-2" />
                    Share with your friends!
                </button>
            </div>
        </Container >

    )
}
