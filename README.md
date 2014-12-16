# The Application

Digital Flash is a Web Application for students to study vocabulary.  They can choose words from a dictionary or enter the terms and definitions manually, and create stacks for them to study.  This application is being developed and managed by the following developers:

- Austin Clift
- Brennan Davis
- Jordan Larkin
- Clint Losee

# Running the Application

To run this application, first clone the repository to your local machine.  You can do this with an awesome software called [Source Tree](http://www.sourcetreeapp.com/).  This application makes it real easy to manage your repositories!

After you clone it to your computer, open your terminal and **cd** into the project directory.  From there run the following command:

```
npm install
```

This will install the dependencies of the application, including the **http-server** the application will be running on.  After it installs, run the server by enter the following command: 

```
npm start
```

Then navigate to your [localhost](http://localhost:8000/app/) to see the application.  The application is currently set up for the developers to modify files in the **app/components** directory.  This application uses GRUNT so any file modify in the **components** directory will be compiled and minified.  To start this process, make sure to run the following command:

```
grunt
```

That command will run the default GRUNT process, which includes watch (which automatically compiles files on save).

# Bug Tracking
- Level up bar shows points, not level.
- On random functions the application freezes when trying to do more than 20 cards.