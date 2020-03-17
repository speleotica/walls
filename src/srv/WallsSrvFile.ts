import {
  Angle,
  Unit,
  Length,
  UnitizedNumber,
  Unitize,
} from '@speleotica/unitized'
import { Segment } from 'parse-segment'

export enum SrvLineType {
  Shot = '_',
  UnitsDirective = '#UNITS',
  SegmentDirective = '#SEGMENT',
  FixDirective = '#FIX',
  PrefixDirective = '#PREFIX',
  NoteDirective = '#NOTE',
  FlagDirective = '#FLAG',
  SymbolDirective = '#SYMBOL',
  DateDirective = '#DATE',
  BlockComment = '#[',
  Comment = ';',
}

export enum ShotType {
  CompassAndTape = 'CT',
  Rectilinear = 'RECT',
}

export type SrvSettings = {
  shotType: ShotType
  compassAndTapeOrder: CompassAndTapeOrder
  rectilinearOrder: RectilinearOrder
  primaryDistanceUnit: Unit<Length>
  secondaryDistanceUnit: Unit<Length>
  frontsightAzimuthUnit: Unit<Angle>
  backsightAzimuthUnit: Unit<Angle>
  frontsightInclinationUnit: Unit<Angle>
  backsightInclinationUnit: Unit<Angle>
  magneticDeclination: UnitizedNumber<Angle>
  gridNorthCorrection: UnitizedNumber<Angle>
  rectilinearNorthCorrection: UnitizedNumber<Angle>
  distanceCorrection: UnitizedNumber<Length>
  frontsightAzimuthCorrection: UnitizedNumber<Angle>
  backsightAzimuthCorrection: UnitizedNumber<Angle>
  frontsightInclinationCorrection: UnitizedNumber<Angle>
  backsightInclinationCorrection: UnitizedNumber<Angle>
  heightAdjustment: UnitizedNumber<Length>
  isBacksightAzimuthCorrected: boolean
  backsightAzimuthTolerance: UnitizedNumber<Angle>
  doNotAverageBacksightAzimuth: boolean
  isBacksightInclinationCorrected: boolean
  backsightInclinationTolerance: UnitizedNumber<Angle>
  doNotAverageBacksightInclination: boolean
  stationNameCaseConversion: StationNameCaseConversion
  lrudStyle: LrudStyle
  lrudOrder: [LrudItem, LrudItem, LrudItem, LrudItem]
  prefix: [
    string | null | undefined,
    string | null | undefined,
    string | null | undefined
  ]
  tapingMethod: TapingMethod
  horizontalUnitVariance: number
  verticalUnitVariance: number
  flag: string | null | undefined
  segment: string | null | undefined
}

export enum UnitsOptionType {
  CompassAndTape = 'CT',
  Rectilinear = 'RECT',
  Order = 'Order=',
  FrontsightAzimuthUnit = 'A=',
  BacksightAzimuthUnit = 'AB=',
  PrimaryDistanceUnit = 'D=',
  SecondaryDistanceUnit = 'S=',
  EveryDistanceUnit = '_',
  FrontsightInclinationUnit = 'V=',
  BacksightInclinationUnit = 'VB=',
  MagneticDeclination = 'DECL=',
  GridNorthCorrection = 'GRID=',
  RectilinearNorthCorrection = 'RECT=',
  DistanceCorrection = 'INCD=',
  FrontsightAzimuthCorrection = 'INCA=',
  BacksightAzimuthCorrection = 'INCAB=',
  FrontsightInclinationCorrection = 'INCV=',
  BacksightInclinationCorrection = 'INCVB=',
  HeightAdjustment = 'INCH=',
  BacksightAzimuthType = 'TYPEAB=',
  BacksightInclinationType = 'TYPEVB=',
  Reset = 'RESET',
  Save = 'SAVE',
  Restore = 'RESTORE',
  StationNameCase = 'CASE=',
  LrudStyle = 'LRUD=',
  Prefix = 'PREFIX=',
  TapingMethod = 'TAPE=',
  UnitVariance = 'UV=',
  HorizontalUnitVariance = 'UVH=',
  VerticalUnitVariance = 'UVV=',
  Flag = 'FLAG=',
  Macro = '$',
}

/**
 * Indicates following shots are measured with compass and tape
 */
export type CompassAndTapeOption = {
  type: UnitsOptionType.CompassAndTape
}

