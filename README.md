# Musicn 
### Share with your friends your currently listening and top songs on Spotify!

> Powered by Supabase, Express, Node JS, React and Tailwind CSS

# What have I learned and/or milestones!
-   HttpOnly, SameSite and Secure cookies and the usage of cookies in the backend and frontend of applications.
    -   HttpOnly makes the cookie not available in Javascript browser `document.cookie` is not allowed.
    -   SameSite - It's in the name. Only allow same site.
-   __[MILESTONE]__ Switching from [supabase-js](https://www.npmjs.com/package/@supabase/supabase-js) package to native PostgreSQL packages for Node JS (e.g. [pg](https://www.npmjs.com/package/pg)) makes the API requests for backend (on the real heroku app) up to __46.8% faster__!
-   PostgreSQL (Supabase)
    -   Left Join Operator
    -   Like Operator
-   Query overloading
    -   hpp package
    -   Happens when there is two query parameter of the same name. It will return an array instead of the value. The `hpp` package will make sure that the last query parameter value is taken instead.
-   Limiting the request body size
    -   This is so that the attackers can't send a huge request body to "overload" or "stress" our storage.
-   More React (MERN) stack stuff
    -   Proxy in `package.json` so that requests does not need to follow "http://localhost:4000/api/user" and instead can be "/api/user" when making fetch requests.

## Development Use 
### Environment Variables (in .env file)
```
PORT=<PORT>
CLIENT_ID=<SPOTIFY_CLIENT_ID>
CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET>
REDIRECT_URI=<SPOTIFY_REDIRECT_URI>
FRONTEND_URL=<FRONTEND_URL>
SUPABASE_KEY=<SUPABASE_SERVICE_KEY>
JWT_KEY=<JWT_SECRET_KEY>
```
### React 
`client` folder is where the React app is