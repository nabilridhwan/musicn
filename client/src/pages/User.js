import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaUser, FaSpotify, FaShareAlt, FaPlay, FaPause, FaExclamationTriangle, FaStopCircle, FaPlus, FaPlusCircle } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import relativeDate from "relative-date";
import SpotifyButton from "../components/SpotifyButton";
import { useQuery } from "react-query"
import queryClient from "../utils/queryClient";
import { Helmet } from "react-helmet";

export default function User() {

    const params = useParams();
    const app_userid = params.id;


    const { data: user, status: userStatus } = useQuery("user", () => fetch(`/api/v1/user/${app_userid}`).then(res => res.json()))
    const { data: currentSong, status: currentSongStatus } = useQuery("currently_playing", () => fetch(`/api/v1/songs/${app_userid}/currently_playing`).then(res => res.json()), {
        staleTime: 1000,
        cacheTime: 0,
        refetchOnWindowFocus: true,
        refetchInterval: 30000,
        refetchIntervalInBackground: 0,
    })
    const { data: topSongs, status: topSongsStatus } = useQuery("top_songs", () => fetch(`/api/v1/songs/${app_userid}/top_songs`).then(res => res.json()), {
        cacheTime: 0
    })
    const { data: recentlyPlayed, status: recentlyPlayedStatus } = useQuery("recently_played", () => fetch(`/api/v1/songs/${app_userid}/recently_played`).then(res => res.json()), {
        cacheTime: 0
    })


    const [sections] = useState(["Top Songs", "Recently Played"]);
    const [currentActiveSection, setCurrentActiveSection] = useState("Top Songs");

    useEffect(() => {
        console.log(`%c userStatus: ${userStatus}`, "color: red;")
        console.log(`%c currentSongStatus: ${currentSongStatus}`, "color: lightblue;")
        console.log(`%c topSongsStatus: ${topSongsStatus}`, "color: lightgreen;")
        console.log(`%c recentlyPlayedStatus: ${recentlyPlayedStatus}`, "color: pink;")
        console.log(`%c                      `, "background-color: black;")

    }, [userStatus, currentSongStatus, topSongsStatus, recentlyPlayedStatus])

    useEffect(() => {
        if (currentActiveSection === "Top Songs") {
            queryClient.invalidateQueries("top_songs")
        } else {
            queryClient.invalidateQueries("recently_played")
        }

    }, [currentActiveSection])

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
                userStatus == "success" && (
                    <Helmet>
                        <title>{decodeURI(user.name)} - Musicn</title>
                        <meta name="description" content={`Check out ${decodeURI(user.name)}'s Top Songs on Musicn!`} />
                    </Helmet>
                )
            }


            <div className="py-2 flex">
                <p className="flex-1 text-sm text-black/50 text-center">
                    Want your profile too? <Link className="underline" to="/">Click here</Link>
                </p>
            </div>


            <div className="my-10 flex items-center justify-center">

                {userStatus == "success" && user.profile_pic_url && user.profile_pic_url != "null" ?

                    <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                    :
                    <div className="h-24 w-24 m-1 flex justify-center items-center bg-brand-color rounded-full">
                        <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                    </div>
                }

                <div className="ml-4">

                    {userStatus == "success" && user.name && user.username ? (
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


                    {userStatus == "success" ? (
                        <SpotifyButton href={"https://open.spotify.com/user/" + user.spotify_userid} text="Profile" profileButton={true} />
                    ) : (

                        <SpotifyButton href={""} text="Profile" profileButton={true} />
                    )

                    }

                </div>

            </div>

            <div className="currently-listening my-14 flex-col justify-center">

                <>

                    <h5 className="text-center font-bold text-black/70">I'm currently listening to</h5>
                    {currentSongStatus == "success" && currentSong && currentSong.currently_playing_type == "track" ? (

                        <div className={`flex bg-white rounded-lg border w-fit m-auto transition ease-out items-center ${(currentSong.is_playing && "scale-105 drop-shadow-lg")}`}>


                            <img src={currentSong.item.album.images[0].url} className="h-14 p-1.5" />

                            <div className="mx-4">
                                <p className="font-bold">

                                    {/* Below block will show when the md breakpoint is hit */}
                                    <span className="hidden md:block">
                                        {currentSong.item.name}
                                    </span>

                                    {/* Below block will hide when the md breakpoint is hit */}
                                    <span className="block md:hidden">
                                        {currentSong.item.name.length > 25 ? (
                                            currentSong.item.name.substring(0, 25) + "..."
                                        ) : (
                                            currentSong.item.name
                                        )}
                                    </span>
                                </p>
                                <p className="text-black/50 text-sm">{currentSong.item.artists[0].name}</p>
                            </div>

                            <div className="mr-4 text-lg text-spotify-green">
                                <a href={currentSong.item.external_urls.spotify}>
                                    <FaSpotify className="transition ease-out duration-500 hover:scale-125" />
                                </a>
                            </div>


                        </div>

                    ) : (
                        <div className="w-fit mx-auto">

                            <div className="bg-white border mx-5">
                                {currentSong && currentSong.error ? (
                                    <span className="p-4 flex flex-col md:flex-row items-center">
                                        <FaExclamationTriangle className="fa fa-exclamation-triangle text-xl text-center text-red-500" aria-hidden="true" />
                                        <p className="text-center mt-2 md:mt-0 md:ml-2 text-red-500">Error fetching songs. Click <a className="underline" href="/error/3">here</a> for more info!</p>
                                    </span>
                                ) : (

                                    <p className="p-4 text-black/50 italic">
                                        I'm not listening to anything right now
                                    </p>
                                )}

                            </div>
                        </div>
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

                topSongsStatus == "success" && topSongs && topSongs.items.length > 0 ? (
                    <>

                        <h4 className="text-center text-xl font-bold my-4">Top songs of the month</h4>
                        <div id="top-tracks" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-2 gap-2">
                            {topSongs.items.map((
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
            )}



            {currentActiveSection == "Recently Played" && (
                recentlyPlayedStatus == "success" && recentlyPlayed.items ? (
                    <>

                        <h4 className="text-center font-bold text-xl my-4">Recently Played Songs</h4>
                        <div id="top-tracks" className="flex flex-wrap items-stretch">
                            {recentlyPlayed.items.map((
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
            )}


            {/* Share button */}
            <div className="fixed bottom-0 w-full flex justify-center items-center">
                <button onClick={handleShare} className="bg-blue-500 transition ease-out duration-500 rounded-lg p-3 mb-5 flex items-center btn-anim shadow-lg shadow-blue-500/50 text-white">

                    <FaShareAlt className="mr-2" />
                    Share with your friends!
                </button>
            </div>
        </div >

    )
}
