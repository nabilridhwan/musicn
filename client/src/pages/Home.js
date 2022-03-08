import NavigationBar from "../components/NavigationBar";

export default function Home() {

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1 className="my-10">
                    Share your top songs with your friends!
                </h1>

                <p className="my-4 text-lg leading-relaxed">
                    With <span className="font-bold">Musicn</span>, you have your own Spotify profile page which shows the song you're listening to along with your top songs of the month! Copy the link and send it to your friends (or maybe, paste it in your Instagram's bio!)
                </p>

                <a href="/signup" className="block bg-brand-color shadow-lg shadow-spotify-green/50 w-fit m-auto p-4 rounded-lg my-1 text-brand-text-color font-bold">
                    Get Started
                </a>



                <p className="my-20">
                    This little web application is made by <a href="https://github.com/nabilridhwan" className="underline font-bold">Nabil Ridhwan</a>.
                    And is made possible using Node.js, Express, Tailwind CSS, Supabase, React and Spotify's API. Musicn is <a href="https://github.com/nabilridhwan/musicn" className="underline font-bold">open-source</a> and will always be!

                </p>

            </div>
        </div>
    )
}