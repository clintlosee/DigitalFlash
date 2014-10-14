Digital Flash
=============

## Application Details

Digital Flash is a web application for students to study vocabulary.  They can choose words from a dictionary or enter the terms and definitions manually, and create stacks for them to study.  This application is being developed and managed by a team of four developers.

- Austin Clift
- Brennan Davis
- Jordan Larkin
- Clint Losee

## Development Instructions

This application is based on AngularJS and NodeJS.  To run this application, you must install NodeJS.  After you clone the repository, you can install the project's dependencies.  To do so, run the following command:

```
npm install
```

Doing so will not only install NPM development dependencies, but will also install BOWER production dependencies.  To add/remove dependencies you can modify the package.json file (development), and the bower.json file (production).

You can run the application on your local machine by running the following command:

```
npm start
```

The application is currently set up for the developers to modify scripts in /app/components/source/scripts and to modify LESS files in /app/components/source/less.  The application uses GRUNT to concatinate and minify script and css files /app/scripts/ and /app/css/ respectively.  To activate grunt, run the following command:

``` 
grunt
```

Running that command will automatically uglify scripts, concatenate CSS, package LESS, minify CSS, and watch the directories for any changes (if any changes are made, the process will run again).

You can choose to activate any of these commands independantly, though it isn't reconmended, by running the following commands:

```
grunt uglify
grunt concat
grunt less
grunt cssmin
grunt watch
```

## Bug Tracking
No bugs so far!

## Tasks
- Modify 'views' to reflect application pages.
- Make sure everything links up.