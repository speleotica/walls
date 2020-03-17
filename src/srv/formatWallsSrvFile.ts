import { Unit, Length, Angle, UnitizedNumber } from '@speleotica/unitized'
import {
  UnitsOption,
  SrvSettings,
  UnitsOptionType,
  UnitsDirective,
  SegmentDirective,
  FixDirective,
  PrefixDirective,
  NoteDirective,
  FlagDirective,
  Color,
  SymbolDirective,
  DateDirective,
  Shot,
  ShotType,
  CompassAndTapeItem,
  RectilinearItem,
  LrudItem,
  SrvLine,
  SrvLineType,
  VarianceAssignment,
  VarianceAssignmentType,
  Comment,
  WallsSrvFile,
  defaultSrvSettings,
} from './WallsSrvFile'
import { isEqual } from 'lodash'
import applyUnitsOptions from './applyUnitsOptions'

function formatLengthUnitForDirective(unit: Unit<Length>): string {
  switch (unit) {
    case Length.meters:
      return 'Meters'
    case Length.feet:
      return 'Feet'
    default:
      throw new Error(`invalid length unit: ${unit.id}`)
  }
}
function formatAzimuthUnitForDirective(unit: Unit<Angle>): string {
  switch (unit) {
    case Angle.degrees:
      return 'Degrees'
    case Angle.gradians:
      return 'Grads'
    case Angle.milsNATO:
      return 'Mils'
    default:
      throw new Error(`invalid azimuth unit: ${unit.id}`)
  }
}

function formatInclinationUnitForDirective(unit: Unit<Angle>): string {
  switch (unit) {
    case Angle.degrees:
      return 'Degrees'
    case Angle.gradians:
      return 'Grads'
    case Angle.milsNATO:
      return 'Mils'
    case Angle.percentGrade:
      return 'Percent'
    default:
      throw new Error(`invalid inclination unit: ${unit.id}`)
  }
}

function unitSuffix(unit: Unit<any>): string {
  switch (unit) {
    case Length.meters:
      return 'm'
    case Length.feet:
      return 'f'
    case Angle.degrees:
      return 'd'
    case Angle.gradians:
      return 'g'
    case Angle.milsNATO:
      return 'm'
    case Angle.percentGrade:
      return 'p'
    default:
      throw new Error(`invalid unit: ${unit.id}`)
  }
}

export function formatLength(
  length: UnitizedNumber<Length>,
  defaultUnit: Unit<Length>
): string {
  switch (length.unit) {
    case Length.meters:
    case Length.feet: {
      break
    }
    case Length.inches: {
      const value = length.get(Length.inches)
      if (value % 12) {
        return `${Math.floor(value / 12)}i${value % 12}`
      }
      length = length.in(Length.feet)
      break
    }
    default: {
      length = length.in(defaultUnit)
    }
  }
  const value = length.get(length.unit)
  return length.unit === defaultUnit
    ? String(value)
    : `${value}${unitSuffix(length.unit)}`
}

export function formatAzimuth(
  angle: UnitizedNumber<Angle>,
  defaultUnit: Unit<Angle>
): string {
  switch (angle.unit) {
    case Angle.degrees:
    case Angle.gradians:
    case Angle.milsNATO:
      break
    case Angle.percentGrade:
      throw new Error(`invalid azimuth unit: ${angle.unit.id}`)
    default:
      angle = angle.in(defaultUnit)
  }
  const value = angle.get(angle.unit)
  return angle.unit === defaultUnit
    ? String(value)
    : `${value}${unitSuffix(angle.unit)}`
}

export function formatInclination(
  angle: UnitizedNumber<Angle>,
  defaultUnit: Unit<Angle>
): string {
  switch (angle.unit) {
    case Angle.degrees:
    case Angle.gradians:
    case Angle.milsNATO:
    case Angle.percentGrade:
      break
    default:
      angle = angle.in(defaultUnit)
  }
  const value = angle.get(angle.unit)
  return angle.unit === defaultUnit
    ? String(value)
    : `${value}${unitSuffix(angle.unit)}`
}

const quoted: Record<string, string> = {
  '"': '\\"',
  '\\': '\\\\',
  '\n': '\\n',
  '\t': '\\t',
  '\r': '\\r',
}

export function quote(str: string): string {
  return `"${str.replace(/["\\\n\t\r]/g, match => quoted[match] || match)}"`
}

