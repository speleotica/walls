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
  Comment = '#[',
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
    string | null | undefined,
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
  DistanceUnit = '_',
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

export const compassAndTapeOption = (): CompassAndTapeOption => ({
  type: UnitsOptionType.CompassAndTape,
})

/**
 * Indicates following shots are measured with true-northing-relative easting/northing/elevation displacemenets
 */
export type RectilinearOption = {
  type: UnitsOptionType.Rectilinear
}
export const rectilinearOption = (): RectilinearOption => ({
  type: UnitsOptionType.Rectilinear,
})

export enum CompassAndTapeItem {
  Distance = 'D',
  Azimuth = 'A',
  Inclination = 'V',
}
export enum RectilinearItem {
  Easting = 'E',
  Northing = 'N',
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
export const orderOption = (
  order: CompassAndTapeOrder | RectilinearOrder
): OrderOption => ({
  type: UnitsOptionType.Order,
  order,
})

export type AzimuthUnitOption = {
  type:
    | UnitsOptionType.FrontsightAzimuthUnit
    | UnitsOptionType.BacksightAzimuthUnit
  unit: Unit<Angle>
}
export const frontsightAzimuthUnitOption = (
  unit: Unit<Angle>
): AzimuthUnitOption => ({
  type: UnitsOptionType.FrontsightAzimuthUnit,
  unit,
})
export const backsightAzimuthUnitOption = (
  unit: Unit<Angle>
): AzimuthUnitOption => ({
  type: UnitsOptionType.BacksightAzimuthUnit,
  unit,
})

export type DistanceUnitOption = {
  type:
    | UnitsOptionType.PrimaryDistanceUnit
    | UnitsOptionType.SecondaryDistanceUnit
    | UnitsOptionType.DistanceUnit
  unit: Unit<Length>
}
export const primaryDistanceUnitOption = (
  unit: Unit<Length>
): DistanceUnitOption => ({
  type: UnitsOptionType.PrimaryDistanceUnit,
  unit,
})
export const secondaryDistanceUnitOption = (
  unit: Unit<Length>
): DistanceUnitOption => ({
  type: UnitsOptionType.SecondaryDistanceUnit,
  unit,
})
export const distanceUnitOption = (unit: Unit<Length>): DistanceUnitOption => ({
  type: UnitsOptionType.DistanceUnit,
  unit,
})

export type InclinationUnitOption = {
  type:
    | UnitsOptionType.FrontsightInclinationUnit
    | UnitsOptionType.BacksightInclinationUnit
  unit: Unit<Angle>
}
export const frontsightInclinationUnitOption = (
  unit: Unit<Angle>
): InclinationUnitOption => ({
  type: UnitsOptionType.FrontsightInclinationUnit,
  unit,
})
export const backsightInclinationUnitOption = (
  unit: Unit<Angle>
): InclinationUnitOption => ({
  type: UnitsOptionType.BacksightInclinationUnit,
  unit,
})

export type NorthCorrectionOption = {
  type:
    | UnitsOptionType.MagneticDeclination
    | UnitsOptionType.GridNorthCorrection
    | UnitsOptionType.RectilinearNorthCorrection
  trueNorthOffset: UnitizedNumber<Angle>
}
export const magneticDeclinationOption = (
  trueNorthOffset: UnitizedNumber<Angle>
): NorthCorrectionOption => ({
  type: UnitsOptionType.MagneticDeclination,
  trueNorthOffset,
})
export const gridNorthCorrectionOption = (
  trueNorthOffset: UnitizedNumber<Angle>
): NorthCorrectionOption => ({
  type: UnitsOptionType.GridNorthCorrection,
  trueNorthOffset,
})
export const rectilinearNorthCorrectionOption = (
  trueNorthOffset: UnitizedNumber<Angle>
): NorthCorrectionOption => ({
  type: UnitsOptionType.RectilinearNorthCorrection,
  trueNorthOffset,
})

export type DistanceCorrectionOption = {
  type: UnitsOptionType.DistanceCorrection | UnitsOptionType.HeightAdjustment
  correction: UnitizedNumber<Length>
}
export const distanceCorrectionOption = (
  correction: UnitizedNumber<Length>
): DistanceCorrectionOption => ({
  type: UnitsOptionType.DistanceCorrection,
  correction,
})
export const heightAdjustmentOption = (
  correction: UnitizedNumber<Length>
): DistanceCorrectionOption => ({
  type: UnitsOptionType.HeightAdjustment,
  correction,
})

export type AngleCorrectionOption = {
  type:
    | UnitsOptionType.FrontsightAzimuthCorrection
    | UnitsOptionType.BacksightAzimuthCorrection
    | UnitsOptionType.FrontsightInclinationCorrection
    | UnitsOptionType.BacksightInclinationCorrection
  correction: UnitizedNumber<Angle>
}
export const frontsightAzimuthCorrectionOption = (
  correction: UnitizedNumber<Angle>
): AngleCorrectionOption => ({
  type: UnitsOptionType.FrontsightAzimuthCorrection,
  correction,
})
export const backsightAzimuthCorrectionOption = (
  correction: UnitizedNumber<Angle>
): AngleCorrectionOption => ({
  type: UnitsOptionType.BacksightAzimuthCorrection,
  correction,
})
export const frontsightInclinationCorrectionOption = (
  correction: UnitizedNumber<Angle>
): AngleCorrectionOption => ({
  type: UnitsOptionType.FrontsightInclinationCorrection,
  correction,
})
export const backsightInclinationCorrectionOption = (
  correction: UnitizedNumber<Angle>
): AngleCorrectionOption => ({
  type: UnitsOptionType.BacksightInclinationCorrection,
  correction,
})

export type BacksightTypeOption = {
  type:
    | UnitsOptionType.BacksightAzimuthType
    | UnitsOptionType.BacksightInclinationType
  isCorrected: boolean
  tolerance: UnitizedNumber<Angle>
  doNotAverage: boolean
}
export const backsightAzimuthTypeOption = (
  isCorrected: boolean,
  tolerance: UnitizedNumber<Angle>,
  doNotAverage: boolean
): BacksightTypeOption => ({
  type: UnitsOptionType.BacksightAzimuthType,
  isCorrected,
  tolerance,
  doNotAverage,
})

export const backsightInclinationTypeOption = (
  isCorrected: boolean,
  tolerance: UnitizedNumber<Angle>,
  doNotAverage: boolean
): BacksightTypeOption => ({
  type: UnitsOptionType.BacksightInclinationType,
  isCorrected,
  tolerance,
  doNotAverage,
})

export type ResetOption = {
  type: UnitsOptionType.Reset
}
export const resetOption = (): ResetOption => ({ type: UnitsOptionType.Reset })
export type SaveOption = {
  type: UnitsOptionType.Save
}
export const saveOption = (): SaveOption => ({ type: UnitsOptionType.Save })
export type RestoreOption = {
  type: UnitsOptionType.Restore
}
export const restoreOption = (): RestoreOption => ({
  type: UnitsOptionType.Restore,
})

export enum StationNameCaseConversion {
  Upper = 'Upper',
  Lower = 'Lower',
  Mixed = 'Mixed',
}

export type StationNameCaseOption = {
  type: UnitsOptionType.StationNameCase
  conversion: StationNameCaseConversion
}
export const stationNameCaseOption = (
  conversion: StationNameCaseConversion
): StationNameCaseOption => ({
  type: UnitsOptionType.StationNameCase,
  conversion,
})

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
  order?: [LrudItem, LrudItem, LrudItem, LrudItem] | null
}
export const lrudStyleOption = (
  style: LrudStyle,
  order?: [LrudItem, LrudItem, LrudItem, LrudItem] | null
): LrudStyleOption => ({
  type: UnitsOptionType.LrudStyle,
  style,
  order,
})

