import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet";

export default function Error() {

    let params = useParams();
    const { data: error, status, isError } = useQuery("error", async () => {
        const res = await fetch(`/api/v1/error/${params.code}`)
        return res.json();
    })

    useEffect(() => {
    })

    return (
        <div className="">

            <NavigationBar />

            {status == "success" && (

                <>

                    <Helmet>
                        <title>{error.title} - Musicn</title>
                    </Helmet>

                    <div className="jumbotron my-24">
                        <h1>
                            {error.title}
                        </h1>
                    </div>

                    <div className="container">

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
                </>
            )}

            {
                status == "loading" && (
                    <div className="container">

                        <p className="text-center">Loading...</p>
                    </div>
                )
            }

            {
                status == "error" && (
                    <div className="container">
                        <p className="text-center">Error fetching</p>
                    </div>
                )
            }


        </div>
    )
}