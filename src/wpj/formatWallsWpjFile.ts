import {
  WallsProjectEntryType,
  WallsProjectEntry,
  getStatus,
  Georeference,
  getGeoreferenceFlags,
  WallsWpjFile,
} from './WallsWpjFile'

import { Length, Angle, UnitizedNumber } from '@speleotica/unitized'

function degreesMinutesSeconds(
  angle: UnitizedNumber<Angle>
): [string, string, string] {
  const raw = angle.abs().get(Angle.degrees)
  const degrees = Math.floor(raw)
  const minutesSeconds = (raw % 1) * 60
  const minutes = Math.floor(minutesSeconds)
  const seconds = (minutesSeconds % 1) * 60
  return [degrees.toFixed(0), minutes.toFixed(0), seconds.toFixed(3)]
}

export function writeGeoreference(
  georeference: Georeference,
  write: (data: string) => any
): void {
  const {
    utmEasting,
    utmNorthing,
    utmZone,
    utmConvergenceAngle,
    elevation,
    latitude,
    longitude,
    wallsDatumIndex,
    datum,
  } = georeference
  const parts: any[] = [
    utmNorthing.get(Length.meters).toFixed(3),
    utmEasting.get(Length.meters).toFixed(3),
    utmZone,
    utmConvergenceAngle.get(Angle.degrees).toFixed(3),
    elevation.get(Length.meters).toFixed(0),
    getGeoreferenceFlags(georeference),
    ...degreesMinutesSeconds(latitude),
    ...degreesMinutesSeconds(longitude),
    wallsDatumIndex,
    JSON.stringify(datum),
  ]
  write(`.REF\t${parts.join(' ')}`)
}

export function writeWallsProjectEntry(
  entry: WallsProjectEntry,
  write: (data: string) => any
): void {
  const { type, title, name, path, options, georeference } = entry
  write(
    `.${type === WallsProjectEntryType.Book ? 'BOOK' : 'SURVEY'}\t${title}\r\n`
  )
  if (name) write(`.NAME\t${name}\r\n`)
  if (options) write('.OPTIONS\t${options}\r\n')
  if (path) write(`.PATH\t${path}\r\n`)
  write(`.STATUS\t${getStatus(entry)}\r\n`)
  if (georeference) {
    writeGeoreference(georeference, write)
    write('\r\n')
  }
  if (entry.type === WallsProjectEntryType.Book) {
    const { children } = entry
    children.forEach((entry) => writeWallsProjectEntry(entry, write))
    write(`.ENDBOOK\r\n`)
  }
}
export default function formatWallsWpjFile(file: WallsWpjFile): string
export default function formatWallsWpjFile(
  file: WallsWpjFile,
  options: { write: (data: string) => any }
): void
export default function formatWallsWpjFile(
  file: WallsWpjFile,
  options?: { write: (data: string) => any }
): string | void {
  if (!options?.write) {
    const lines: string[] = []
    formatWallsWpjFile(file, { write: (line: string) => lines.push(line) })
    return lines.join('')
  } else {
    const { write } = options
    writeWallsProjectEntry(file.root, write)
  }
}