export type PrefixOption = {
  type: UnitsOptionType.Prefix
  level: 1 | 2 | 3
  prefix?: string | null
}
export const prefixOption = (
  level: 1 | 2 | 3,
  prefix: string | null | undefined
): PrefixOption => ({
  type: UnitsOptionType.Prefix,
  level,
  prefix,
})

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
export const tapingMethodOption = (
  tapingMethod: TapingMethod
): TapingMethodOption => ({
  type: UnitsOptionType.TapingMethod,
  tapingMethod,
})

export type UnitVarianceOption = {
  type:
    | UnitsOptionType.UnitVariance
    | UnitsOptionType.HorizontalUnitVariance
    | UnitsOptionType.VerticalUnitVariance
  scalingFactor: number
}
export const unitVarianceOption = (
  scalingFactor: number
): UnitVarianceOption => ({
  type: UnitsOptionType.UnitVariance,
  scalingFactor,
})
export const horizontalUnitVarianceOption = (
  scalingFactor: number
): UnitVarianceOption => ({
  type: UnitsOptionType.HorizontalUnitVariance,
  scalingFactor,
})
export const verticalUnitVarianceOption = (
  scalingFactor: number
): UnitVarianceOption => ({
  type: UnitsOptionType.VerticalUnitVariance,
  scalingFactor,
})

