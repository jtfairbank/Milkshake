'use strict';

/* Grunt Intro
 * ==========================================================================
 * Grunt.js is a node module that provides a javascript based task runner.  We
 * use it to do things like automatically write SCSS to CSS, lint javascript
 * source files, and concatinate files for the production environment.
 *
 * **Contents**
 *
 *  1. Grunt Intro
 *  2. Grunt Modules and Commands
 *  3. Grunt Tasks
 *
 * **TODOs**
 *
 *   * Clean parts of the build directory in each build script, to handle
 *     deleted files.  Need to investigate- is this necessary?
 *
 * 
 * Setup
 * ------------------------------------------------------
 *
 * NOTE: These are reproduced in the README's setup section, so any changes must
 *       be copied there as well.
 *
 *  1. Install Node.js and the Node Package Manager (npm): http://nodejs.org/download/
 *  2. Install Grunt: http://gruntjs.com/getting-started
 *       * Note that the project is already configured, so look at the "Working
 *         with an existing Grunt project" section after installing grunt.
 *  3. Copy `githooks/*` to `.git/hooks/`.
 *  4. Run `grunt githooks` to setup the pre-commit hook (see the precommit task
 *     at the bottom).
 *
 *
 * Terminology
 * ------------------------------------------------------
 *
 *   * *module* - A grunt plugin we are using in the project.  Modules do
 *     something in general, for example run tests or concatenate files.  Each
 *     module has is configured below.
 *
 *   * *command* - Tells a grunt module to do something.  Commands are useful
 *     for getting a module to do something specific, such as concatenate
 *     all js source code into an app level file.  Commands are specified
 *     in the module configuration and can have command-specific settings (ie
 *     which files are included).
 *
 *   * *task* - Chain commands (and other tasks).  Tasks are used to execute a
 *     sequence of commands.  Each task should focus on doing one thing well,
 *     and related tasks can be sequenced in a containing task.  Tasks are set
 *     up at the end of the document.
 *
 *
 * Using Grunt
 * ------------------------------------------------------
 *
 * Grunt commands can be run with:
 *
 *     `grunt [module]:[subcommand]`
 *
 * You can run all of the commands for a module with:
 *
 *     `grunt [module]`
 *
 * Grunt tasks are used to run a sequence of commands.  You can run them with:
 *
 *     `grunt [task]`
 *
 * See individual modules and tasks (below) for the specific commands to run
 * them.
 */


/* Glob
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/glob)
 *
 * Glob is a file pattern matcher used by node (and thus grunt).  It is mainly
 * used here to check if directories are empty before running certain tasks.
 */
 
var glob = require("glob");


/* Grunt Modules and Commands
 * ========================================================================== */

