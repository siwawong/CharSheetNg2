# CharSheetNg2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

# Backend

## Quick Start

If you have not, install [MongoDB community edition](https://docs.mongodb.com/manual/administration/install-community/) for your prefered OS and then start it.

Unnecessary, but helpful, is [Robo 3T](https://robomongo.org/) for easy GUI inspection and editing of the local database

Navigate to the server folder in your terminal than run `npm install` to download all the servers dependencies. After it is finished launch the server with `node server.js`.

### API

#### Create User

`POST` request to [localhost:3000/Users]() that expects JSON:

```
{
  "name":      // can be any string of at least a length of 2,
  "email":     // has to be an email string with a min length of 6,
  "password":  // any string with a length of at least 6
}
```

If successful will return a new JSON containing the user: `id, name, and email`. It will also return a Javascript Web Token in the header field `x-auth` that **will be required for most API calls**. This considers the user logged in and currently only expires when the user logs out.

#### Login

`POST` request to [localhost:3000/Users/Me](): Expects the users `email` and `password`. Should be called after a user has been created and logged out for the first time. Returns a new Javascript Web Token and the JSON containing the users `id, name, and email`

#### Logout

`DELETE` request to [localhost:3000/Users/Me](): Deletes the currently stored Web Token and consider the user logged out.

#### Get User's Character List

`GET` request to [localhost:3000/Users/Characters](): Returns an array of JSON containing `_id` and `name` fields for each character they own. **Will later fix `_id` to `id` to maintain consistency with the rest of the API**.

#### Create New Character

`POST` request to [localhost:3000/Users/Characters](): Receives JSON containing just the character's `name` property. Will return the newly created characters id.

#### Get Character

`GET` request to [localhost:3000/Users/Characters/:id](): Where :id represents the `id` of the character you wish. Returns JSON containing the character's `name` and `stats` which is an array of `stat` objects.

#### Add New Character Stat

`POST` request to [localhost:3000/Users/Characters/Stats](): that expects JSON:

```
{
  "id":        // id of the character your adding to,
  "name":      // name of the stat that is a required string with a minimum length of 2
  "value":     // current value of the stat, also required
  "maximum":   // maximum value of the value property which is not required and defaults to 2
  "type":      // required string with a minimum length of 2 defining what type of stat it is
}
```

Will return an array containing all of the stats of the provided character id.

#### Change A Character's Stat

`PATCH` request to [localhost:3000/Characters/Stats](): Expects the exact same JSON structure as *Add New Character Stat*. Will only change the value of a stat whose `name` properties match the object. Returns the provided JSON.

#### Delete A Character's Stat

`DELETE` request to [localhost:3000/Characters/:cid/Stats:/name](): Where `cid` and `name` represent the characters Id and the Stat's name respectively. Will remove the stat object whose name matchs the provided `name` property. Returns true.