export type FlagOption = {
  type: UnitsOptionType.Flag
  flag?: string | null
}
export const flagOption = (flag: string | null | undefined): FlagOption => ({
  type: UnitsOptionType.Flag,
  flag,
})

export type MacroOption = {
  type: UnitsOptionType.Macro
  name: string
  replacement?: string | null
}
export const macroOption = (
  name: string,
  replacement: string | null | undefined
): MacroOption => ({
  type: UnitsOptionType.Macro,
  name,
  replacement,
})

export type UnitsOption =
  | CompassAndTapeOption
  | RectilinearOption
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
  comment?: string | null
  raw?: Segment | null
}

export const unitsDirective = (
  options: UnitsOption[],
  comment?: string | null
): UnitsDirective => ({
  type: SrvLineType.UnitsDirective,
  options,
  comment,
})

export type SegmentDirective = {
  type: SrvLineType.SegmentDirective
  segment: string
  comment?: string | null
  raw?: Segment | null
}
export const segmentDirective = (
  segment: string,
  comment?: string | null
): SegmentDirective => ({
  type: SrvLineType.SegmentDirective,
  segment,
  comment,
})

export enum VarianceAssignmentType {
  Length = '_',
  RMSError = 'R',
  FloatShot = '?',
  FloatTraverse = '*',
}

export type LengthVarianceAssignment = {
  type: VarianceAssignmentType.Length | VarianceAssignmentType.RMSError
  length: UnitizedNumber<Length>
}

export type VarianceAssignment =
  | LengthVarianceAssignment
  | { type: VarianceAssignmentType.FloatShot }
  | { type: VarianceAssignmentType.FloatTraverse }

export const lengthVarianceAssignment = (
  length: UnitizedNumber<Length>
): LengthVarianceAssignment => ({
  type: VarianceAssignmentType.Length,
  length,
})

export const rmsErrorVarianceAssignment = (
  length: UnitizedNumber<Length>
): LengthVarianceAssignment => ({
  type: VarianceAssignmentType.RMSError,
  length,
})

export const floatShotVarianceAssignment = (): VarianceAssignment => ({
  type: VarianceAssignmentType.FloatShot,
})
export const floatTraverseVarianceAssignment = (): VarianceAssignment => ({
  type: VarianceAssignmentType.FloatTraverse,
})

export type FixDirective = {
  type: SrvLineType.FixDirective
  station: string
  latitude?: UnitizedNumber<Angle> | null
  longitude?: UnitizedNumber<Angle> | null
  easting?: UnitizedNumber<Length> | null
  northing?: UnitizedNumber<Length> | null
  elevation: UnitizedNumber<Length>
  horizontalVariance?: VarianceAssignment | null
  verticalVariance?: VarianceAssignment | null
  note?: string | null
  segment?: string | null
  comment?: string | null
  raw?: Segment | null
}

type FixDirectiveRestOptions = {
  horizontalVariance?: VarianceAssignment | null
  verticalVariance?: VarianceAssignment | null
  note?: string | null
  segment?: string | null
  comment?: string | null
}

export function fixDirective(
  station: string,
  latitude: UnitizedNumber<Angle>,
  longitude: UnitizedNumber<Angle>,
  elevation: UnitizedNumber<Length>,
  options?: FixDirectiveRestOptions | null
): FixDirective
export function fixDirective(
  station: string,
  easting: UnitizedNumber<Length>,
  northing: UnitizedNumber<Length>,
  elevation: UnitizedNumber<Length>,
  options?: FixDirectiveRestOptions | null
): FixDirective
export function fixDirective(
  station: string,
  x: UnitizedNumber<Length> | UnitizedNumber<Angle>,
  y: UnitizedNumber<Length> | UnitizedNumber<Angle>,
  elevation: UnitizedNumber<Length>,
  options?: FixDirectiveRestOptions | null
): FixDirective {
  const result: FixDirective = {
    type: SrvLineType.FixDirective,
    station,
    elevation,
    ...options,
  }
  if (x.unit.type === Length.type) {
    result.easting = x as UnitizedNumber<Length>
  } else {
    result.longitude = x as UnitizedNumber<Angle>
  }
  if (y.unit.type === Length.type) {
    result.northing = y as UnitizedNumber<Length>
  } else {
    result.latitude = y as UnitizedNumber<Angle>
  }
  return result
}