/**
 * Indicates following shots are measured with true-north-relative east/north/up displacemenets
 */
export type RectOption = {
  type: UnitsOptionType.Rectilinear
}

export enum CompassAndTapeItem {
  Distance = 'D',
  Azimuth = 'A',
  Inclination = 'V',
}
export enum RectilinearItem {
  East = 'E',
  North = 'N',
  Up = 'U',
}

export type CompassAndTapeOrder =
  | [CompassAndTapeItem, CompassAndTapeItem, CompassAndTapeItem]
  | [CompassAndTapeItem, CompassAndTapeItem]
export type RectilinearOrder =
  | [RectilinearItem, RectilinearItem, RectilinearItem]
  | [RectilinearItem, RectilinearItem]

export type OrderOption = {
  type: UnitsOptionType.Order
  order: CompassAndTapeOrder | RectilinearOrder
}

export type AzimuthUnitOption = {
  type:
    | UnitsOptionType.FrontsightAzimuthUnit
    | UnitsOptionType.BacksightAzimuthUnit
  unit: Unit<Angle>
}

export type DistanceUnitOption = {
  type:
    | UnitsOptionType.PrimaryDistanceUnit
    | UnitsOptionType.SecondaryDistanceUnit
    | UnitsOptionType.EveryDistanceUnit
  unit: Unit<Length>
}

export type InclinationUnitOption = {
  type:
    | UnitsOptionType.FrontsightInclinationUnit
    | UnitsOptionType.BacksightInclinationUnit
  unit: Unit<Angle>
}

export type NorthCorrectionOption = {
  type:
    | UnitsOptionType.MagneticDeclination
    | UnitsOptionType.GridNorthCorrection
    | UnitsOptionType.RectilinearNorthCorrection
  trueNorthOffset: UnitizedNumber<Angle>
}

export type DistanceCorrectionOption = {
  type: UnitsOptionType.DistanceCorrection | UnitsOptionType.HeightAdjustment
  correction: UnitizedNumber<Length>
}

export type AngleCorrectionOption = {
  type:
    | UnitsOptionType.FrontsightAzimuthCorrection
    | UnitsOptionType.BacksightAzimuthCorrection
    | UnitsOptionType.FrontsightInclinationCorrection
    | UnitsOptionType.BacksightInclinationCorrection
  correction: UnitizedNumber<Angle>
}

export type BacksightTypeOption = {
  type:
    | UnitsOptionType.BacksightAzimuthType
    | UnitsOptionType.BacksightInclinationType
  isCorrected: boolean
  tolerance: UnitizedNumber<Angle>
  doNotAverage: boolean
}

export type ResetOption = {
  type: UnitsOptionType.Reset
}
export type SaveOption = {
  type: UnitsOptionType.Save
}
export type RestoreOption = {
  type: UnitsOptionType.Restore
}

export enum StationNameCaseConversion {
  Upper = 'Upper',
  Lower = 'Lower',
  Mixed = 'Mixed',
}

export type StationNameCaseOption = {
  type: UnitsOptionType.StationNameCase
  conversion: StationNameCaseConversion
}

export enum LrudStyle {
  FromStationPerpendicular = 'F',
  ToStationPerpendicular = 'T',
  FromStationBisector = 'FB',
  ToStationBisector = 'TB',
}

export enum LrudItem {
  Left = 'L',
  Right = 'R',
  Up = 'U',
  Down = 'D',
}

export type LrudStyleOption = {
  type: UnitsOptionType.LrudStyle
  style: LrudStyle
  order?: [LrudItem, LrudItem, LrudItem, LrudItem]
}

export type PrefixOption = {
  type: UnitsOptionType.Prefix
  level: 1 | 2 | 3
  prefix: string
}

export enum TapingMethod {
  InstrumentToTarget = 'IT',
  StationToStation = 'SS',
  InstrumentToStation = 'IS',
  StationToTarget = 'ST',
}

export type TapingMethodOption = {
  type: UnitsOptionType.TapingMethod
  tapingMethod: TapingMethod
}

export type UnitVarianceOption = {
  type:
    | UnitsOptionType.UnitVariance
    | UnitsOptionType.HorizontalUnitVariance
    | UnitsOptionType.VerticalUnitVariance
  scalingFactor: number
}

export type FlagOption = {
  type: UnitsOptionType.Flag
  flag?: string | null | undefined
}

