# Musicn (Backend)

### Share with your friends your currently listening and top songs on Spotify!

> Powered by Supabase, Express, Node JS, React and Tailwind CSS

# What have I learned and/or milestones!

- HttpOnly, SameSite and Secure cookies and the usage of cookies in the backend and frontend of applications.
  - HttpOnly makes the cookie not available in Javascript browser `document.cookie` is not allowed.
  - SameSite - It's in the name. Only allow same site.
- **[MILESTONE]** Switching from [supabase-js](https://www.npmjs.com/package/@supabase/supabase-js) package to native PostgreSQL packages for Node JS (e.g. [pg](https://www.npmjs.com/package/pg)) makes the API requests for backend (on the real heroku app) up to **46.8% faster**!
- PostgreSQL (Supabase)
  - Left Join Operator
  - Like Operator
- Query overloading
  - hpp package
  - Happens when there is two query parameter of the same name. It will return an array instead of the value. The `hpp` package will make sure that the last query parameter value is taken instead.
- Limiting the request body size
  - This is so that the attackers can't send a huge request body to "overload" or "stress" our storage.
- More React (MERN) stack stuff
  - Proxy in `package.json` so that requests does not need to follow "http://localhost:4000/api/user" and instead can be "/api/user" when making fetch requests.

### Frontend

The frontend now has a different repo. This repo only holds the backend of Musicn.
