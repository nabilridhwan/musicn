import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function Home() {

    return (
        <div>

            <NavigationBar />

            <Helmet>
                <title>Home - Musicn</title>
                <meta name="description" content="With Musicn, you have your own Spotify profile page showing the song you're listening to, your top songs of the month, and recently played songs! Also, share your profile with your friends with a click of a button!" />
            </Helmet>

            <div className="jumbotron my-24">
                <h1 className="my-10">
                    Share your top songs with your friends!
                </h1>

                <p className="my-4 text-lg leading-relaxed">

                    With <span className="font-bold text-brand-color">Musicn</span>, you have your own Spotify profile page showing the song you're listening to, your top songs of the month, and recently played songs! Also, share your profile with your friends with a click of a button!

                </p>

                <Link to="/signup" className="block mt-10 w-fit m-auto btn p-4 shadow-lg shadow-brand-color/50">
                    Get Started
                </Link>



                <p className="my-20 text-sm">
                    This little web application is made by <a href="https://github.com/nabilridhwan" className="underline font-bold">Nabil Ridhwan</a>.
                    And is made possible using Node.js, Express, Tailwind CSS, Supabase, React and Spotify's API. Musicn is <a href="https://github.com/nabilridhwan/musicn" className="underline font-bold">open-source</a> and will always be!

                </p>

            </div>
        </div>
    )
}