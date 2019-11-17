let user_details = null;

function authorise_user(client_id, redirect_uri, show_dialog, scope) {
    let redirect_link = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=${show_dialog}&scope=${scope}`

    return redirect_link
}

//  Check if authenticated
if(window.location.hash){
    let dt = new Date()
    user_details = {
        "access_token": window.location.hash.substr(1).split("&")[0].split("=")[1],
        "type": access_token = window.location.hash.substr(1).split("&")[1].split("=")[1].toLowerCase(),
        "expires_in": dt.setHours(dt.getHours() + 1),
    }
}

// Check if authenticated
if(user_details){
    fetch("https://api.spotify.com/v1/me/tracks", {
        method: "GET",
        headers: {
            "Authorisation": `Bearer ${user_details.access_token}`
        }
    }).then(response => {
        console.log(response)
        return response.json()
    }).then(json => {
        console.log(json)
    })
}

document.getElementById("body").innerHTML = `
<a href="${authorise_user("e172f1be70f64206a8b79f5e8a1f03df", "http://127.0.0.1:8080/", true, "user-library-read")}">Authenticate</a>
`