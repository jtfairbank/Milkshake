Git Hooks
===============================================================================

**Table of Contents**

 1. Intro
 2. Setup
 3. Descriptions for each git hook.
 4. [TODOs](https://github.com/jtfairbank/Milkshake/issues?labels=Git+Hooks&page=1&state=open)


Setup
------------------------------------------------------------

```
# 1. copy existing githooks
cp githooks/* .git/hooks/

# 2. add grunt tasks to the githooks
grunt githooks
```


Hooks
------------------------------------------------------------

### pre-commit ###

 1. Stashes unstaged and untracked files, so that non-committed code does not interfere with the tests.

 2. Uses Grunt to build and test the codebase (including files in the commit).
      * If the build process produces any new changes, the commit will fail.  The precense of new changes indicates that you haven't considered them for the commit (ie didn't build properly before trying to commit and add all the changes).  In this case, the stashed files from step 1 will remain stashed.  You should verify the changes and add them, then re-commit, and can then pop the stash.

      * If the test fails, the commit will fail.  In this case, the stashed files from step 1 will remain stashed.  You should fix any issues with the codebase so that the tests pass, then re-commit, and can then pop the stash.

 3. Unstashes your unstaged and untracked files, so that you can pickup where you left off.  A sucessful commit will not leave a modified environment or git stash.

NOTE: You can skip the pre-commit script with `git commit --no-verify -m "..."`.  Don't do this unless you have a good reason to.