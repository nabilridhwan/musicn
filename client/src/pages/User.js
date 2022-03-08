import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaUser, FaSpotify, FaShareAlt, FaPlay, FaPause, FaExclamation, FaStopCircle, FaPlus, FaPlusCircle } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import relativeDate from "relative-date";
import SpotifyButton from "../components/SpotifyButton";

export default function User() {

    const params = useParams();
    const app_userid = params.id;
    const [user, setUser] = useState({})
    const [currentSong, setCurrentSong] = useState(null)
    const [recentlyPlayed, setRecentlyPlayed] = useState(null)
    const [topSongs, setTopSongs] = useState(null)
    const navigate = useNavigate()
    const [shareButtonText, setShareButtonText] = useState("Share with your friends!");

    const [sections, setSections] = useState(["Top Songs", "Recently Played"]);

    const [currentActiveSection, setCurrentActiveSection] = useState("Top Songs");

    // Boolean for loading 
    const [playingLoaded, setPlayingLoaded] = useState(false);
    const [topSongsLoaded, setTopSongsLoaded] = useState(false);
    const [recentSongsLoaded, setRecentSongsLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);

    const [currentlyPlayingText, setCurrentlyPlayingText] = useState(
        <p className="p-4 text-black/50 italic">
            I'm not listening to anything right now
        </p>
    );

    useEffect(() => {
        (async () => {
            setUserLoaded(false);
            let profile = await getUserProfile();
            setUser(profile)
            setUserLoaded(true);

        })();
        (async () => {
            setPlayingLoaded(false)
            let currently_playing = await getUserCurrentlyPlaying();
            setCurrentSong(currently_playing)
            setPlayingLoaded(true);

        })();

        (async () => {
            setTopSongsLoaded(false)
            let top_tracks = await getUserTopSongs();
            setTopSongs(top_tracks)
            setTopSongsLoaded(true)
        })();

        (async () => {
            setRecentSongsLoaded(false)
            let recently_played = await getUserRecentlyPlayed();
            setRecentlyPlayed(recently_played)
            setRecentSongsLoaded(true)
        })();

        const currentlyPlayingInterval = setInterval(() => {
            (async () => {
                let currently_playing = await getUserCurrentlyPlaying();
                setCurrentSong(currently_playing)
            })();
        }, 30000);

        return () => {
            clearInterval(currentlyPlayingInterval);
        }
    }, [])

    async function getUserRecentlyPlayed() {
        return fetch(`/api/songs/${app_userid}/recently_played`)
            .then(res => {
                if (res.ok) return res.json()
                else throw res
            })
            .then(recentlyPlayedSongs => {
                if (!recentlyPlayedSongs || recentlyPlayedSongs.items.length == 0) return null
                return recentlyPlayedSongs.items
            }).catch(error => {
                return null
            })
    }

    async function getUserProfile() {
        return fetch(`/api/user/${app_userid}`)
            .then(res => res.json())
            .then(user => {
                if (!user.spotify_userid) throw "User does not have a spotify account"
                return user
            }).catch(err => {
                navigate("/users")
            })
    }

    async function getUserCurrentlyPlaying() {
        return fetch(`/api/songs/${app_userid}/currently_playing`)
            .then(res => {
                if (res.ok) return res.json()
                else throw res
            })
            .then(currentSong => {
                if (currentSong == "") return null
                return currentSong
            }).catch(error => {
                setCurrentlyPlayingText(
                    <p className="p-4 text-black/50 italic">
                        Error getting currently playing song. Click <a className="underline" href="/error/3">here</a> for more info.
                    </p>
                )

            })
    }

    async function getUserTopSongs() {
        return fetch(`/api/songs/${app_userid}/top_songs`)
            .then(res => res.json())
            .then(topSongs => {
                return topSongs.items
            })
    }

    async function handleShare() {
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
        <div>

            <NavigationBar />


            {
                userLoaded && (
                    <>

                        {
                            !localStorage.getItem("profile_pic_url")
                            &&
                            (
                                <div className="py-2 flex">
                                    <p className="flex-1 text-xs text-black/50 text-center">
                                        Want your profile too? <a className="underline" href="/">Click here</a>
                                    </p>
                                </div>
                            )
                        }

                        <div className="my-10 flex items-center justify-center">

                            {user.profile_pic_url ?

                                <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                                :
                                <div className="h-24 w-24 m-1 flex justify-center items-center bg-brand-color rounded-full">
                                    <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                                </div>
                            }

                            <div className="ml-4">

                                <h2 className="text-3xl font-bold">{user.name}</h2>
                                <p className="text-sm text-black/50" id="follower-count-text">
                                    @{user.username}
                                </p>

                                <SpotifyButton href={"https://open.spotify.com/user/" + user.spotify_userid} text="Profile" profileButton={true} />


                            </div>

                        </div>


                    </>
                )
            }

            <div className="currently-listening my-10 flex-col justify-center">

                {playingLoaded && (
                    <>

                        <h5 className="text-center font-bold text-lg my-2 text-black/50">I'm currently listening to</h5>
                        {currentSong && currentSong.currently_playing_type == "track" ? (
                            <>

                                <div id="currently-listening-song">

                                    <a className={`flex bg-white border w-fit m-auto transition ease-out items-center ${(currentSong.is_playing ? "hover:drop-shadow-xl drop-shadow-lg" : "hover:drop-shadow-lg")}`} href={currentSong.item.external_urls.spotify}>
                                        <img src={currentSong.item.album.images[0].url} className="h-14" />

                                        <div className="mx-4">
                                            <p className="font-bold">

                                                {/* Below block will show when the md breakpoint is hit */}
                                                <span className="hidden md:block">
                                                    {currentSong.item.name}
                                                </span>

                                                {/* Below block will hide when the md breakpoint is hit */}
                                                <span className="block md:hidden">
                                                    {currentSong.item.name.length > 30 ? (
                                                        currentSong.item.name.substring(0, 30) + "..."
                                                    ) : (
                                                        currentSong.item.name
                                                    )}
                                                </span>
                                            </p>
                                            <p className="text-black/50 text-sm">{currentSong.item.artists[0].name}</p>
                                        </div>


                                    </a>
                                </div>

                                <p className="text-sm text-black/40 text-center mt-5">
                                    The song updates in intervals of 30 seconds (beta)
                                </p>


                            </>

                        ) : (
                            <div className="w-fit mx-auto">

                                <div className="bg-white border mx-5">

                                    {currentlyPlayingText}
                                </div>
                            </div>
                        )}
                    </>
                )}




            </div>

            {/* Section tab bar */}
            <div className="flex justify-evenly">


                {sections.map((section, key)=> (
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

                topSongsLoaded && (
                    topSongs && topSongs.length > 0 ? (
                        <>

                            <h4 className="text-center text-xl font-bold my-4">Top songs of the month</h4>
                            <div id="top-tracks" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-2 gap-2">
                                {topSongs.map((
                                    {
                                        name,
                                        artists,
                                        external_urls: { spotify: url },
                                        album: { images: [bigImage] }
                                    }, index
                                ) => (<div onClick={() => window.location.href = url} key={index} className="bg-white border cursor-pointer hover:shadow-lg transition ease-out duration-300">

                                        <img src={bigImage.url} className="w-fit h-auto" />

                                        <div className="py-4">


                                            <h1 className="text-black text-center font-bold">{name}</h1>
                                            <p className="text-black/50 text-xs md:text-sm text-center">{artists.map(a => a.name).join(", ")}</p>

                                        </div>

                                </div>))}



                            </div>
                        </>
                    ) : (
                        <p className="text-center italic">Wow this is scary! This user does not have their top songs!</p>
                    )
                )
            )}



            {currentActiveSection == "Recently Played" && (
                recentSongsLoaded && (
                    recentlyPlayed ? (
                        <>

                            <h4 className="text-center font-bold text-xl my-4">Recently Played Songs</h4>
                            <div id="top-tracks" className="flex flex-wrap items-stretch">
                                {recentlyPlayed.map((
                                    {
                                        track: {

                                            name,
                                            artists,
                                            external_urls: { spotify: url },
                                            album: { images: [bigImage] }

                                        },
                                        played_at
                                    }, index
                                ) => (<div key={index} className="w-full hover:drop-shadow-lg transition ease-out duration-500">

                                    <a href={url} className="flex mx-5 my-2 bg-white border items-center">

                                        <img src={bigImage.url} className="w-24 h-24" />

                                        <div className="ml-3" >

                                            <h1 className="md:text-left text-black font-bold">{name}</h1>
                                            <p className="md:text-left text-black/50 text-sm">{artists.map(a => a.name).join(", ")}</p>
                                            <p className="text-black/30 text-xs mt-5">{relativeDate(new Date(played_at))}</p>
                                        </div>

                                    </a>

                                </div>))}



                            </div>
                        </>
                    ) : (
                        <p className="text-center italic">Wow this is scary! This user does not have their recent songs!</p>
                    )
                )
            )}


            {/* Share button */}
            <div className="fixed bottom-0 w-full flex justify-center items-center">
                <button onClick={handleShare} className="bg-blue-500 transition ease-out duration-500 rounded-lg p-3 mb-5 flex items-center btn-anim shadow-lg shadow-blue-500/50 text-white">

                    <FaShareAlt className="mr-2" />
                    {shareButtonText}
                </button>
            </div>
        </div >

    )
}
