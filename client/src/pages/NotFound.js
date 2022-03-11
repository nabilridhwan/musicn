import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

export default function NotFound() {

    return (
        <div className="">

            <NavigationBar />

            <Helmet>
                <title>Not Found - Musicn</title>
            </Helmet>

            <>
                <div className="jumbotron my-24">
                    <h1>
                        Hey, you seem lost...
                    </h1>

                    <h3>
                        Hey officer! We found the lost one! Bring them to <Link className="underline" to="/">home</Link> page!
                    </h3>
                </div>
            </>


        </div>
    )
}