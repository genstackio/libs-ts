# .

## Executive summary

This repository contains JS libraries and components that can be published on NPM registry and used by other projects.
The development and delivery workflow of the code of this repository is specific:

1. develop
2. demo locally with Storybook
3. publish a version

No deployment is done from this repository. The publishing of a version of one or several components is done on the developer local environment (not on GitLab, GitHub or other CI).

This repository can be used without any other repository or requirement.

## Requirements

To use this repository locally, you will need:

- [Git](https://git-scm.com/) (`git` command)
- [Make](https://en.wikipedia.org/wiki/Make_(software)) (`make` command)
- [NodeJS](https://nodejs.org/en/) 12+ (`node` command)
- a browser, preferrably Google Chrome or Firefox

Additionnally, if you need to do develop on that repository, you will need:

- a Javascript and Typescript compatible IDE or editor (ex: [WebStorm](https://www.jetbrains.com/webstorm/))

## Get the project

    git clone git@github.com:genstackio/libs-ts.git

Then:

    cd .


## Installation


    make


## Running components locally (via Storybook)

To launch a demo page with the component and all the pre-defined test cases for a component, we use the [Storybook](https://storybook.js.org/) tool which is a popular tool for JS developer to showcase their work.
This tool is very handy because it is launched locally and do not need to deploy anything anywhere. There is a hot-reloading feature included that help develop locally new features, whenever the code is changed inside a JS/Typescript, the Storybook reloads automatically.

    make package-storybook p=<name-of-component>

For instance, if you want to launch the Storybook of the `react-xyz` component (located in `./packages/react-xyz` directory):

    make package-storybook p=react-xyz

Then a local webserver will be automatically launch and your browser will open directly on the local Storybook web page, you will then be able to test and manipulate your components.
For more information on how to add stories to a Storybook, please refer to Storybook document [here](https://storybook.js.org/) and modify files of the component/package you want to test in the `./packages/<package-name>/__stories__/` directory.

## Development

### Directory structure

The repository is composed of multiple autonomous packages that follow the same development conventions and have tooling in common.
All the files located directly at the root of this repository are common to all packages.
The packages are located in the `./packages/` directory.

The repository contains only Javascript and Typescript (a Superset of Javascript language) code.

* The files with `.js` extension are pure Javascript files.
* The files with `.ts` extension are Typescript files.
* The files with `.tsx` extension are JSX-enabled Typescript files.
* The files with `.jsx` extension are JSX-enabled Javascript files.
* The files with `.json` extension are JSON files (data/config).
* The files with `.md` extension are Markdown document files.
* The files with `.lock` extension are generated lock files (used mainly by Yarn tool).
* The files located in the `lib/` directories (sub-directories of each package), are generated code that will be published, mainly pure JS code, result of the transpiling of Typescript code. Some `.map` files are also present and are useful for IDE/Editors only, you do not need to open/change these files.

### Package development

When developing a package, you do not need to go in that particular directory, you have, at the root of the repository, all the tools needed to manage that particular package:

##### Install dependencies (Yarn/Lerna)

To install/refresh the dependencies of a package:

    make package-install p=<package-name>

ex:

    make package-install p=react-xyz

We are using the [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) feature, so all the dependencies of all the packages are merged and deduplicated inside the root `/node_modules/` directory.

##### Build production-ready code (Typescript compiler)

To generate the transpiled (pure JS) code of that particular package, saved in the `lib/` subdirectory of that package:

    make package-build p=<package-name>

ex:

    make package-build p=react-xyz

##### Execute unit tests (Jest)

To execute the unit-tests (Jest-compatible) located inside the `__tests__/` subdirectory of that particular package:

    make package-test p=<package-name>

ex:

    make package-test p=react-xyz

#### Launch storybook

To launch the specific [Storybook](https://storybook.js.org/) of a package/component:

    make package-storybook p=<package-name>

ex:

    make package-storybook p=react-xyz

And then play with it inside your opened browser.
Any changes made to the source code of the package will be automatically hot-reloaded in your browser.

### Publish a version

When you made some changes to the source code of some package (one or more), you need to publish the new version(s) of this/these package(s) in order to be able to use them inside an other project.
Before publishing, you need to make sure all the tests passes and that you have re-generated the `lib/` directories of each updated packages:

    make build test changed

If any errors occured, please fix them before publishing.
The last target above, `changed`, will help list all the changed packages. It won't publish anything but provide you with the list of changed packages since the last publishing.
Under the hood, we use [LernaJS](https://lerna.js.org/) to help manage the hard work of publish scripting.
Lerna detects the list of git commits that have occured since the last tagging of a version.

To publish a new version for each changed-packages, do:

    make publish

You will be asked to confirm by selecting the strategy of version bumping for each package (major version bump, minor version bump, patch, ...).
Confirm and you will then publish remotely the new versions of packages. Lerna will also update all the `package.json` files of each impacted packages, and commit these changes and then push them automatically.

### Create a new package (scaffolded directory structure)

To scaffold/generate the directory structure for a new package (React or non-React):

    make new

To create a `React` package, start the name of your package with `react-`, it will generate additional files.

Then answer to prompted question such as `package name`, ...

The generated files are located in `./packages/<package-name>/`.