export function formatUnitsOption(
  option: UnitsOption,
  settings: SrvSettings
): string {
  switch (option.type) {
    case UnitsOptionType.CompassAndTape:
      return 'CT'
    case UnitsOptionType.Rectilinear:
      return 'RECT'
    case UnitsOptionType.Order:
      return 'ORDER=' + option.order.join('')
    case UnitsOptionType.DistanceUnit:
      return formatLengthUnitForDirective(option.unit)
    case UnitsOptionType.PrimaryDistanceUnit:
      return `D=${formatLengthUnitForDirective(option.unit)}`
    case UnitsOptionType.SecondaryDistanceUnit:
      return `S=${formatLengthUnitForDirective(option.unit)}`
    case UnitsOptionType.BacksightAzimuthUnit:
      return `A=${formatAzimuthUnitForDirective(option.unit)}`
    case UnitsOptionType.FrontsightAzimuthUnit:
      return `AB=${formatAzimuthUnitForDirective(option.unit)}`
    case UnitsOptionType.BacksightInclinationUnit:
      return `V=${formatInclinationUnitForDirective(option.unit)}`
    case UnitsOptionType.FrontsightInclinationUnit:
      return `VB=${formatInclinationUnitForDirective(option.unit)}`
    case UnitsOptionType.MagneticDeclination:
      return `DECL=${formatAzimuth(
        option.trueNorthOffset,
        settings.frontsightAzimuthUnit
      )}`
    case UnitsOptionType.GridNorthCorrection:
      return `GRID=${formatAzimuth(
        option.trueNorthOffset,
        settings.frontsightAzimuthUnit
      )}`
    case UnitsOptionType.RectilinearNorthCorrection:
      return `RECT=${formatAzimuth(
        option.trueNorthOffset,
        settings.frontsightAzimuthUnit
      )}`
    case UnitsOptionType.DistanceCorrection:
      return `INCD=${formatLength(
        option.correction,
        settings.primaryDistanceUnit
      )}`
    case UnitsOptionType.FrontsightAzimuthCorrection:
      return `INCA=${formatAzimuth(
        option.correction,
        settings.frontsightAzimuthUnit
      )}`
    case UnitsOptionType.BacksightAzimuthCorrection:
      return `INCA=${formatAzimuth(
        option.correction,
        settings.backsightAzimuthUnit
      )}`
    case UnitsOptionType.FrontsightInclinationCorrection:
      return `INCA=${formatInclination(
        option.correction,
        settings.frontsightInclinationUnit
      )}`
    case UnitsOptionType.BacksightInclinationCorrection:
      return `INCA=${formatInclination(
        option.correction,
        settings.backsightInclinationUnit
      )}`
    case UnitsOptionType.HeightAdjustment:
      return `INCH=${formatLength(
        option.correction,
        settings.primaryDistanceUnit
      )}`
    case UnitsOptionType.BacksightAzimuthType:
      return `TYPEAB=${option.isCorrected ? 'C' : 'N'},${formatAzimuth(
        option.tolerance,
        settings.backsightAzimuthUnit
      )}${option.doNotAverage ? ',X' : ''}`
    case UnitsOptionType.BacksightInclinationType:
      return `TYPEVB=${option.isCorrected ? 'C' : 'N'},${formatInclination(
        option.tolerance,
        settings.backsightInclinationUnit
      )}${option.doNotAverage ? ',X' : ''}`
    case UnitsOptionType.Reset:
      return 'RESET'
    case UnitsOptionType.Save:
      return 'SAVE'
    case UnitsOptionType.Restore:
      return 'RESTORE'
    case UnitsOptionType.StationNameCase:
      return `CASE=${option.conversion}`
    case UnitsOptionType.LrudStyle:
      return `LRUD=${option.style}${
        option.order ? `:${option.order.join('')}` : ''
      }`
    case UnitsOptionType.Prefix:
      return `PREFIX${option.level === 1 ? '' : option.level}=${option.prefix}`
    case UnitsOptionType.TapingMethod:
      return `TAPE=${option.tapingMethod}`
    case UnitsOptionType.UnitVariance:
      return `UV=${option.scalingFactor}`
    case UnitsOptionType.HorizontalUnitVariance:
      return `UVH=${option.scalingFactor}`
    case UnitsOptionType.VerticalUnitVariance:
      return `UVV=${option.scalingFactor}`
    case UnitsOptionType.Flag:
      return option.flag ? `FLAG=${quote(option.flag)}` : 'FLAG'
    case UnitsOptionType.Macro:
      return `$${option.name}${
        option.replacement ? `=${quote(option.replacement)}` : ''
      }`
  }
}

