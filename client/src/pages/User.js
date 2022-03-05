import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaUser, FaSpotify } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import relativeDate from "relative-date";

export default function User() {

    const params = useParams();
    const app_userid = params.id;
    const [user, setUser] = useState({})
    const [currentSong, setCurrentSong] = useState(null)
    const [recentlyPlayed, setRecentlyPlayed] = useState(null)
    const [topSongs, setTopSongs] = useState(null)
    const navigate = useNavigate() 


    useEffect(() => {
        (async () => {
            let profile = await getUserProfile();
            setUser(profile)

            let currently_playing = await getUserCurrentlyPlaying();
            setCurrentSong(currently_playing)

            let recently_played = await getUserRecentlyPlayed();
            setRecentlyPlayed(recently_played)

            let top_tracks = await getUserTopSongs();
            setTopSongs(top_tracks)
        })();

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
                return null
            })
    }

    async function getUserTopSongs() {
        return fetch(`/api/songs/${app_userid}/top_songs`)
            .then(res => res.json())
            .then(topSongs => {
                return topSongs.items
            })
    }

    return (
        <div>

            <NavigationBar />

            <div className="my-10 flex items-center justify-center">

                {user.profile_pic_url ?

                    <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                    :
                    <div className="h-24 w-24 m-1 flex justify-center items-center bg-spotify-green rounded-full">
                        <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                    </div>
                }

                <div className="ml-4">

                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-sm text-black/50" id="follower-count-text">
                        {user.follower_count ? user.follower_count : 0} followers on Spotify
                    </p>


                    <a id="spotify-profile-link"
                        href={"https://open.spotify.com/user/" + user.spotify_userid}
                        className="flex mt-2 justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg hover:shadow-md hover:shadow-spotify-green/50 transition ease-out duration-500">
                        <FaSpotify className="fa fa-spotify text-1xl text-center text-white mr-2" aria-hidden="true"></FaSpotify>
                        Spotify
                    </a>
                </div>

            </div>

            <div className="currently-listening my-20">
                <h5 className="text-center font-bold text-lg my-2 text-black/50">I'm currently listening to</h5>


                {currentSong ? (

                    <a id="currently-listening-data-url" href={currentSong.item.external_urls.spotify}>
                        <div id="currently-listening-song"
                            className={"flex bg-white border w-fit m-auto transition ease-out items-center hover:drop-shadow-lg"}>

                            <img src={currentSong.item.album.images[0].url} className="h-14" />

                            <div className="mx-4">
                                <p className="font-bold">{currentSong.item.name}</p>
                                <p className="text-black/50 text-sm">{currentSong.item.artists[0].name}</p>
                            </div>

                        </div>
                    </a>

                ) : (
                    <div id="currently-listening-song"
                        className="flex bg-white border w-fit lg m-auto items-center">

                        <p className='p-4 text-black/50 italic'>I'm not listening to anything right now</p>
                    </div>
                )}


            </div>


            {topSongs && topSongs.length > 0 ? (
                <>

                    <h4 className="text-center font-bold my-4">Top songs of the month</h4>
                    <div id="top-tracks" className="flex flex-wrap items-stretch">
                        {topSongs.map((
                            {
                                name,
                                artists,
                                external_urls: { spotify: url },
                                album: { images: [bigImage] }
                            }, index
                        ) => (<div key={index} className="lg:w-1/5 w-1/2 md:w-1/3">


                            <div className="bg-white h-auto">


                                <img src={bigImage.url} className="w-fit h-auto" />

                                <div className="py-7">


                                    <h1 className="text-black text-center font-bold">{name}</h1>
                                    <p className="text-black/50 text-sm text-center">{artists.map(a => a.name).join(", ")}</p>

                                    <div>


                                        <a id="spotify-profile-link"
                                            href={url}
                                            className="flex mt-4 mx-auto w-fit justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg hover:shadow-md hover:shadow-spotify-green/50 transition ease-out duration-500">
                                            <FaSpotify className="fa fa-spotify text-1xl text-center text-white " aria-hidden="true"></FaSpotify>
                                        </a>
                                    </div>

                                </div>

                            </div>


                        </div>))}



                    </div>
                </>
            ) : (
                <p className="text-center italic">Wow this is scary! This user does not have their top songs!</p>
            )}

            {recentlyPlayed ? (
                <>

                    <h4 className="text-center font-bold my-4">Recently Played Songs</h4>
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
                        ) => (<div key={index} className="lg:w-1/5 w-1/2 md:w-1/3">


                            <div className="bg-white h-auto">


                                <img src={bigImage.url} className="w-fit h-auto" />

                                <div className="py-7">


                                    <p className="text-center text-black/50">{relativeDate(new Date(played_at))}</p>
                                    <h1 className="text-black text-center font-bold">{name}</h1>
                                    <p className="text-black/50 text-sm text-center">{artists.map(a => a.name).join(", ")}</p>

                                    <div>


                                        <a id="spotify-profile-link"
                                            href={url}
                                            className="flex mt-4 mx-auto w-fit justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg hover:shadow-md hover:shadow-spotify-green/50 transition ease-out duration-500">
                                            <FaSpotify className="fa fa-spotify text-1xl text-center text-white " aria-hidden="true"></FaSpotify>
                                        </a>
                                    </div>

                                </div>

                            </div>


                        </div>))}



                    </div>
                </>
            ) : (
                <p className="text-center italic">Wow this is scary! This user does not have their recent songs!</p>
            )}
        </div>
    )
}