module.exports = function(grunt) {
  // load grunt modules
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')


/* Module: Clean
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/grunt-contrib-clean)
 *
 * Cleans files and folders.
 *
 * ### Commands ###
 *
 *   * `grunt clean` - Run all clean commands (below).
 *   * `grunt clean:build` - Empty the `build/` directory.
 */
    , clean: {
        build: ['build/*', '!build/**/.*']
      } 


/* Module: Concat
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-concat)
 *
 * Concatenates files from `src/` into a single file in `build`.  Each command
 * may target a subset of `src/`.
 *
 * This means less requests are made when loading a page's resources.
 *
 * A `'use strict';` statement is appended to the top of the output file, so
 * each individual source code file should not include it.
 *
 * ### Commands ###
 *
 *   * `grunt concat` - Run all concat commands (below).
 *   * `grunt concat:js` - Concatenation for `build/src/js`.
 */
    , concat: {
          js: {
              options: {
                  banner: "'use strict';\n\n/* Our JS Files\n * ============================================================================= */\n\n"
                , separator: '\n\n'
                , footer: "\n"
              }
            , src: [
                  // load specific files first here

                  // general include
                  'src/static/js/**/*.js'
              ]
            , dest: 'build/static/js/app.js'
            , nonull: true
          }
      }


/* Module: Copy
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/grunt-contrib-copy)
 *
 * Copy files and folders.
 *
 * ### Commands ###
 *
 *   * `grunt copy` - Run all copy commands (below).
 *   * `grunt copy:dynamic` - Copy dynamic files to build as is.
 *   * `grunt copy:lib` - Copy library files to build as is.
 *   * `grunt copy:img` - Copy static image files to build as is.
 *   * `grunt copy:data` - Copy static data files to build as is.
 */
    , copy: {
          pages: {
              expand: true
            , cwd: 'src/'
            , src: './*.*' // files only!
            , dest: 'build/'            
          }

        , dynamic: {
              expand: true
            , cwd: 'src/dynamic/'
            , src: './**'
            , dest: 'build/dynamic/'
          }

        , lib: {
              expand: true
            , cwd: 'src/lib/'
            , src: './**'
            , dest: 'build/lib/'
          }

        , img: {
              expand: true
            , cwd: 'src/static/img/'
            , src: './**'
            , dest: 'build/static/img/'
          }

        , data: {
              expand: true
            , cwd: 'src/static/data/'
            , src: './**'
            , dest: 'build/static/data/'
          }
      }
 


/* Module: Githooks
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-githooks)
 *
 * Add grunt tasks to the project's githooks.  Note that the project defines
 * custom githooks in `githooks/`, which must be copied to `.git/hooks/` before
 * running this command.
 *
 * Each command only needs to be run once to setup the githook (ie not as part
 * of a build script).
 *
 * ### Commands ###
 *
 *   * `grunt githooks` - Run all githooks commands (below).
 *   * `grunt githooks:precommit` - Add grunt tasks to the precommit githook.
 *     The `grunt precommit` task will be run before each commit.
 */
    , githooks: {
          options: {
            'dest': '.git/hooks'
          }

        , precommit: {
              'pre-commit': 'precommit'
            , options: {
                  hashbang: '#!/bin/sh'
                , template: 'node_modules/grunt-githooks/templates/shell.hb'
                , startMarker: '### GRUNT-GITHOOKS START'
                , endMarker: '### GRUNT-GITHOOKS END'
              }
          }
      }


/* Module: jsHint
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-jshint)
 * [jsHint Options](http://www.jshint.com/docs/options/)
 *
 * Lint our javascript files for errors, including build files (but not 3rd
 * party lib js files or minified files).
 *
 * The commands are setup to be inclusive, so that a file should be linted by
 * default unless it is in pre-approved section (ie a library).
 *
 * ### Commands ###
 *
 *   * `grunt jshint` - Run all jshint commands. (below) `grunt jshint:all` is prefered.
 *   * `grunt jshint:all` - Lint everything.
 *   * `grunt jshint:source` - Lint `src/`.
 *   * `grunt jshint:build` - Lint `build/`.
 *   * `grunt jshint:test` - Lint `test/`.
 */
    , jshint: {
          // global options
          options: {
              // options here to override JSHint defaults
              // http://www.jshint.com/docs/options/

              // turn on warnings
              // true = on, false = off
              // http://www.jshint.com/docs/options/#enforcing-options
              bitwise: true
            , curly: true
            , forin: true
            , freeze: true
            , immed: true
            , indent: false
            , latedef: true
            , newcap: true
            , noarg: true
            , noempty: true
            , nonew: true
            , quotmark: false
            , strict: false
            , undef: true
            , unused: true
            , trailing: true

              // turn off warnings
              // true = off, false = on
              // http://www.jshint.com/docs/options/#relaxing-options
            , globalstrict: true
            , laxbreak: true
            , laxcomma: true
            , shadow: true

              // environments
              // declares variables that will exist in the global scope
              // http://www.jshint.com/docs/options/#environments
            , browser: true
            , devel: true
            , jquery: true

              // set global vars
              // turns off warnings for varialbes defined in the global scope:
              //   * true = warning on
              //   * false = warning off
            , globals: {
                  "_": false              // underscore.js
                , "module": false         // Gruntfile

                , "describe": false       // jasmine
                , "beforeEach": false
                , "it": false
                , "expect": false
              }
          }

          // commands
        , all: {
            src: [
                // generally include
                'src/static/**/*.js'

                // except 3rd party and minified files
              , '!src/lib/**/*.js'
              , '!build/lib/**/*.js'
              , '!build/static/app.min.js'

                // but specifically include these
            ]
          }

        , source: {
            src: [
                // generally include
                'src/**/*.js'

                // except 3rd party and minified files
              , '!src/lib/**/*.js'

                // but specifically include these
            ]
          }

        , build: {
            src: [
                // generally include
                'build/**/*.js'

                // except 3rd party and minified files
              , '!build/lib/**/*.js'
              , '!build/static/app.min.js'

                // but specifically include these
            ]
          }
 
        , test: {
            src: [
                // generally include
                'test/**/*.js'

                // except 3rd party and minified files

                // but specifically include these
            ]
          }
     }


/* Module: Karma
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/grunt-karma)
 *
 * ### Commands ###
 *   * `grunt karma` - Run all karma commands (below).
 *   * `grunt karma:jsunit` - Run all js unit tests in `test/jsunit/` in a
 *     single test run.
 *   * `grunt karma:jsunit_watch watch` - Start a karma server that the `grunt watch`
 *     module can connect to, to run the js unit tests if it notices related
 *     file changes.  Thus the tests will run continuously as development occurs.
 */
    , karma: {
          // global options
          options: {
              basePath: './'

            , files: [
                  // All files needed to run the app, usually the same as what
                  // index.html loads.
                  'build/lib/**/*.js'
                , 'build/static/js/app.js'

                  // tests to run
                , 'test/jsunit/**/*.js'
              ]

            // Use the `!exclude/me` syntax in files (above) instead.
            /*
            
            , exclude: [
              ]
            
            */

            , browsers: ['PhantomJS']
            , frameworks: ["jasmine"]
          }

        , jsunit: {
            singleRun: true
          }

        , jsunit_watch: {
            background: true
          }
      }


/* Module: PHP Unit
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-phpunit)
 *
 * ### Commands ###
 *
 *   * `grunt phpunit` - Runs the php test suite in `test/phpunit/`.
 *
 * For more information see `test/phpunit/README.md`.
 */
    , phpunit: {
          classes: {
            dir: 'test/phpunit/'
          }

        , options: {
            colors: true
          }
      }


/* Module: SASS
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-sass)
 *
 * SASS / SCSS ---> CSS
 *
 * Use SASS [@import](sass_import) to include files into an app level file, which will then
 * be converted to SCSS. This behaviour is different than that of the js, which
 * gets concatenated into an app level file in build.  However, imports are
 * baked into SASS and can be used to group related styles.
 *
 * [sass_import]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import
 *
 * ### Commands ###
 *
 *   * `grunt sass:stylin` - Compile css from scss.
 *   * `grunt sass:stylin_min` - Compile a minified css from scss.
 */
    , sass: {
          stylin: {
              files: [{
                  expand: true // consider all scss files in the directory
                , cwd: 'src/static/scss'
                , src: ['*.scss']
                , dest: 'build/static/css'
                , ext: '.css'
              }]

            , options: {
                style: 'nested'
              }
          }

        , stylin_min: {
            files: [{
                expand: true // consider all scss files in the directory
              , cwd: 'src/static/scss'
              , src: ['*.scss']
              , dest: 'build/static/css'
              , ext: '.min.css'
            }],

            options: {
              style: 'compressed'
            }
          }
      }


/* Module: Trim Trailing Spaces
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-trimtrailingspaces)
 *
 * Auto-remove trailing whitespace from codefiles.  Yay clean code.
 *
 * ### Commands ###
 *
 *   * `grunt trimtrailingspaces` - Run all trimtrailingspaces commands (below).
 *   * `grunt trimtrailingspaces:js` - Trim js files.
 *   * `grunt trimtrailingspaces:scss` - Trim scss files.
 *   * `grunt trimtrailingspaces:php` - Trim php files (and skeletons).
 */
    , trimtrailingspaces: {
          options: {
              filter: 'isFile'
            , encoding: 'utf8'
            , failIfTrimmed: false
          }

        , js: {
            src: ['src/static/js/**/*.js']
          }

        , scss: {
            src: ['src/static/scss/**/*.scss']
          }

        , php: {
            src: ['src/dynamic/**/*.php', 'src/dynamic/**/*.php.skel']
          }
      }


/* Module: Uglify
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-uglify)
 *
 * Does [JS minification](https://en.wikipedia.org/wiki/Minification_(programming)
 * for us.
 *
 * Setup a new command for each app-level js file (as produced by
 * `grunt concat`).  This avoids problems trying to handle multiple js files
 * in `build/static/js/`.  Don't forget to add them to the `build_js` task
 * (below).
 *
 * WARNING: Try not to use minified files for development or debugging.
 *
 * ### Commands ###
 *
 *   * `grunt uglify` - Run all uglify commads (below).
 *   * `grunt uglify:yomama` - Minifies the app level js files in `build/static/js`.
 */
    , uglify: {
          // globals
          options: {
            sourceMap: true
          }

        , yomama: {
              expand: true
            , cwd: 'build/static/js/'
            , src: './app.js'
            , dest: 'build/static/js/'
            , ext: '.min.js'
          }
      }


/* Watch
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-watch)
 *
 * Run grunt commands when files change.
 *
 * ### Commands ####
 *
 *   * `grunt watch` - Run all watch commands (below) in a single watch session.
 *
 *     The files listed by each command will be monitored.  When one changes,
 *     the specified tasks for that command will be run.  Multiple tasks my be
 *     run by each command, and multiple commands may be triggered by a single
 *     file change.
 *
 *   * `grunt watch:pages` - Monitor web pages and build them on change.
 *   * `grunt watch:lib` - Monitor library files and build them on change.
 *   * `grunt watch:dynamic` - Monitor server side code and build them on change.
 *   * `grunt watch:data` - Monitor data files and build them on change.
 *   * `grunt watch:img` - Monitor img files and build them on change.
 *   * `grunt watch:js` - Monitor js source files and build them on change.
 *   * `grunt watch:scss` - Monitor scss files and build them on change.
 */
    , watch: {
          options: {
              interrupt: true
            , forever: true // may want to set as true if grunt throws errors (warnings / fails) on the reg
            , atBegin: true
          }

        , pages: {
              files: ['src/*']
            , tasks: ['build_pages']
          }

        , lib: {
              files: ['src/lib/**']
            , tasks: ['build_lib']
          }

        , dynamic: {
              files: ['src/dynamic/**']
            , tasks: ['build_dynamic']
          }

        , data: {
              files: ['src/static/data/**']
            , tasks: ['build_data']
          }

        , img: {
              files: ['src/static/img/**']
            , tasks: ['build_img']
          }

        , js: {
              files: ['src/static/js/**/*.js']
            , tasks: ['build_js']
          }

        , scss: {
              files: ['src/static/scss/**/*.scss']
            , tasks: ['build_scss']
          }
      }

  }); // end grunt config


