This is simple node and express project which can be used as a boilerplate for you application to create Rest APIs

I have used TypeScript here with some of its experimental features like [decoraters](https://www.typescriptlang.org/docs/handbook/decorators.html)

Here I have divided this project in three parts
### Models
  This is data layer of the application where all models is defined and the manipulation of data is done here.
### Services
  Here all the business logic is written and these services can be injected in the contrllers. Services are connected with data layer (models) to do operations
### Controllers
  Here we write te controller function which is exposed to the outer world these controllers use the serivice to get and manipulate date


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
You can hit [http://localhost:3000](http://localhost:3000) to call the APIs.
