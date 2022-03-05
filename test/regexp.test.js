const disallowedUsernames = [
    "nabil ridhwan ",
    "<p>hello world</>",
    "nabil_rihdwan_0202",
    "jiminlefttoe",
    "Jiminslefttoe"
]

disallowedUsernames.forEach(username => {
    console.log(isUsernameForbidden(username))
})

function isUsernameForbidden(u){
let hasForbiddenCharacters = u.match(/[^a-z0-9_]/g)

    if(hasForbiddenCharacters == null){
        return false;
    }else{
        return true;
    }
}