/* Grunt Tasks
 * ========================================================================== */


/* Task: Precommit
 * ------------------------------------------------------
 * The tasks to be executed before a commit is allowed to go through.  This task
 * is setup as a githook by `grunt githooks:precommit`.
 *
 * Run with `grunt precommit`.
 */
  grunt.registerTask('precommit', [
      'build'
    , 'test'
  ]);


/* Task: Build and Friends
 * ------------------------------------------------------
 * Build the source code, or specific parts of it.
 *
 * Build should be used manually or to perform and application wide build.  It
 * will remove everything in `build/` and recreate the directory structure, then
 * add the built source code.
 *
 * More specific commands are used by `grunt watch` to only build parts affected
 * by the changed file.  They expect that `build/`'s directory structure is
 * already there.
 *
 * Run with `grunt build`.
 */
  grunt.registerTask('build', [
      'clean:build'
    , 'build_pages'
    , 'build_lib'
    , 'build_dynamic'
    , 'build_static'
  ]);

  grunt.registerTask('build_pages', [
      'copy:pages'
  ]);

  grunt.registerTask('build_lib', [
      'copy:lib'
  ]);

  grunt.registerTask('build_dynamic', [
      'trimtrailingspaces:php'
    , 'copy:dynamic'
  ]);

  grunt.registerTask('build_static', [
      'build_js'
    , 'build_scss'
    , 'build_img'
    , 'build_data'
  ]);

    grunt.registerTask('build_data', [
        'copy:data'
    ]);

    grunt.registerTask('build_img', [
        'copy:img'
    ]);

    grunt.registerTask('build_js', function() {
      if (grunt.config('concat').js.src.some(function (src) {
        return glob.sync(src).length > 0;
      })) {
        grunt.task.run([
            'trimtrailingspaces:js'
          , 'concat:js'
          , 'uglify:yomama'
        ]);
      }
    });

    grunt.registerTask('build_scss', [
        'trimtrailingspaces:scss'
      , 'sass:stylin'
      , 'sass:stylin_min'
    ]);


/* Task: Test
 * ------------------------------------------------------
 * Run js and php unit tests.
 *
 * Run with `grunt test`.
 */
  grunt.registerTask('test', [
      'jshint:all'
    , 'test_js'
    , 'phpunit'
  ]);

  // A helper to prevent `grunt karma:jsunit` from failing if there are no
  // unit tests, for example on project initialization.
  grunt.registerTask('test_js', function() {
    if (glob.sync('test/jsunit/**/*.js').length) {
      grunt.task.run([
          'trimtrailingspaces:js'
        , 'concat:js'
        , 'uglify:yomama'
      ]);
    }
  });


/* Task: Default
 * ------------------------------------------------------
 * Define the default behavior that grunt should take when its not passed
 * any specific task or command to run.
 *
 * Run with `grunt`.
 */
  grunt.registerTask('default', [
      'build'
    , 'test'
  ]);

}; // end module.exports function
