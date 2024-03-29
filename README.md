# @speleotica/walls

[![CircleCI](https://circleci.com/gh/speleotica/walls.svg?style=svg)](https://circleci.com/gh/speleotica/walls)
[![Coverage Status](https://codecov.io/gh/speleotica/walls/branch/master/graph/badge.svg)](https://codecov.io/gh/speleotica/walls)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/%40speleotica%2Fwalls.svg)](https://badge.fury.io/js/%40speleotica%2Fwalls)

Types and I/O methods for Walls Cave Survey data file formats

I'm not going to go to much trouble to document it here unless people ask,
the types are pretty self-explanatory:

## [`WallsSrvFile`](/src/srv/WallsSrvFile.ts)

Types and factory functions for AST nodes of `.srv` (survey) files

## [`formatWallsSrvFile`](/src/dat/formatWallsSrvFile.ts)

```js
import { formatWallsSrvFile } from '@speleotica/walls/srv'
```

It takes a `WallsSrvFile`, and optionally an options hash with a `write` function.
If you don't provide `write`, it will return the output as a `string`. Otherwise,
it will call `write` with chunks of data, so you can pass `write` connected to a
file write stream.

## [`WallsWpjFile`](/src/wpj/WallsWpjFile.ts)

Types and factory functions for AST nodes of `.wpj` (project) files

## [`formatWallsWpjFile`](/src/dat/formatWallsWpjFile.ts)

```js
import { formatWallsWpjFile } from '@speleotica/walls/wpj'
```

It takes a `WallsWpjFile`, and optionally an options hash with a `write` function.
If you don't provide `write`, it will return the output as a `string`. Otherwise,
it will call `write` with chunks of data, so you can pass `write` connected to a
file write stream.

## [`writeWallsProject`](/src/node/writeWallsProject.ts)

```js
import { writeWallsProject } from '@speleotica/walls/node'
```

Writes the `.wpj` file and `.srv` files of a project to disk.

### Arguments

#### `wpjPath` (`string`, **required**)

The path to write the project file to

#### `wpj` (`WallsProjectFile`, **required**)

The project file AST. `.srv` files will only be written for `WallsProjectSurvey` nodes with a `content` property.
