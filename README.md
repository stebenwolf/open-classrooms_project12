# Getting Started with our SportSee App

Preliminary note: this project uses a [micro back-end API](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard). You can fork that repository and run it locally on port 3000 before starting the SportSee app. You are also free to use Docker.

If you are running the micro API somewhere else than "http://localhost:3000" you'll need to update the base URL in services.js 

## Available Scripts

Fork the project. 
Go to the project root directory and install the project via NPM :
`npm install`

To start the project in the development mode you can run :
`npm start`

If you already run the back-end API on port 3000 the console will inform you that port 3000 is already used and will ask you if it can use another port (usually port 3001 if free).

Usually you will be automatically redirected to the app. If not, open your favourite browser and go to [http://localhost:3001](http://localhost:3001) to view it running.
















In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\


The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
