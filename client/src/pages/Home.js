import NavigationBar from "../components/NavigationBar";

const SHOW_DIALOG = true;
const SCOPE = "user-read-private user-read-email user-top-read user-read-currently-playing"
const CLIENT_ID = "e849dc093c46431e99a380047315750d"
const REDIRECT_URI = "http://localhost:4000/api/auth/callback"
// const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`
const URL = `/api/auth`

export default function Home() {
    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-52">
                <h1>
                    Share your top songs with your friends!
                </h1>

                <h3 className="my-4 text-lg">
                    With <span className="font-bold">Musicn</span>, you have your own Spotify profile page which shows the song you're listening to along with your top songs of the month! Copy the link and send it to your friends (or maybe, paste it in your Instagram's bio!)
                </h3>

                <p className="italic" >
                    Please note that Musicn is currently in beta and is only working for beta testers. Please contact me if you want to be part of the Beta Testing program!
                </p>

                <p className="my-5">
                    This little web application is made by <a href="https://github.com/nabilridhwan" className="underline font-bold">Nabil Ridhwan</a>.
                    And is made possible using Node.js, Express, Tailwind CSS, Supabase and Spotify's API. <a href="https://github.com/nabilridhwan/spotifyer" className="underline font-bold">Musicn</a> is open-sourced and will always be!

                </p>

                <a href={URL} className="block bg-spotify-green shadow-lg shadow-spotify-green/50 w-fit m-auto p-4 rounded-lg my-20 text-white font-bold btn-anim">
                    Get Started
                </a>

            </div>
        </div>
    )
}