# @speleotica/walls

[![CircleCI](https://circleci.com/gh/speleotica/walls.svg?style=svg)](https://circleci.com/gh/speleotica/walls)
[![Coverage Status](https://codecov.io/gh/speleotica/walls/branch/master/graph/badge.svg)](https://codecov.io/gh/speleotica/walls)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/%40speleotica%2Fwalls.svg)](https://badge.fury.io/js/%40speleotica%2Fwalls)

Types and I/O methods for Walls Cave Survey data file formats

I'm not going to go to much trouble to document it here unless people ask,
the types are pretty self-explanatory:

- [`WallsSrvFile`](/src/srv/WallsSrvFile.ts)

## [`formatWallsSrvFile`](/src/dat/formatWallsSrvFile.ts)

```js
import formatWallsSrvFile from '@speleotica/walls/srv/formatWallsSrvFile'
```

It takes a `WallsSrvFile`, and optionally an options hash with a `write` function.
If you don't provide `write`, it will return the output as a `string`. Otherwise,
it will call `write` with chunks of data, so you can pass `write` connected to a
file write stream.

- [`WallsWpjFile`](/src/wpj/WallsWpjFile.ts)

## [`formatWallsWpjFile`](/src/dat/formatWallsWpjFile.ts)

```js
import formatWallsWpjFile from '@speleotica/walls/wpj/formatWallsWpjFile'
```

It takes a `WallsWpjFile`, and optionally an options hash with a `write` function.
If you don't provide `write`, it will return the output as a `string`. Otherwise,
it will call `write` with chunks of data, so you can pass `write` connected to a
file write stream.
