let user_details = null;
let response_json = null;

function authorise_user(client_id, redirect_uri, show_dialog, scope) {
    let redirect_link = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=${show_dialog}&scope=${scope}`

    return redirect_link
}

//  Check if authenticated
if (window.location.hash) {
    let dt = new Date()
    user_details = {
        "access_token": window.location.hash.substr(1).split("&")[0].split("=")[1],
        "type": access_token = window.location.hash.substr(1).split("&")[1].split("=")[1].toLowerCase(),
        "expires_in": dt.setHours(dt.getHours() + 1),
    }
} else {
    document.getElementById("body").innerHTML = `
<a href="${authorise_user("e172f1be70f64206a8b79f5e8a1f03df", "https://nabilridhwan.github.io/spotifyer", true, "user-library-read")}">Authenticate</a>
`
}

// Check if object is already initiated
if (user_details) {
    fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user_details.access_token}`
        }
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        } else {
            throw new Error('Something went wrong fetching the API!')
        }
    }).then(json => {
        response_json = json
        display()
    })
}

function display(){
    // console.log(response_json)

    response_json.items.forEach(item => {
        let track_name = item.track.name
        let track_artist_name = item.track.artists[0].name
        let album_image = item.track.album.images[0].url
        let open_html_link = item.track.external_urls.spotify;

        // console.log(item.track.external_urls.spotify)

        document.getElementById("main_body").innerHTML += `
        <div class="track">
            <a href="${open_html_link}">
                <img src=${album_image} />
            </a>
        </div>
        `

        // item.track.artists.forEach(artist => {
        //     console.log("By: " + artist.name)
        // })
    })
}