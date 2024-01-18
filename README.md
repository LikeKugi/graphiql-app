# GraphiQL

**GraphiQL** is a playground/IDE for graphQL requests.

## Team

- [LikeKugi](https://github.com/LikeKugi)
- [iudchenko](https://github.com/iudchenko)
- [5kazo4nik](https://github.com/5kazo4nik)

## Backend / API

- Application doesn't require a backend.
- Application support any open, user-specified GraphQL API that supports [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## Application structure

1. Welcome page
2. User auth
3. GraphiQL page with:
   - request editor (query editor / JSON viewer)
   - variables editor
   - headers editor
   - documentation explorer (should be lazy-loaded)
   - response section (query editor / JSON viewer)
   - possibility to change to a different user-specified API endpoint

## Application Info

- This app is the final project for [RS-School](https://rs.school/react/) React course

### Deploy

[Link](https://likekugi.github.io/graphiql-app/#/)

### Test User Account

- Login: test.user@mail.com
- Password: !234Qwer

### Video

[YouTube](https://youtu.be/gK7SvWwQNiY)

### Run project

1. Clone this repo
2. Create `.env` file in the root of this project with your Firebase Credentials

```dotenv
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Run

```shell
npm i
```

4. To start the project run

```shell
npm run dev
```

## Cross-check criteria

For the convenience of verification, it is **necessary** to record and post on YouTube a short (5-7 min) video for reviewers with an explanation of how each of the items listed in the evaluation criteria is implemented. Add a link to the video to the pull-request.
[How to evaluate tasks in Cross check](https://docs.rs.school/#/en/cross-check-flow). In the comments to the assessment, it is necessary to indicate which items are not fulfilled or partially fulfilled.

### Welcome route - max 50 points

- [ ] The welcome page should contain general information about the developers, project, and course **10 points**
- [ ] In the upper right corner there are 2 buttons: Sign In and Sign Up **10 points**
- [ ] If the login token is valid and unexpired, the Sign In and Sign Up buttons are replaced with the "Main Page" button **10 points**
- [ ] When the token expires - the user should be redirected to the "Welcome page" automatically **10 points**
- [ ] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form **10 points**

### Sign In / Sign Up - max 50 points

- [ ] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **10 points**
- [ ] Client-side validation is implemented **20 points**
- [ ] Upon successful login, the user is redirected to the Main page **10 points**
- [ ] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page **10 points**

### GraphiQL route - max 200 points

- [ ] Functional editor enabling query editing and prettifying **60 points**
- [ ] Operational documentation explorer, visible _only_ upon successful SDL request **50 points**
- [ ] Variables section that can shown or hidden, specified variables are sent to the server **30 points**
- [ ] Header section that can be shown or hidden, user-added headers are sent to the server **20 points**
- [ ] Response section with an editor in read-only as a JSON viewer **40 points**

### General requirements - max 50 points

- [ ] Localization **30 points**
- [ ] Sticky header **10 points**
- [ ] Errors from API side are displayed in the user friendly format **10 points**

### Penalties

- [ ] React default favicon **-50 points**
- [ ] The presence of errors and warnings in the console **-20 points** for each
- [ ] The presence in the console of the results of the console.log execution **-20 points** for each
- [ ] @ts-ignore or any usage (search through GitHub repo) **-20 points** for each
- [ ] The presence of _code-smells_ (God-object, chunks of duplicate code), commented code sections: **-10 points per each**
- [ ] Making commits after the deadline **-100 points**
- [ ] Absence of tests **-250 points**
- [ ] Test coverage below 80% **-100 points**
- [ ] Absence of linting **-150 points**
- [ ] Absence of prettier **-100 points**
- [ ] Absence of husky git hooks **-100 points**
- [ ] Usage 3rd party / open source libraries for prettifying, i18n **-150 points**
- [ ] The administration reserves the right to apply penalties for the use of incorrect repository or branch names
