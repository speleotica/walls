import Path from 'path'
import fs from 'fs-extra'
import { describe, it } from 'mocha'
import writeWallsProject from './writeWallsProject'
import { wallsProjectBook, wallsProjectSurvey } from '../wpj/WallsWpjFile'
import iconv from 'iconv-lite'
import { expect } from 'chai'
import dedent from 'dedent-js'
import { compassAndTapeShot } from '../srv/WallsSrvFile'
import { Unitize } from '@speleotica/unitized'

type DirContents = Record<string, any>

describe(`writeWallsProject`, function() {
  let testDir = ''

  async function readDirContents(dir: string): Promise<DirContents> {
    const paths = await fs.readdir(dir)
    const result: DirContents = {}
    await Promise.all(
      paths.map(async p => {
        const fullPath = Path.resolve(dir, p)
        if ((await fs.stat(fullPath)).isDirectory()) {
          result[p] = await readDirContents(fullPath)
        } else {
          result[p] = iconv.decode(await fs.readFile(fullPath), 'win1252')
        }
      })
    )
    return result
  }

  function expectDirContents(
    actual: DirContents,
    expected: DirContents,
    path = '/'
  ): void {
    expect(Object.keys(actual), `entries of ${path}`).to.have.members(
      Object.keys(expected)
    )
    for (const entry in actual) {
      const subpath = Path.resolve(path, entry)
      if (typeof actual[entry] === 'string')
        expect(actual[entry], `contents of ${subpath}`).to.equal(
          dedent([expected[entry]] as any).replace(/\n/gm, '\r\n') + '\r\n'
        )
      else expectDirContents(actual[entry], expected[entry], subpath)
    }
  }

  beforeEach(async function() {
    testDir = Path.resolve(
      __dirname,
      '..',
      '..',
      'test',
      this.currentTest?.fullTitle?.() || ''
    )
    await fs.remove(testDir).catch(() => {
      /* no-op */
    })
    await fs.mkdirp(testDir)
  })
  afterEach(async function() {
    if (this.currentTest?.state !== 'failed') {
      await fs.remove(testDir).catch(() => {
        /* no-op */
      })
    }
  })

  it(`basic test`, async function() {
    await writeWallsProject(Path.resolve(testDir, 'test.wpj'), {
      root: wallsProjectBook('test', null, null, [
        wallsProjectSurvey('Survey 1', '1', null, {
          content: {
            lines: [
              compassAndTapeShot(
                'A',
                'B',
                Unitize.meters(5),
                Unitize.degrees(230),
                Unitize.degrees(23)
              ),
            ],
          },
        }),
      ]),
    })
    expectDirContents(await readDirContents(testDir), {
      '1.srv': `
        A	B	5	230	23
      `,
      'test.wpj': `
        .BOOK	test
        .STATUS	1
        .SURVEY	Survey 1
        .NAME	1
        .STATUS	0
        .ENDBOOK
      `,
    })
  })

  it(`book paths test`, async function() {
    await writeWallsProject(Path.resolve(testDir, 'test.wpj'), {
      root: wallsProjectBook('test', null, 'foo', [
        wallsProjectSurvey('Survey 1', '1', null, {
          content: {
            lines: [
              compassAndTapeShot(
                'A',
                'B',
                Unitize.meters(5),
                Unitize.degrees(230),
                Unitize.degrees(23)
              ),
            ],
          },
        }),
      ]),
    })
    expectDirContents(await readDirContents(testDir), {
      foo: {
        '1.srv': `
        A	B	5	230	23
      `,
      },
      'test.wpj': `
        .BOOK	test
        .PATH	foo
        .STATUS	1
        .SURVEY	Survey 1
        .NAME	1
        .STATUS	0
        .ENDBOOK
      `,
    })
  })

  it(`survey paths test`, async function() {
    await writeWallsProject(Path.resolve(testDir, 'test.wpj'), {
      root: wallsProjectBook('test', null, null, [
        wallsProjectSurvey('Survey 1', '1', 'foo', {
          content: {
            lines: [
              compassAndTapeShot(
                'A',
                'B',
                Unitize.meters(5),
                Unitize.degrees(230),
                Unitize.degrees(23)
              ),
            ],
          },
        }),
      ]),
    })
    expectDirContents(await readDirContents(testDir), {
      foo: {
        '1.srv': `
        A	B	5	230	23
      `,
      },
      'test.wpj': `
        .BOOK	test
        .STATUS	1
        .SURVEY	Survey 1
        .NAME	1
        .PATH	foo
        .STATUS	0
        .ENDBOOK
      `,
    })
  })
})
