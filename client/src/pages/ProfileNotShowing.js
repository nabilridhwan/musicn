import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

export default function ProfileNotShowing() {

    return (
        <div className="">

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>Profile not showing?</h1>
            </div>

            <p className="text-center">
                If your profile is not showing. It either means two things:
                <br />
                1. You have not link your spotify account (which you can do so after logging in)
                <br />
                2. You came from the beta

                <br />
                <br />

                <p>For the second one, you are required to make a new account by signing up. After signing up, you can link your Spotify account from your profile page.</p>
            </p>

        </div>
    )
}