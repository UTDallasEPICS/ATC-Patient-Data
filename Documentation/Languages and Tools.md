# Languages and Tools Used

# ATC Patient Management Backend
## [Docker](https://www.docker.com/)
* [Docker Documentation](https://docs.docker.com/get-started/overview/)
* [What is a Container?](https://www.docker.com/resources/what-container/)
* [Commandline References](https://docs.docker.com/engine/reference/commandline)
* Allows you to package and run an application in a loosely isolated environment called a container
* Can run multiple containers simultaneously on a host
* Containers contain everything needed to run the app, host won't have to install stuff
* Can share containers, allowing developers to work in standardized environments
* Docker client and daemon can run on the same system or connect to a remote Docker daemon
* **Docker client**
    *  way that many Docker users interact with Docker (E.g, command "docker run")
* **Docker Desktop**
    * App that enables you to build and share containerized applications
    * Includes Docker daemon, Docker client, etc.
* **Docker Objects**
    * **Image** - read-only template with instructions for creating a Docker container
    * **Container** - is a runnable instance of an image
			
## [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* JIT compiled programming language that is used for writing scripts on webpages
* Generally ran client-side in the browser

    ## [Node.js](https://nodejs.org/en/about/)
    * a JavaScript runtime environment
    * typically executing the JavaScript runtime in a server side fashion
        * typically do not run node applications as the client
    * mostly used on the server-side
    * designed to build scalable network applications
    * NPM is a package manager for Node.js packages
        * installed with node.js

    ## [TypeScript](https://www.typescriptlang.org/)
    * [Handbook](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
    * A strongly typed programming language that builds on JavaScript
    * TypeScript code converts to JavaScript, which runs anywhere JavaScript runs: In a browser, on Node.js and in your apps
    * **JavaScript with syntax for types**
        * TypeScript is a typed superset, meaning that it **adds rules about how different kinds of values can be used**
        * **static type checker** - checks a program for errors before execution, and does so based on the kinds of values
            * JavaScript’s equality operator (==) coerces its arguments, leading to unexpected behavior:

                ![](https://i.imgur.com/MdDEd3o.png)
                * coerces objects or process of converting value from one type to another
            * JavaScript also allows accessing properties which aren’t present
                ![](https://i.imgur.com/BowCEKR.png)

                * obj.heigth was not a syntax error: it is an error of using some kind of value (a type) in an incorrect way
            * Most programming languages would throw an error when these sorts of errors occur, some would do so during compilation — before any code is running

            ![](https://i.imgur.com/U65Brmy.png)
            ![](https://i.imgur.com/9Cnm9Hv.png)

<br/><br/>

## [Git](https://git-scm.com/)
* is a distributed version control system to manage projects