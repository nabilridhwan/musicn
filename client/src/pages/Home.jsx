import { Link } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";

export default function Home() {

    return (
        <Container>

            <NavigationBar />


            <Jumbotron>

                    <h1 className="my-10">
                        Share your top songs with your friends!
                    </h1>

                    <p className="my-4 text-lg leading-relaxed">

                        With <span className="font-bold text-brand-color">Musicn</span>, you have your own Spotify profile page showing the song you're listening to, your top songs of the month, and recently played songs! Also, share your profile with your friends with a click of a button!

                    </p>

                    <Link to="/signup" className="block mt-10 w-fit m-auto btn p-4 shadow-lg shadow-brand-color/50">
                        Get Started
                    </Link>

            </Jumbotron>
            <Footer />
        </Container >
    )
}