import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

export default function Error() {

    let params = useParams();
    let [error, setError] = useState([])

    useEffect(() => {
        (async () => {
            setError(await getError(params.code))
        })();
    }, [])

    async function getError(code){
        return fetch("/api/error/" + code)
        .then(res => res.json())
        .then(data => {
            return data[0];
        })
    }

    return (
        <div className="">

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>
                    {error.title}
                </h1>
            </div>

            <p className="text-center">
                {error.description}
            </p>


            <div className="mt-5">

            <h3 className="font-bold text-center">Resolution</h3>
            <p className="text-center">
                {error.resolution}
            </p>
            </div>

        </div>
    )
}