export type MacroOption = {
  type: UnitsOptionType.Macro
  name: string
  replacement?: string | null | undefined
}

export type UnitsOption =
  | CompassAndTapeOption
  | RectOption
  | OrderOption
  | AzimuthUnitOption
  | DistanceUnitOption
  | InclinationUnitOption
  | NorthCorrectionOption
  | DistanceCorrectionOption
  | AngleCorrectionOption
  | BacksightTypeOption
  | ResetOption
  | SaveOption
  | RestoreOption
  | StationNameCaseOption
  | LrudStyleOption
  | PrefixOption
  | TapingMethodOption
  | UnitVarianceOption
  | FlagOption
  | MacroOption

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
    case UnitsOptionType.EveryDistanceUnit:
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
        option.order ? `?${option.order.join('')}` : ''
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
      return option.flag ? `FLAG=${option.flag}` : 'FLAG'
    case UnitsOptionType.Macro:
      return `$${option.name}${
        option.replacement ? `=${option.replacement}` : ''
      }`
  }
}

export type UnitsDirective = {
  type: SrvLineType.UnitsDirective
  options: UnitsOption[]
  comment?: string | null | undefined
  raw?: Segment | null | undefined
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
      case UnitsOptionType.EveryDistanceUnit:
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
      case UnitsOptionType.EveryDistanceUnit:
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
  return parts.join(' ')
}

