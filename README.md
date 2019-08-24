<a href="https://mindmapp.cedoor.org" target="_blank">
    <img src="https://raw.githubusercontent.com/Mindmapp/mindmapp/master/src/assets/images/readme-header.png">
</a>

<p align="center">
    <h1 align="center">
        <img width="40" src="https://raw.githubusercontent.com/Mindmapp/mindmapp/master/src/assets/icons/icon-72x72.png">
        Mindmapp
    </h1>
    <p align="center">Web application to draw mind maps.</p>
</p>
    
<p align="center">
    <a href="https://github.com/Mindmapp" target="_blank">
        <img src="https://img.shields.io/badge/project-Mindmapp-blue.svg?style=flat-square">
    </a>
    <a href="https://gitter.im/mindmapp/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge" target="_blank">
        <img src="https://badges.gitter.im/mindmapp/community.svg">
    </a>
    <a href="https://github.com/Mindmapp/mindmapp/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/mindmapp/mindmapp.svg?style=flat-square">
    </a>
    <a href="https://david-dm.org/mindmapp/mindmapp" target="_blank">
        <img src="https://img.shields.io/david/mindmapp/mindmapp.svg?style=flat-square">
    </a>
    <a href="https://david-dm.org/mindmapp/mindmapp?type=dev" target="_blank">
        <img src="https://img.shields.io/david/dev/mindmapp/mindmapp.svg?style=flat-square">
    </a>
</p>

___

## :paperclip: Table of Contents
- :rocket: [Features](#rocket-features)
- :hammer: [Install](#hammer-install)
- :video_game: [Usage](#video_game-usage)
- :chart_with_upwards_trend: [Development](#chart_with_upwards_trend-development)
  - :raised_hand: [Contribute](#raised_hand-contribute)
  - :scroll: [Rules](#scroll-rules)
    - [Commits](#commits)
    - [Branches](#branches)
- :page_facing_up: [License](#page_facing_up-license)
- :telephone_receiver: [Contacts](#telephone_receiver-contacts)
  - :boy: [Developers](#boy-developers)

## :rocket: Features

| Feature | Status | Description |
|---------|:------:|-------------|
| Basic mind map properties | :heavy_check_mark: | Set node images, colors and font properties. |
| Undo/Redo | :heavy_check_mark: | History of map changes. |
| Map centering | :heavy_check_mark: | Center map in x, y, z axes. |
| Shortcuts | :heavy_check_mark: | Main shortcuts to speed things up. |
| Local storage | :heavy_check_mark: | Save maps in the browser local storage. |
| JSON import/export | :heavy_check_mark: | Export and import maps as JSON file. |
| Image & PDF export | :heavy_check_mark: | Export maps as image (png, jpg) or PDF document. |
| PWA support | :heavy_check_mark: | Support of desktop and mobile browser PWA (Progressive Web App). |
| p2p database | :x: | Orbit (or something else) peer-to-peer database to share and eventually sync maps. |
| Plugin system | :x: | A plugin system to add third-party features. |
| Multiple selection | :x: | Select multiple nodes at the same time. |
| Multiple maps | :x: | Multiple maps at the same time with multi-tabs. |

## :hammer: Install

With the following installed:
- git
- node >= 12
- npm >= 6

Clone the repo and install the dependencies from npm.

```bash
git clone https://github.com/Mindmapp/mindmapp.git
cd mindmapp
npm i
```

## :video_game: Usage

For local *development* with angular dev server:

```bash
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

If you want to generate the project documentation:

```bash
npm run doc
```

A `documentation` folder will be generated in the project path.

## :chart_with_upwards_trend: Development

### :raised_hand: Contribute

Mindmapp is a work in progress. Remember that if you want you can make a small contribution with a pull request.

### :scroll: Rules

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

## :page_facing_up: License
* See [LICENSE](https://github.com/cedoor/ceditor/blob/master/LICENSE) file.

## :telephone_receiver: Contacts
### :boy: Developers
* e-mail : omardesogus9@gmail.com
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.org
