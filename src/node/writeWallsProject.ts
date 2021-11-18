import {
  WallsProjectEntry,
  WallsProjectEntryType,
  WallsWpjFile,
} from '../wpj/WallsWpjFile'
import fs from 'fs'
import mkdirp from 'mkdirp'
import iconv from 'iconv-lite'
import formatWallsWpjFile from '../wpj/formatWallsWpjFile'
import { promisify } from 'util'
import Path from 'path'
import formatWallsSrvFile from '../srv/formatWallsSrvFile'

async function writeSurveys(
  path: string,
  entry: WallsProjectEntry
): Promise<void> {
  const childPath = entry.path ? Path.resolve(path, entry.path) : path
  switch (entry.type) {
    case WallsProjectEntryType.Book: {
      await Promise.all(
        entry.children.map((child) => writeSurveys(childPath, child))
      )
      break
    }
    case WallsProjectEntryType.Survey: {
      const { content, name } = entry
      if (!content || !name) break
      const srvPath = Path.resolve(
        childPath,
        /\.[^.]+$/.test(name) ? name : name + '.srv'
      )
      await mkdirp(Path.dirname(srvPath))
      const fsStream = fs.createWriteStream(srvPath)
      const out = iconv.encodeStream('win1252').pipe(fsStream)

      formatWallsSrvFile(content, { write: (data: string) => out.write(data) })
      await promisify((cb: (err: any) => void) => fsStream.close(cb))()
    }
  }
}

export default async function writeWallsProject(
  wpjPath: string,
  wpj: WallsWpjFile
): Promise<void> {
  await Promise.all([
    (async (): Promise<void> => {
      await mkdirp(Path.dirname(wpjPath))
      const fsStream = fs.createWriteStream(wpjPath)
      const out = iconv.encodeStream('win1252').pipe(fsStream)

      formatWallsWpjFile(wpj, { write: (data: string) => out.write(data) })
      await promisify((cb: (err: any) => void) => fsStream.close(cb))()
    })(),
    writeSurveys(Path.dirname(wpjPath), wpj.root),
  ])
}