export type PrefixDirective = {
  type: SrvLineType.PrefixDirective
  level: 1 | 2 | 3
  prefix?: string | null
  comment?: string | null
  raw?: Segment | null
}
export const prefixDirective = (
  level: 1 | 2 | 3,
  prefix: string | null | undefined,
  comment?: string | null
): PrefixDirective => ({
  type: SrvLineType.PrefixDirective,
  level,
  prefix,
  comment,
})

export type NoteDirective = {
  type: SrvLineType.NoteDirective
  station: string
  note: string
  comment?: string | null
  raw?: Segment | null
}
export const noteDirective = (
  station: string,
  note: string,
  comment?: string | null
): NoteDirective => ({
  type: SrvLineType.NoteDirective,
  station,
  note,
  comment,
})

export type FlagDirective = {
  type: SrvLineType.FlagDirective
  stations: string[]
  flag: string
  comment?: string | null
  raw?: Segment | null
}
export const flagDirective = (
  stations: string[],
  flag: string,
  comment?: string | null
): FlagDirective => ({
  type: SrvLineType.FlagDirective,
  stations,
  flag,
  comment,
})

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
  opacity?: SymbolOpacity | null
  shape?: SymbolShape | null
  pointSize?: number | null
  color?: Color | null
  flag?: string | null
  comment?: string | null
  raw?: Segment | null
}
export const symbolDirective = (
  opacity: SymbolOpacity | null | undefined,
  shape: SymbolShape | null | undefined,
  pointSize: number | null | undefined,
  color: Color | null | undefined,
  flag?: string | null,
  comment?: string | null
): SymbolDirective => ({
  type: SrvLineType.SymbolDirective,
  opacity,
  shape,
  pointSize,
  color,
  flag,
  comment,
})

export type DateDirective = {
  type: SrvLineType.DateDirective
  date: Date
  comment?: string | null
  raw?: Segment | null
}
export const dateDirective = (
  date: Date,
  comment?: string | null
): DateDirective => ({
  type: SrvLineType.DateDirective,
  date,
  comment,
})

export type CompassAndTapeMeasurements = {
  type: ShotType.CompassAndTape
  distance: UnitizedNumber<Length>
  frontsightAzimuth?: UnitizedNumber<Angle> | null
  backsightAzimuth?: UnitizedNumber<Angle> | null
  frontsightInclination?: UnitizedNumber<Angle> | null
  backsightInclination?: UnitizedNumber<Angle> | null
  instrumentHeight?: UnitizedNumber<Length> | null
  targetHeight?: UnitizedNumber<Length> | null
}

export type RectilinearMeasurements = {
  type: ShotType.Rectilinear
  easting: UnitizedNumber<Length>
  northing: UnitizedNumber<Length>
  elevation?: UnitizedNumber<Length> | null
}

export type ShotMeasurements =
  | CompassAndTapeMeasurements
  | RectilinearMeasurements

export type Shot = {
  type: SrvLineType.Shot
  from?: string | null
  to?: string | null
  measurements?: ShotMeasurements | null
  horizontalVariance?: VarianceAssignment | null
  verticalVariance?: VarianceAssignment | null
  left?: UnitizedNumber<Length> | null
  right?: UnitizedNumber<Length> | null
  up?: UnitizedNumber<Length> | null
  down?: UnitizedNumber<Length> | null
  lrudFacingAzimuth?: UnitizedNumber<Angle> | null
  leftAzimuth?: UnitizedNumber<Angle> | null
  rightAzimuth?: UnitizedNumber<Angle> | null
  cFlag?: boolean | null
  segment?: string | null
  comment?: string | null
  raw?: Segment | null
}

type ShotRestOptions = {
  cFlag?: boolean | null
  segment?: string | null
  comment?: string | null
  horizontalVariance?: VarianceAssignment | null
  verticalVariance?: VarianceAssignment | null
}

type CompassAndTapeShotRestOptions = {
  cFlag?: boolean | null
  segment?: string | null
  comment?: string | null
  instrumentHeight?: UnitizedNumber<Length> | null
  targetHeight?: UnitizedNumber<Length> | null
  horizontalVariance?: VarianceAssignment | null
  verticalVariance?: VarianceAssignment | null
}

