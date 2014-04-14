Milkshake
===============================================================================

I've been setting up supporting environments for a couple of different web projects recently, and wanted to standardize that knowledge in a template project.

Milkshake provides a starting structure and some pre-configured grunt taks.  It also adds a dash of some common frontend libraries.  I try not to assume too much about the project, but do add phpunit as a testing option.

**Table of Contents**

 1. Intro
 2. Structure
 3. Setup
 4. Grunt documentation available in `Gruntfile.js`
 5. Git Hooks documentation available in `githooks/README.md`
 6. [TODOs](https://github.com/jtfairbank/Milkshake/issues)

Structure
------------------------------------------------------------
The project's layout is designed to seperate each area of the site:

  * `src/` - Source code laid out in seperate, modular files.
      - `src/` - the root contains webpages
      - `src/dynamic` - server side code (api's, templates, ...)
      - `src/static` - client side code (js, css, data, images, ...)
      - `src/lib` - third party resources (libraries, images, ...)

  * `build/` - Transformed and minimized source code files, ready to be served in a production environment.  The post-build directory structure will mimic that of `src/`, although individual files may have been concetenated or otherwise altered.

  * `test/` - Unit and integration tests.

Setup
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

 3. Setup your source and test folders (in `midight/` now). You can also do this after the initial commit.
      - Add any libraries (3rd party dependencies) to `src/lib`.
      - Add existing dynamic resources to `src/dynamic`.
      - Add existing static resources to `src/static`.
      - Add existing pages to `src/` directly.
      - Add existing tests to `test/`.

 4. Setup Grunt: see `Gruntfile.js`'s setup section.

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