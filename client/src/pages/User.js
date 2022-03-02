import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {FaPause, FaPlay, FaSpotify} from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";

export default function User() {

    const params = useParams();
    const app_userid = params.id;
    const [user, setUser] = useState({})
    const [currentSong, setCurrentSong] = useState(null)
    const [topSongs, setTopSongs] = useState(null)


    useEffect(() => {
        (async () => {
            let profile = await getUserProfile();
            setUser(profile)

            let currently_playing = await getUserCurrentlyPlaying();
            setCurrentSong(currently_playing)

            let top_tracks = await getUserTopSongs();
            setTopSongs(top_tracks)
        })();

        const i = setInterval(async () => {
            let currently_playing = await getUserCurrentlyPlaying();
            setCurrentSong(currently_playing)
        }, 30000)

        return () => {
            clearInterval(i)
        }
    }, [])

    async function getUserProfile() {
        return fetch(`/api/user/${app_userid}`)
            .then(res => res.json())
            .then(user => {
                return user
            })
    }

    async function getUserCurrentlyPlaying() {
        return fetch(`/api/songs/${app_userid}/currently_playing`)
            .then(res => res.json())
            .then(currentSong => {
                return currentSong
            })
    }

    async function getUserTopSongs() {
        return fetch(`/api/songs/${app_userid}`)
            .then(res => res.json())
            .then(topSongs => {
                return topSongs.items
            })
    }

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-10 flex flex-col items-center">

                <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-sm text-black/50" id="follower-count-text">
                    {user.follower_count ? user.follower_count : 0} followers
                </p>


                <a id="spotify-profile-link"
                href={"https://open.spotify.com/user/" + user.spotify_userid}
                    className="flex mt-6 justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg shadow-spotify-green/50 shadow-md btn-anim">
                    <FaSpotify className="fa fa-spotify text-1xl text-center text-white mr-2" aria-hidden="true"></FaSpotify>
                    Spotify
                </a>
            </div>

            <div className="currently-listening my-20">
                <h5 className="text-center font-bold text-lg my-2 text-black/50">I'm currently listening to</h5>

                {/* <p>{JSON.stringify(currentSong)}</p> */}

                <a id="currently-listening-data-url" href={currentSong ? currentSong.item.external_urls.spotify : ""}>

                    {currentSong ? (
                        <>
                        <div id="currently-listening-song"
                            className={currentSong.is_playing ? "flex bg-white border w-fit rounded-lg m-auto items-center btn-anim hover:drop-shadow-lg" : "flex bg-white border w-fit rounded-lg m-auto items-center btn-anim hover:drop-shadow-lg opacity-70"}>

                            <img src={currentSong.item.album.images[0].url} className="h-14 rounded-tl-lg rounded-bl-lg" />


                            <div className="mx-4">
                                <p className="font-bold">{currentSong.item.name}</p>
                                <p className="text-black/50 text-sm">{currentSong.item.artists[0].name}</p>
                            </div>

                            {currentSong.is_playing ? (<FaPlay className="mx-3" />) : (<FaPause className="mx-3" />)}

                        </div>

                        <p className="text-sm text-center mt-3 italic text-black/30">*Songs updates every 30 seconds (beta)</p>
                        </>
                    ) : (
                        <div id="currently-listening-song"
                            className="flex bg-white border w-fit rounded-lg m-auto items-center btn-anim">
                            <p className='p-4 text-black/50 italic'>I'm not listening to anything right now</p>
                        </div>
                    )}



                </a>

            </div>

            <h4 className="text-center font-bold my-4">Top songs of the month</h4>

            {topSongs && (
                <div id="top-tracks" className="flex flex-wrap">
                    {topSongs.map((
                        {
                            name,
                            artists,
                            external_urls: { spotify: url },
                            album: { images: [bigImage] }
                        }, index
                    ) => (<div key={index} className="group z-0 lg:w-1/5 w-1/2 md:w-1/3 btn-anim hover:z-50">

                        <img src={bigImage.url} className="w-fit h-auto" />

                        <a href={url}>
                            <div className="hidden group-hover:flex group-hover:flex-col group-hover:drop-shadow-bg absolute top-0 left-0 bg-black/50 w-full h-full justify-center items-center">

                                <h1 className="text-white text-center font-bold">{name}</h1>
                                <p className="text-white text-sm text-center">{artists[0].name}</p>

                            </div>

                        </a>

                    </div>))}



                </div>
            )}
        </div>
    )
}
