Digital Flash - Portable Flashcards for Students 
================================================

Digital Flash is a web application for students to study vocabulary.  Users can create stacks of cards in three different ways.  The first way the user will search through the application’s predefined terms.  The user will be able to sort through the words by defining the first letter of the word per by typing in a text box for the word and, as they type, the results will be narrowed (similar to Google Instant).

The second way the user can create a stack is by manually adding vocabulary words.  When the user chooses this option, two text boxes will appear.  The user will then enter the term then the definition in the next box.  When the user confirms this information, it will be added to the stack.

The third way is a feature for those who just want to brush up on general vocabulary.  There will be a button to create a random stack of words.

## Installation Instructions

After you clone the repository, you have to install the production and development dependencies.  Run the following command: 

```
npm install
```

Doing so will not only install the development dependencies listed in package.json, but will automatically install all of the dependicies in bower.json as well.

You can run the application by typing the following command and then browsing to localhost:8000.

```
npm start
```

If you modify scripts or css in the app/components folder, run the commands to make sure those files are properly minified.

```
Run All: grunt default
Uglify Scripts: grunt uglify
Concatinate CSS: grunt concat
Minifiy CSS (Must Concat First): grunt cssmin
```

You can also use the watch command for grunt in order to watch the css and script directories.  Whenever changes are made and you save it, grunt will autmomatically run the tasks.  The command is:

```
grunt watch
```

If you want to modify scripts or styles, make sure to modify the CSS and JavaScript files in the components/source folder.

## Bug Tracking
- Currently, the app is set up using a minified version of the application LESS file.  For some reason, the LESS will not render while minified.

## Tasks for Base Project
- Modify 'views' to reflect application pages.
- Make sure everything links up.