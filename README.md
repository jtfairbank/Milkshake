Milkshake
===============================================================================

I've been setting up supporting environments for a couple of different web projects recently, and wanted to standardize that knowledge in a template project.

Milkshake provides a starting structure and some pre-configured grunt taks.  It also adds a dash of some common frontend libraries.  I try not to assume too much about the project, but do add phpunit as a testing option.

**Table of Contents**

 0. Intro
 1. Structure
 2. Jumpstart Your Project
 3. Local Setup (Existing Project)
 4. Grunt documentation available in `Gruntfile.js`
 5. Git Hooks documentation available in `githooks/README.md`
 6. [TODOs](https://github.com/jtfairbank/Milkshake/issues)


Structure
------------------------------------------------------------
The project's layout is designed to seperate each area of the site.  Specifically, the development, production, and testing areas are all distinct.

  * `src/` - Source code laid out in seperate, modular files.
      - `src/common/` - common custom resources shared across apps (images, scss includes, ...)
      - `src/lib` - third party resources (libraries, images, ...)
      - `src/app-strawberry` - a template app that lays out the expected structure.  Each application folder contains app specific code, including the webpages themselves.

  * `build/` - Transformed and minimized source code files, ready to be served in a production environment.  The post-build directory structure will mimic that of `src/`, although individual files may have been concetenated or otherwise altered.

  * `test/` - Unit and integration tests.

  * `githooks/` - Scripts to run on certain git actions, such as before committing.  These should be installed during the setup phase (see below).

Milkshake is setup to handle multiple related applications.  For example, you could have your app and a promotional site within `src/`, with libraries stored in `src/lib/` and common files stored in `src/common/`.  Its def a bit inspired by [django](https://www.djangoproject.com/).


Jumpstart Your Project
------------------------------------------------------------
Ready to make your own delicious not-quite-frozen treat?  How about a [midnight milkshake](http://meandmyfood.blogspot.se/2012/08/midnight-milkshake.html).

 1. Copy this project (except for the git info) into an empty project folder.

    ```
    mkdir midnight/
    git clone git@github.com:jtfairbank/Milkshake.git

    cp -r milkshake/* midnight/          # assumes .hidden files are not copied
    cp milkshake/.gitignore midnight/

    # OPTIONAL - remove the annoying gitkeeps
    rm -r midnight/**/.gitkeep
    ```

 2. Do your normal setup stuff.

    ```
    cd midnight

    git init
    vim LICENSE         # You can pick a license at http://choosealicense.com/.
    vim README.md
    vim package.json    # Replace the CONFIG values and set the version number.

    # ...Shake Dat Thang...
    ```

 3. Setup your `src/` and `test/` folders. You can also do this after the initial commit.
      - Add any 3rd party resources (libraries, images, ...) to `src/lib`.
      - Add files you created that are shared between applications to the appropriate subdirectory in `src/common/`.
      - Add existing application files to an application folder in `src/`.  `src/app-strawberry` provides a sample layout.  Also add the folder structure to `build/`, so that the build process knows where to put things.
      - Customize the `Grunt.js` file for your application's files and needs.  You can search for `app-strawberry` to find the relevant portions.  The whole file is really worth a readthrough tho, so you know what's going on.
      - Add existing tests to the appropriate directory in `test/`.

 4. Setup Grunt: see `Gruntfile.js`'s setup section.  Don't forget to customize it to suit your needs.

 5. Setup the git hooks: see `githooks/README.md`'s setup section.

 6. Liftoff!

    ```
    git add --all

    # skip the pre-commit git hook for the first commit
    git commit --no-verify -m "The best projects start with a Milkshake. ;)"

    #                              ________
    #                             `---.     `.
    #                                  \      `.
    #                                   )_______`.
    #                                 .'        //`---...___
    #                                /         ||    // ||  `-._
    #                             )`-|   =//=  ||   ||  ||  / ).`.
    #        _............_       ).-|         ||   ||  `........'`-._   (o)
    #     .-'         `.----`.   _...'.....__  ||   ||  _____      ||-\__.'
    #   .' | Inter- |  ).---.)  /_______..--'  ||   ||  -----    _ ||_/
    # .'_  |Plantery|  ||   ||  `-------'      ||   ||   =\\=    \_.'
    # |  | | Travel |  |'---'|    )`-|         ||   ||       _..-'
    # '--'_____________|_____|    ).-| =\\=    ||    \\  _.-' ||
    # |[]--------------/     /   __==\          \\   _.-'    /o'\
    #  \     .--.     /    _...--''   '-.__......_.-'        \__/
    #   `-._//'o\\___.'---''             \     .'
    #   LGB  \__/  -'                    /    /
    #                               ___.'    /
    #                               `-------'
    ```

    [Source](http://www.retrojunkie.com/asciiart/vehicles/rockets.htm)


Local Setup
------------------------------------------------------------
 1. Clone your Repo
 2. Setup Grunt: see `Gruntfile.js`'s setup section.
 3. Setup the git hooks: see `githooks/README.md`'s setup section.
 4. Run the following commands to build the project and run the test base:

```
# in `RESIDENT/`

grunt build
grunt test

# listen to file changes and build parts of the project you are working on
grunt watch
```
