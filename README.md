# ![](https://raw.githubusercontent.com/Mindmapp/mindmapp/master/resources/icons/32x32.png) Mindmapp<sup>beta</sup>

[![](https://img.shields.io/badge/project-Mindmapp-blue.svg?style=flat-square)](https://github.com/Mindmapp)
[![](https://img.shields.io/badge/chat-Slack-orange.svg?style=flat-square)](https://join.slack.com/t/mindmapp-org/shared_invite/enQtNDE4OTUwOTQ4OTc3LWRkZDExM2E5MTJlNzZhZDBjZTFhMzVjMDhjMDFhOTY0NjBkMzMwYjRiY2FmNWNiNjRiYzdhZmNjZDE4YzkwYjk)
[![](https://img.shields.io/github/license/mindmapp/mindmapp.svg?style=flat-square)](https://github.com/Mindmapp/mindmapp/blob/dev/LICENSE.md)
[![](https://img.shields.io/david/mindmapp/mindmapp.svg?style=flat-square)](https://david-dm.org/mindmapp/mindmapp)
[![](https://img.shields.io/david/dev/mindmapp/mindmapp.svg?style=flat-square)](https://david-dm.org/mindmapp/mindmapp?type=dev)
[![](https://img.shields.io/github/downloads/mindmapp/mindmapp/total.svg?style=flat-square)](https://github.com/Mindmapp/mindmapp/releases)
[![](https://img.shields.io/travis/Mindmapp/mindmapp.svg?style=flat-square)](https://travis-ci.org/Mindmapp/mindmapp)


Mindmapp is a desktop application to draw mind maps quickly and efficiently. It was born with the intention to make the creation of mind maps extremely simple, while maintaining the fundamental properties that make the mind maps so efficient.

![Mind map](https://raw.githubusercontent.com/Mindmapp/mindmapp/master/src/assets/images/example.png)

## Development

### Clone and install dependencies

```sh
> git clone https://github.com/Mindmapp/mindmapp.git
> cd mindmapp
> npm i
```

### Run angular & electron

```sh
> npm run ng:build
> npm start
```
### Rules

#### Commits

* Use this commit message format (angular style):  

    `[<type>] <subject>`
    `<BLANK LINE>`
    `<body>`

    where `type` must be one of the following:

    - feat: A new feature
    - fix: A bug fix
    - docs: Documentation only changes
    - style: Changes that do not affect the meaning of the code
    - refactor: A code change that neither fixes a bug nor adds a feature
    - test: Adding missing or correcting existing tests
    - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
    - update: Update of the library version or of the dependencies

and `body` must be should include the motivation for the change and contrast this with previous behavior (do not add body if the commit is trivial). 

* Use the imperative, present tense: "change" not "changed" nor "changes".
* Don't capitalize first letter.
* No dot (.) at the end.

#### Branches

* There is a master branch, used only for release.
* There is a dev branch, used to merge all sub dev branch.
* Avoid long descriptive names for long-lived branches.
* No CamelCase.
* Use grouping tokens (words) at the beginning of your branch names (in a similar way to the `type` of commit).
* Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.
* Use slashes to separate parts of your branch names.
* Remove branch after merge if it is not important.

Examples:
    
    git branch -b docs/README
    git branch -b test/one-function
    git branch -b feat/side-bar
    git branch -b style/header

## License
* See [LICENSE](https://github.com/mindmapp/mindmapp/blob/master/LICENSE) file

## Contact
#### Developer
* e-mail : omardesogus9@gmail.com
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.github.io
