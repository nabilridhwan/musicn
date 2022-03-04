import NavigationBar from "../components/NavigationBar";

export default function Home() {

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>
                    Share your top songs with your friends!
                </h1>

                <h3 className="my-4 text-lg">
                    With <span className="font-bold">Musicn</span>, you have your own Spotify profile page which shows the song you're listening to along with your top songs of the month! Copy the link and send it to your friends (or maybe, paste it in your Instagram's bio!)
                </h3>

                <a href="/signup" className="block bg-spotify-green shadow-lg shadow-spotify-green/50 w-fit m-auto p-4 rounded-lg my-20 text-white font-bold">
                    Get Started
                </a>



                <p className="my-5">
                    This little web application is made by <a href="https://github.com/nabilridhwan" className="underline font-bold">Nabil Ridhwan</a>.
                    And is made possible using Node.js, Express, Tailwind CSS, Supabase and Spotify's API. <a href="https://github.com/nabilridhwan/spotifyer" className="underline font-bold">Musicn</a> is open-sourced and will always be!

                </p>

            </div>
        </div>
    )
}