export type SegmentDirective = {
  type: SrvLineType.SegmentDirective
  segment: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export function formatSegmentDirective({
  segment,
  comment,
  raw,
}: SegmentDirective): string {
  if (raw) return raw.value
  return `#SEGMENT ${segment}${comment ? ` ; ${comment}` : ''}`
}
enum VarianceAssignmentType {
  Length = '_',
  RMSError = 'R',
  FloatShot = '?',
  FloatTraverse = '*',
}

type VarianceAssignment =
  | {
      type: VarianceAssignmentType.Length | VarianceAssignmentType.RMSError
      length: UnitizedNumber<Length>
    }
  | { type: VarianceAssignmentType.FloatShot }
  | { type: VarianceAssignmentType.FloatTraverse }

export type FixDirective = {
  type: SrvLineType.FixDirective
  station: string
  latitude?: UnitizedNumber<Angle> | null | undefined
  longitude?: UnitizedNumber<Angle> | null | undefined
  east?: UnitizedNumber<Length> | null | undefined
  north?: UnitizedNumber<Length> | null | undefined
  up: UnitizedNumber<Length>
  horizontalVariance?: VarianceAssignment | null | undefined
  verticalVariance?: VarianceAssignment | null | undefined
  note?: string | null | undefined
  segment?: string | null | undefined
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export type PrefixDirective = {
  type: SrvLineType.PrefixDirective
  level: 1 | 2 | 3
  prefix?: string | null | undefined
  comment?: string | null | undefined
  raw?: Segment | null | undefined
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
  return parts.join(' ')
}

export type NoteDirective = {
  type: SrvLineType.NoteDirective
  station: string
  note: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export function formatNoteDirective({
  station,
  note,
  comment,
  raw,
}: NoteDirective): string {
  if (raw) return raw.value
  return `#NOTE ${station} ${note}${comment ? `; ${comment}` : ''}`
}

export type FlagDirective = {
  type: SrvLineType.FlagDirective
  stations: string[]
  flag: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export function formatFlagDirective({
  stations,
  flag,
  comment,
  raw,
}: FlagDirective): string {
  if (raw) return raw.value
  return `#FLAG ${stations.join(' ')} /${flag}${comment ? `; ${comment}` : ''}`
}

export enum SymbolOpacity {
  Solid = 'S',
  Opaque = 'O',
  Clear = 'C',
  Transparent = 'T',
}
export enum SymbolShape {
  Square = 'S',
  Circle = 'C',
  Triangle = 'T',
  PlusSign = 'P',
}

export type Color = {
  r: number
  g: number
  b: number
}

export function formatColor({ r, g, b }: Color): string {
  return `(${r}, ${g}, ${b})`
}

export type SymbolDirective = {
  type: SrvLineType.SymbolDirective
  opacity?: SymbolOpacity | null | undefined
  shape?: SymbolShape | null | undefined
  pointSize?: number | null | undefined
  color?: Color | null | undefined
  flag?: string | null | undefined
  comment?: string | null | undefined
  raw?: Segment | null | undefined
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
  } /${flag}${comment ? `; ${comment}` : ''}`
}

export type DateDirective = {
  type: SrvLineType.DateDirective
  date: Date
  comment?: string | null | undefined
  raw?: Segment | null | undefined
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
  )}-${String(date.getDate()).padStart(2, '0')}${comment ? `; ${comment}` : ''}`
}

export type BlockComment = {
  type: SrvLineType.BlockComment
  comment: string
  raw?: Segment | null | undefined
}

export function formatBlockComment({ comment, raw }: BlockComment): string {
  if (raw) return raw.value
  return `#[
${comment}
#]`
}

export type Shot = {
  type: SrvLineType.Shot
  from?: string | null | undefined
  to?: string | null | undefined
  distance?: UnitizedNumber<Length> | null | undefined
  frontsightAzimuth?: UnitizedNumber<Angle> | null | undefined
  backsightAzimuth?: UnitizedNumber<Angle> | null | undefined
  frontsightInclination?: UnitizedNumber<Angle> | null | undefined
  backsightInclination?: UnitizedNumber<Angle> | null | undefined
  instrumentHeight?: UnitizedNumber<Length> | null | undefined
  targetHeight?: UnitizedNumber<Length> | null | undefined
  horizontalVariance?: VarianceAssignment | null | undefined
  verticalVariance?: VarianceAssignment | null | undefined
  left?: UnitizedNumber<Length> | null | undefined
  right?: UnitizedNumber<Length> | null | undefined
  up?: UnitizedNumber<Length> | null | undefined
  down?: UnitizedNumber<Length> | null | undefined
  lrudFacingDirection?: UnitizedNumber<Angle> | null | undefined
  leftDirection?: UnitizedNumber<Angle> | null | undefined
  rightDirection?: UnitizedNumber<Angle> | null | undefined
  cFlag?: boolean | null | undefined
  segment?: string | null | undefined
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export type Comment = {
  type: SrvLineType.Comment
  comment: string
  raw?: Segment | null | undefined
}

export type SrvLine =
  | Shot
  | UnitsDirective
  | FixDirective
  | SegmentDirective
  | FlagDirective
  | SymbolDirective
  | NoteDirective
  | DateDirective
  | BlockComment
  | Comment

export const defaultSrvSettings = (): SrvSettings => ({
  shotType: ShotType.CompassAndTape,
  compassAndTapeOrder: [
    CompassAndTapeItem.Distance,
    CompassAndTapeItem.Azimuth,
    CompassAndTapeItem.Inclination,
  ],
  rectilinearOrder: [
    RectilinearItem.East,
    RectilinearItem.North,
    RectilinearItem.Up,
  ],
  primaryDistanceUnit: Length.meters,
  secondaryDistanceUnit: Length.meters,
  frontsightAzimuthUnit: Angle.degrees,
  backsightAzimuthUnit: Angle.degrees,
  frontsightInclinationUnit: Angle.degrees,
  backsightInclinationUnit: Angle.degrees,
  magneticDeclination: Unitize.degrees(0),
  gridNorthCorrection: Unitize.degrees(0),
  rectilinearNorthCorrection: Unitize.degrees(0),
  distanceCorrection: Unitize.meters(0),
  frontsightAzimuthCorrection: Unitize.degrees(0),
  backsightAzimuthCorrection: Unitize.degrees(0),
  frontsightInclinationCorrection: Unitize.degrees(0),
  backsightInclinationCorrection: Unitize.degrees(0),
  heightAdjustment: Unitize.meters(0),
  isBacksightAzimuthCorrected: false,
  backsightAzimuthTolerance: Unitize.degrees(5),
  doNotAverageBacksightAzimuth: false,
  isBacksightInclinationCorrected: false,
  backsightInclinationTolerance: Unitize.degrees(5),
  doNotAverageBacksightInclination: false,
  stationNameCaseConversion: StationNameCaseConversion.Mixed,
  lrudStyle: LrudStyle.FromStationPerpendicular,
  lrudOrder: [LrudItem.Left, LrudItem.Right, LrudItem.Up, LrudItem.Down],
  prefix: [null, null, null],
  tapingMethod: TapingMethod.InstrumentToTarget,
  horizontalUnitVariance: 1,
  verticalUnitVariance: 1,
  flag: null,
  segment: null,
})