type BuilderLruds =
  | [
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
    ]
  | [
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Angle>,
    ]
  | [
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Length> | null | undefined,
      UnitizedNumber<Angle>,
      UnitizedNumber<Angle>,
    ]

export const compassAndTapeShot = (
  from: string | null | undefined,
  to: string | null | undefined,
  distance: UnitizedNumber<Length>,
  azimuth:
    | UnitizedNumber<Angle>
    | [
        UnitizedNumber<Angle> | null | undefined,
        UnitizedNumber<Angle> | null | undefined,
      ]
    | null
    | undefined,
  inclination:
    | UnitizedNumber<Angle>
    | [
        UnitizedNumber<Angle> | null | undefined,
        UnitizedNumber<Angle> | null | undefined,
      ]
    | null
    | undefined,
  lruds?: BuilderLruds | null,
  options?: CompassAndTapeShotRestOptions | null
): Shot => {
  const { instrumentHeight, targetHeight, ...rest } = options || {}
  return {
    type: SrvLineType.Shot,
    from,
    to,
    measurements: {
      type: ShotType.CompassAndTape,
      distance,
      frontsightAzimuth: Array.isArray(azimuth) ? azimuth[0] : azimuth,
      backsightAzimuth: Array.isArray(azimuth) ? azimuth[1] : undefined,
      frontsightInclination:
        Array.isArray(inclination) ? inclination[0] : inclination,
      backsightInclination:
        Array.isArray(inclination) ? inclination[1] : undefined,
      instrumentHeight,
      targetHeight,
    },
    left: lruds?.[0],
    right: lruds?.[1],
    up: lruds?.[2],
    down: lruds?.[3],
    lrudFacingAzimuth: lruds?.length === 5 ? lruds[4] : undefined,
    leftAzimuth: lruds?.length === 6 ? lruds[4] : undefined,
    rightAzimuth: lruds?.length === 6 ? lruds[5] : undefined,
    ...rest,
  }
}
export const rectilinearShot = (
  from: string | null | undefined,
  to: string | null | undefined,
  easting: UnitizedNumber<Length>,
  northing: UnitizedNumber<Length>,
  elevation: UnitizedNumber<Length>,
  lruds?: BuilderLruds | null,
  options?: ShotRestOptions | null
): Shot => ({
  type: SrvLineType.Shot,
  from,
  to,
  measurements: {
    type: ShotType.Rectilinear,
    easting,
    northing,
    elevation,
  },
  left: lruds?.[0],
  right: lruds?.[1],
  up: lruds?.[2],
  down: lruds?.[3],
  lrudFacingAzimuth: lruds?.length === 5 ? lruds[4] : undefined,
  leftAzimuth: lruds?.length === 6 ? lruds[4] : undefined,
  rightAzimuth: lruds?.length === 6 ? lruds[5] : undefined,
  ...options,
})

export const stationLruds = (
  station: string,
  lruds?: BuilderLruds | null,
  options?: ShotRestOptions | null
): Shot => ({
  type: SrvLineType.Shot,
  from: station,
  left: lruds?.[0],
  right: lruds?.[1],
  up: lruds?.[2],
  down: lruds?.[3],
  lrudFacingAzimuth: lruds?.length === 5 ? lruds[4] : undefined,
  leftAzimuth: lruds?.length === 6 ? lruds[4] : undefined,
  rightAzimuth: lruds?.length === 6 ? lruds[5] : undefined,
  ...options,
})

export type Comment = {
  type: SrvLineType.Comment
  comment: string
  block?: boolean | null
  raw?: Segment | null
}
export const comment = (comment: string): Comment => ({
  type: SrvLineType.Comment,
  comment,
})

export type SrvLine =
  | Shot
  | UnitsDirective
  | FixDirective
  | SegmentDirective
  | PrefixDirective
  | FlagDirective
  | SymbolDirective
  | NoteDirective
  | DateDirective
  | Comment

export const defaultSrvSettings = (): SrvSettings => ({
  shotType: ShotType.CompassAndTape,
  compassAndTapeOrder: [
    CompassAndTapeItem.Distance,
    CompassAndTapeItem.Azimuth,
    CompassAndTapeItem.Inclination,
  ],
  rectilinearOrder: [
    RectilinearItem.Easting,
    RectilinearItem.Northing,
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

export type WallsSrvFile = {
  lines: SrvLine[]
}