export function formatUnitsDirective(
  { options, comment, raw }: UnitsDirective,
  settings: SrvSettings
): string {
  if (raw) return raw.value
  let curSettings = settings
  const parts = ['#UNITS']
  for (const option of options) {
    parts.push(formatUnitsOption(option, curSettings))
    switch (option.type) {
      case UnitsOptionType.DistanceUnit:
      case UnitsOptionType.PrimaryDistanceUnit:
      case UnitsOptionType.SecondaryDistanceUnit:
      case UnitsOptionType.BacksightAzimuthUnit:
      case UnitsOptionType.FrontsightAzimuthUnit:
      case UnitsOptionType.BacksightInclinationUnit:
      case UnitsOptionType.FrontsightInclinationUnit:
        if (curSettings === settings) curSettings = { ...settings }
        break
      default:
        continue
    }
    switch (option.type) {
      case UnitsOptionType.DistanceUnit:
        curSettings.primaryDistanceUnit = curSettings.secondaryDistanceUnit =
          option.unit
        break
      case UnitsOptionType.PrimaryDistanceUnit:
        curSettings.primaryDistanceUnit = option.unit
        break
      case UnitsOptionType.SecondaryDistanceUnit:
        curSettings.secondaryDistanceUnit = option.unit
        break
      case UnitsOptionType.BacksightAzimuthUnit:
        curSettings.backsightAzimuthUnit = option.unit
        break
      case UnitsOptionType.FrontsightAzimuthUnit:
        curSettings.frontsightAzimuthUnit = option.unit
        break
      case UnitsOptionType.BacksightInclinationUnit:
        curSettings.backsightInclinationUnit = option.unit
        break
      case UnitsOptionType.FrontsightInclinationUnit:
        curSettings.frontsightInclinationUnit = option.unit
        break
    }
  }
  if (comment) parts.push(`; ${comment}`)
  return parts.join(' ') + '\r\n'
}

export function formatSegmentDirective({
  segment,
  comment,
  raw,
}: SegmentDirective): string {
  if (raw) return raw.value
  return `#SEGMENT ${segment}${comment ? ` ; ${comment}` : ''}\r\n`
}

export function formatVarianceAssignment(
  assignment: VarianceAssignment | null | undefined,
  settings: SrvSettings
): string {
  if (!assignment) return ''
  switch (assignment.type) {
    case VarianceAssignmentType.FloatShot:
      return '?'
    case VarianceAssignmentType.FloatTraverse:
      return '*'
    case VarianceAssignmentType.Length:
      return formatLength(assignment.length, settings.primaryDistanceUnit)
    case VarianceAssignmentType.RMSError:
      return `R${formatLength(assignment.length, settings.primaryDistanceUnit)}`
  }
}

export function formatVariance(
  horizontal: VarianceAssignment | null | undefined,
  vertical: VarianceAssignment | null | undefined,
  settings: SrvSettings
): string {
  if (!horizontal && !vertical) return ''
  if (isEqual(horizontal, vertical))
    return `(${formatVarianceAssignment(horizontal, settings)})`
  return `(${formatVarianceAssignment(
    horizontal,
    settings
  )},${formatVarianceAssignment(vertical, settings)})`
}

export function formatFixDirective(
  {
    station,
    latitude,
    longitude,
    easting,
    northing,
    elevation,
    horizontalVariance,
    verticalVariance,
    note,
    segment,
    comment,
    raw,
  }: FixDirective,
  settings: SrvSettings
): string {
  if (raw) return raw.value
  const parts = ['#FIX', station]
  if (easting && northing) {
    for (const item of settings.rectilinearOrder) {
      switch (item) {
        case RectilinearItem.Easting:
          parts.push(formatLength(easting, settings.primaryDistanceUnit))
          break
        case RectilinearItem.Northing:
          parts.push(formatLength(northing, settings.primaryDistanceUnit))
          break
        case RectilinearItem.Elevation:
          parts.push(formatLength(elevation, settings.primaryDistanceUnit))
          break
      }
    }
  } else if (longitude && latitude) {
    for (const item of settings.rectilinearOrder) {
      switch (item) {
        case RectilinearItem.Easting:
          parts.push(
            `${longitude.isNegative ? 'W' : 'E'}${longitude
              .abs()
              .get(Angle.degrees)}`
          )
          break
        case RectilinearItem.Northing:
          parts.push(
            `${latitude.isNegative ? 'S' : 'N'}${latitude
              .abs()
              .get(Angle.degrees)}`
          )
          break
        case RectilinearItem.Elevation:
          parts.push(formatLength(elevation, settings.primaryDistanceUnit))
          break
      }
    }
  } else {
    throw new Error(
      `either easting/northing or latitude/longitude must be given`
    )
  }
  if (horizontalVariance || verticalVariance) {
    parts.push(formatVariance(horizontalVariance, verticalVariance, settings))
  }
  if (note) parts.push(`/${note}`)
  if (segment) parts.push(`#SEGMENT ${segment}`)
  if (comment) parts.push(`; ${comment}`)
  return parts.join(' ') + '\r\n'
}

