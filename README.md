Milkshake
===============================================================================

I've been setting up supporting environments for a couple of different web projects recently, and wanted to standardize that knowledge in a template project.

Milkshake provides a starting structure and some pre-configured grunt taks.  It also adds a dash of some common frontend libraries.  I try not to assume too much about the project, but do add phpunit as a testing option.

**Table of Contents**

 1. Intro
 2. Structure
 3. Setup
 4. Grunt documentation available in `Gruntfile.js`

**TODOs**

  * Use [Bower](http://bower.io/) to install `lib/` files.
  * Research project bootstrapping tools
      - Different Levels: project bootstraps like this vs. project aspect bootstraps like Twitter Bootstrap
      - Different Backend, Frontend Setups: php vs. perl (haha... ha), js + bootstrap + jquery vs. Angular
  * Contact [Bloc](bloc.io) about creating open source template projects for multiple languages?  Basically take HTML5Bootstrap and extend it for specific common project setups.
  * Better copy process for Setup step 1.  Use github releases to create a download?

Structure
------------------------------------------------------------
The project's layout is designed to seperate each area of the site:

  * `src/` - Source code laid out in seperate, modular files.
  * `build/` - Transformed and minimized source code files, ready to be served in a production environment.  The post-build directory structure will mimic that of `src/`.
  * `test/` - Unit and integration tests.

Setup
------------------------------------------------------------
Ready to make your own delicious not-quite-frozen treat?  How about a [midnight milkshake](http://meandmyfood.blogspot.se/2012/08/midnight-milkshake.html).

 1. Copy this project (except for the git info) into an empty project folder.

    ```
    mkdir midnight/
    git clone git@github.com:jtfairbank/Milkshake.git
    cp -r milkshake/* midnight/
    cp milkshake/.gitignore midnight/
    
    cd midnight

    # OPTIONAL - remove the annoying gitkeeps
    rm -r **/.gitkeep
    ```

 2. Do your normal setup stuf (in `midnight/` now).

    ```
    git init
    vim LICENSE         # You can pick a license at http://choosealicense.com/.
    vim README.md
    vim package.json    # Replace the CONFIG values and set the version number.

    # ...Shake Dat Thang...
    ```

 3. Setup your source and test folders (in `midight/` now). You can also do this after the initial commit.

      - Add any libraries (3rd party dependencies) to `src/lib`.
      - Add existing dynamic resources to `src/dynamic`.
      - Add existing static resources to `src/static`.
      - Add existing pages to `src/` directly.
      - Add existing tests to `test/`.

 4. Setup Grunt.  Setup instructions are copied below, see the Grunt documentation in `Gruntfile.js` for more info.

     1. Install Node.js and the Node Package Manager (npm): http://nodejs.org/download/
     2. Install Grunt: http://gruntjs.com/getting-started
          * Note that the project is already configured, so look at the "Working with an existing Grunt project" section after installing grunt.
     3. Copy `githooks/*` to `.git/hooks/`.
     4. Run `grunt githooks` to setup the pre-commit hook (see the precommit task
        at the bottom).

 5. Make sure it all works:

    ```
    grunt build
    #  1. Copies files:
    #       - `src/lib/*`         -> `build/lib/*`
    #       - `src/dynamic/*`     -> `build/dynamic/*`
    #       - `src/static/data/*` -> `build/static/data/*`
    #       - `src/static/img/*`  -> `build/static/img/*`
    #
    #  5. Concatenates and minifies javascript:
    #       - `src/static/js/*`   -> `build/static/js/app.js`
    #                             -> `build/static/js/app.min.js`
    #                             -> `build/static/js/app.min.js.map`
    #
    #  6. Minifies css:
    #       - `src/static/scss/*` -> `build/static/css/*`
    #                             -> `build/static/css/*.min.css`

    grunt test
    # Should successfully run through the existing tests.
    ```

 6. Liftoff!

    ```
    git add --all
    git commit -m "The best projects start with a Milkshake. ;)"

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