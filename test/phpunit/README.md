PHPUnit Tests
===============================================================================

**Table of Contents**

 1. Intro
 2. Setup
 3. Testing with PHPUnit


Setup
------------------------------------------------------------

 1. Install [PHPUnit](http://phpunit.de/manual/3.7/en/index.html)


Testing
------------------------------------------------------------
The tests are designed to be run from the root directory, like so:

 1. Manually: `phpunit test/phpunit/FooBarTest.php`

 2. With Grunt: `grunt test` for all tests, `grunt phpunit` for only the phpunit tests.  Note: tests will also be run before each commit by the grunt precommit githook.