export function formatPrefixDirective({
  level,
  prefix,
  comment,
  raw,
}: PrefixDirective): string {
  if (raw) return raw.value
  const parts = [`#PREFIX${level === 1 ? '' : level}`]
  if (prefix) parts.push(prefix)
  if (comment) parts.push(`; ${comment}`)
  return parts.join(' ') + '\r\n'
}

export function formatNoteDirective({
  station,
  note,
  comment,
  raw,
}: NoteDirective): string {
  if (raw) return raw.value
  return `#NOTE ${station} ${note}${comment ? `; ${comment}` : ''}\r\n`
}

export function formatFlagDirective({
  stations,
  flag,
  comment,
  raw,
}: FlagDirective): string {
  if (raw) return raw.value
  return `#FLAG ${stations.join(' ')} /${flag}${
    comment ? `; ${comment}` : ''
  }\r\n`
}

export function formatColor({ r, g, b }: Color): string {
  return `(${r}, ${g}, ${b})`
}

export function formatSymbolDirective({
  opacity,
  shape,
  pointSize,
  color,
  flag,
  comment,
  raw,
}: SymbolDirective): string {
  if (raw) return raw.value
  return `#SYMBOL ${opacity || '-'}${shape || '-'}${pointSize ?? '-'}${
    color ? formatColor(color) : ''
  } /${flag}${comment ? `; ${comment}` : ''}\r\n`
}

export function formatDateDirective({
  date,
  comment,
  raw,
}: DateDirective): string {
  if (raw) return raw.value
  return `#DATE ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}${
    comment ? `; ${comment}` : ''
  }\r\n`
}

function formatAzimuths(
  frontsight: UnitizedNumber<Angle> | null | undefined,
  backsight: UnitizedNumber<Angle> | null | undefined,
  settings: SrvSettings
): string {
  const { frontsightAzimuthUnit, backsightAzimuthUnit } = settings
  if (backsight) {
    return `${
      frontsight ? formatAzimuth(frontsight, frontsightAzimuthUnit) : '--'
    }/${formatAzimuth(backsight, backsightAzimuthUnit)}`
  }
  return frontsight ? formatAzimuth(frontsight, frontsightAzimuthUnit) : '--'
}

function formatInclinations(
  frontsight: UnitizedNumber<Angle> | null | undefined,
  backsight: UnitizedNumber<Angle> | null | undefined,
  settings: SrvSettings
): string {
  const { frontsightInclinationUnit, backsightInclinationUnit } = settings
  if (backsight) {
    return `${
      frontsight
        ? formatInclination(frontsight, frontsightInclinationUnit)
        : '--'
    }/${formatInclination(backsight, backsightInclinationUnit)}`
  }
  return frontsight
    ? formatInclination(frontsight, frontsightInclinationUnit)
    : '--'
}

