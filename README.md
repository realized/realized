realized - the .real editor
===========================

## Branching

Issuebranches can internally be rebased
(either to restructure commits or to rebase master into the issue branch).
But the merge of an issue-branch into the master-branch should **always** be
a real merge.

## Deploying

We try to keep an up-to-date version of this [deployed][2].
The branch **deploy** mirrors the current state of the deployment.
Pushing to this will automatically deploy the changes to the
server and make them publicly available.

## Parsing Files

One should use the `REAL::Processor` to parse a file.
The syntax is the following:

    processor = REAL::Processor.new(io)
    processor.parse # gets you the raw syntax tree
    processor.contain # gets you the internal representation

In which `io` can either be any instance of `IO` (specifically a `File`),
a `Pathname` (suggested), or a `String` containing the actual contents of
a file to be parsed.

## Sources

- You can find the most current version of Raphael.Export here: [raphael.export][1]

[1]: https://raw.github.com/ElbertF/Raphael.Export/master/raphael.export.js
[2]: http://realized.rightsrestricted.com
