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
 * Indicates following shots are measured with true-north-relative east/north/elevation displacemenets
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
  Elevation = 'U',
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
  prefix?: string | null | undefined
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

export type UnitsDirective = {
  type: SrvLineType.UnitsDirective
  options: UnitsOption[]
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export type SegmentDirective = {
  type: SrvLineType.SegmentDirective
  segment: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export enum VarianceAssignmentType {
  Length = '_',
  RMSError = 'R',
  FloatShot = '?',
  FloatTraverse = '*',
}

export type VarianceAssignment =
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
  elevation: UnitizedNumber<Length>
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

export type NoteDirective = {
  type: SrvLineType.NoteDirective
  station: string
  note: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export type FlagDirective = {
  type: SrvLineType.FlagDirective
  stations: string[]
  flag: string
  comment?: string | null | undefined
  raw?: Segment | null | undefined
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

export type DateDirective = {
  type: SrvLineType.DateDirective
  date: Date
  comment?: string | null | undefined
  raw?: Segment | null | undefined
}

export type BlockComment = {
  type: SrvLineType.BlockComment
  comment: string
  raw?: Segment | null | undefined
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
  east?: UnitizedNumber<Length> | null | undefined
  north?: UnitizedNumber<Length> | null | undefined
  elevation?: UnitizedNumber<Length> | null | undefined
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
    RectilinearItem.Elevation,
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

export type WallsSurveyFile = {
  lines: SrvLine[]
}