export function formatShot(
  {
    from,
    to,
    measurements,
    horizontalVariance,
    verticalVariance,
    left,
    right,
    up,
    down,
    lrudFacingAzimuth,
    leftAzimuth,
    rightAzimuth,
    cFlag,
    segment,
    comment,
    raw,
  }: Shot,
  settings: SrvSettings
): string {
  if (raw) return raw.value
  const {
    primaryDistanceUnit,
    secondaryDistanceUnit,
    frontsightAzimuthUnit,
    compassAndTapeOrder,
    rectilinearOrder,
    lrudOrder,
  } = settings
  const parts = []
  parts.push(from || '-')
  if (to || measurements) {
    parts.push(to || '-')
  }
  if (measurements) {
    if (measurements.type === ShotType.CompassAndTape) {
      const {
        distance,
        frontsightAzimuth,
        backsightAzimuth,
        frontsightInclination,
        backsightInclination,
        instrumentHeight,
        targetHeight,
      } = measurements
      for (const item of compassAndTapeOrder) {
        switch (item) {
          case CompassAndTapeItem.Distance:
            parts.push(formatLength(distance, primaryDistanceUnit))
            break
          case CompassAndTapeItem.Azimuth:
            parts.push(
              formatAzimuths(frontsightAzimuth, backsightAzimuth, settings)
            )
            break
          case CompassAndTapeItem.Inclination:
            parts.push(
              formatInclinations(
                frontsightInclination,
                backsightInclination,
                settings
              )
            )
            break
        }
      }
      if (instrumentHeight || targetHeight) {
        parts.push(
          instrumentHeight
            ? formatLength(instrumentHeight, secondaryDistanceUnit)
            : '--'
        )
        parts.push(
          targetHeight
            ? formatLength(targetHeight, secondaryDistanceUnit)
            : '--'
        )
      }
    } else if (measurements.type === ShotType.Rectilinear) {
      const { easting, northing, elevation } = measurements
      for (const item of rectilinearOrder) {
        switch (item) {
          case RectilinearItem.Easting:
            parts.push(formatLength(easting, primaryDistanceUnit))
            break
          case RectilinearItem.Northing:
            parts.push(formatLength(northing, primaryDistanceUnit))
            break
          case RectilinearItem.Elevation:
            parts.push(
              elevation ? formatLength(elevation, primaryDistanceUnit) : '--'
            )
            break
        }
      }
    }
    if (horizontalVariance || verticalVariance) {
      parts.push(formatVariance(horizontalVariance, verticalVariance, settings))
    }
  }
  if (left || right || up || down) {
    const lrudParts = []
    for (const item of lrudOrder) {
      switch (item) {
        case LrudItem.Left:
          lrudParts.push(
            left ? formatLength(left, secondaryDistanceUnit) : '--'
          )
          break
        case LrudItem.Right:
          lrudParts.push(
            right ? formatLength(right, secondaryDistanceUnit) : '--'
          )
          break
        case LrudItem.Up:
          lrudParts.push(up ? formatLength(up, secondaryDistanceUnit) : '--')
          break
        case LrudItem.Down:
          lrudParts.push(
            down ? formatLength(down, secondaryDistanceUnit) : '--'
          )
          break
      }
    }
    if (leftAzimuth && rightAzimuth) {
      lrudParts.push(
        formatAzimuth(leftAzimuth, frontsightAzimuthUnit),
        formatAzimuth(rightAzimuth, frontsightAzimuthUnit)
      )
    }
    if (lrudFacingAzimuth) {
      lrudParts.push(formatAzimuth(lrudFacingAzimuth, frontsightAzimuthUnit))
    }
    if (cFlag) lrudParts.push('C')
    parts.push(`<${lrudParts.join(',')}>`)
  }
  if (segment) parts.push(`#SEGMENT ${segment}`)
  if (comment) parts.push(`; ${comment}`)
  return parts.join('\t') + '\r\n'
}

export function formatComment({ comment, raw, block }: Comment): string {
  if (raw) return raw.value
  return block || /[\r\n]/.test(comment)
    ? `#[\r\n${comment.replace(/\r\n?|\n/gm, '\r\n')}\r\n#]\r\n`
    : `; ${comment}\r\n`
}

export function formatSrvLine(line: SrvLine, settings: SrvSettings): string {
  switch (line.type) {
    case SrvLineType.Shot:
      return formatShot(line, settings)
    case SrvLineType.UnitsDirective:
      return formatUnitsDirective(line, settings)
    case SrvLineType.FixDirective:
      return formatFixDirective(line, settings)
    case SrvLineType.SegmentDirective:
      return formatSegmentDirective(line)
    case SrvLineType.PrefixDirective:
      return formatPrefixDirective(line)
    case SrvLineType.FlagDirective:
      return formatFlagDirective(line)
    case SrvLineType.SymbolDirective:
      return formatSymbolDirective(line)
    case SrvLineType.NoteDirective:
      return formatNoteDirective(line)
    case SrvLineType.DateDirective:
      return formatDateDirective(line)
    case SrvLineType.Comment:
      return formatComment(line)
  }
}

export default function formatWallsSrvFile(file: WallsSrvFile): string
export default function formatWallsSrvFile(
  file: WallsSrvFile,
  options: { write: (data: string) => any }
): void
export default function formatWallsSrvFile(
  file: WallsSrvFile,
  options?: { write: (data: string) => any }
): string | void {
  if (!options?.write) {
    const lines: string[] = []
    formatWallsSrvFile(file, { write: (line: string) => lines.push(line) })
    return lines.join('')
  } else {
    const { write } = options
    const stack: SrvSettings[] = [defaultSrvSettings()]
    const macros: Map<string, string> = new Map()
    for (const line of file.lines) {
      if (line.type === SrvLineType.UnitsDirective) {
        applyUnitsOptions({ stack, macros }, line)
      }
      write(formatSrvLine(line, stack[stack.length - 1]))
    }
  }
}
