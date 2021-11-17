import { UnitizedNumber, Length, Angle, Unit } from '@speleotica/unitized'

export enum DisplayLatLongFormat {
  Degrees,
  DegreesMinutes,
  DegreesMinutesSeconds,
}

// Georeference flags
// (from Walls source code: enum e_ref {REF_FMTDM=1,REF_FMTDMS=2,REF_FMTMASK=3,REF_LONDIR=4,REF_LATDIR=8})
export const FormatDegreesMinutes = 1 << 0
export const FormatDegreesMinutesSeconds = 1 << 1
export const WesternHemisphere = 1 << 2
export const SouthernHemisphere = 1 << 3

export type Georeference = {
  displayLatLongFormat: DisplayLatLongFormat
  utmZone: number
  utmNorthing: UnitizedNumber<Length>
  utmEasting: UnitizedNumber<Length>
  utmConvergenceAngle: UnitizedNumber<Angle>
  elevation: UnitizedNumber<Length>
  latitude: UnitizedNumber<Angle>
  longitude: UnitizedNumber<Angle>
  wallsDatumIndex: number
  datum: string
}

export function getGeoreferenceFlags({
  displayLatLongFormat,
  latitude,
  longitude,
}: Georeference): number {
  let flags = 0
  if (displayLatLongFormat === DisplayLatLongFormat.DegreesMinutes)
    flags |= FormatDegreesMinutes
  else if (displayLatLongFormat === DisplayLatLongFormat.DegreesMinutesSeconds)
    flags |= FormatDegreesMinutesSeconds
  if (latitude.isNegative) flags |= SouthernHemisphere
  if (longitude.isNegative) flags |= WesternHemisphere
  return flags
}

export enum LaunchAction {
  Properties,
  Edit,
  Open,
}

export enum View {
  NorthOrEast,
  NorthOrWest,
  North,
  East,
  West,
}

// Suspiciously, the rightmost bit in the Walls source code (prjhier.h) is name
// defines segment.  I guess the rightmost 3 bits get inserted by something else.

// status BITS
//  2^0 : Type = Book
//  2^1 : detached
//  2^2 : ?
//  2^3 : name defines segment
//  2^4 : 1 = Feet, 0 = Meters
//  2^5 : ? (FLG_WESTWARD in Walls source code, not sure if it's still used?)
// Use Georeference:
//  2^6 : 1 = no
//  2^7 : 1 = yes
// Derive decl from date:
//  2^8 : 1 = no
//  2^9 : 1 = yes
// UTM/GPS Grid-relative:
//  2^10: 1 = no
//  2^11: 1 = yes
// Preserve vertical shot orientation:
//  2^12: 1 = no
//  2^13: 1 = yes
// Preserve vertical shot length:
//  2^14: 1 = no
//  2^15: 1 = yes
// Other type
//  2^16: 1 = type is other (FLG_SURVEYNOT in Walls source code)
//  2^17: edit on launch
//  2^18: open on launch
// Default view after compilation (bits 21-19):
//     1: North or East
//	  10: North or West
//    11: North
//   100: East
//   101: West
//
//  2^22: Process source SVG if one is attached

export const BookBit = 1 << 0
export const DetachedBit = 1 << 1
export const NameDefinesSegmentBit = 1 << 3
export const FeetBit = 1 << 4
export const DontUseGeoreferenceBit = 1 << 6
export const UseGeoreferenceBit = 1 << 7
export const DontDeriveDeclBit = 1 << 8
export const DeriveDeclBit = 1 << 9
export const NotGridRelativeBit = 1 << 10
export const GridRelativeBit = 1 << 11
export const DontPreserveVertShotOrientationBit = 1 << 12
export const PreserveVertShotOrientationBit = 1 << 13
export const DontPreserveVertShotLengthBit = 1 << 14
export const PreserveVertShotLengthBit = 1 << 15
export const OtherTypeBit = 1 << 16
export const EditOnLaunchBit = 1 << 17
export const OpenOnLaunchBit = 1 << 18
export const DefaultViewAfterCompilationMask = 7 << 19
export const NorthOrEastViewBits = 1 << 19
export const NorthOrWestViewBits = 2 << 19
export const NorthViewBits = 3 << 19
export const EastViewBits = 4 << 19
export const WestViewBits = 5 << 19
export const ProcessSvgIfAttachedBit = 1 << 22

export enum WallsProjectEntryType {
  Book,
  Survey,
  Other,
}

interface WallsProjectEntryBase {
  title: string
  name?: string | null | undefined
  path?: string | null | undefined
  options?: string | null | undefined
  georeference?: Georeference | null | undefined
  detached: boolean
  nameDefinesSegment: boolean
  reviewDistanceUnit: Unit<Length>
  useGeoreference?: boolean | null | undefined
  deriveMagneticDeclination?: boolean | null | undefined
  gridRelative?: boolean | null | undefined
  preserveVertShotOrientation?: boolean | null | undefined
  preserveVertShotLength?: boolean | null | undefined
  launchAction: LaunchAction
  defaultViewAfterCompilation?: View | null | undefined
  processSvgIfAttached: boolean
}

export function getStatus(entry: WallsProjectEntry): number {
  let result = 0
  if (entry.type === WallsProjectEntryType.Book) result |= BookBit
  if (entry.detached) result |= DetachedBit
  if (entry.nameDefinesSegment) result |= NameDefinesSegmentBit
  if (entry.reviewDistanceUnit === Length.feet) result |= FeetBit
  if (entry.useGeoreference === false) result |= DontUseGeoreferenceBit
  if (entry.useGeoreference === true) result |= UseGeoreferenceBit
  if (entry.deriveMagneticDeclination === false) result |= DontDeriveDeclBit
  if (entry.deriveMagneticDeclination === true) result |= DeriveDeclBit
  if (entry.gridRelative === false) result |= NotGridRelativeBit
  if (entry.gridRelative === true) result |= GridRelativeBit
  if (entry.preserveVertShotOrientation === false)
    result |= DontPreserveVertShotOrientationBit
  if (entry.preserveVertShotOrientation === true)
    result |= PreserveVertShotOrientationBit
  if (entry.preserveVertShotLength === false)
    result |= DontPreserveVertShotLengthBit
  if (entry.preserveVertShotLength === true) result |= PreserveVertShotLengthBit
  if (entry.type === WallsProjectEntryType.Other) result |= OtherTypeBit
  if (entry.launchAction === LaunchAction.Edit) result |= EditOnLaunchBit
  else if (entry.launchAction === LaunchAction.Open) result |= OpenOnLaunchBit

  switch (entry.defaultViewAfterCompilation) {
    case View.NorthOrEast:
      result |= NorthOrEastViewBits
      break
    case View.NorthOrWest:
      result |= NorthOrWestViewBits
      break
    case View.North:
      result |= NorthViewBits
      break
    case View.East:
      result |= EastViewBits
      break
    case View.West:
      result |= WestViewBits
      break
  }

  if (entry.processSvgIfAttached) result |= ProcessSvgIfAttachedBit

  return result
}

type WallsProjectEntryRestOptions = {
  options?: string | null | undefined
  georeference?: Georeference | null | undefined
  detached?: boolean | null | undefined
  nameDefinesSegment?: boolean | null | undefined
  reviewDistanceUnit?: Unit<Length> | null | undefined
  useGeoreference?: boolean | null | undefined
  deriveMagneticDeclination?: boolean | null | undefined
  gridRelative?: boolean | null | undefined
  preserveVertShotOrientation?: boolean | null | undefined
  preserveVertShotLength?: boolean | null | undefined
  launchAction?: LaunchAction | null | undefined
  defaultViewAfterCompilation?: View | null | undefined
  processSvgIfAttached?: boolean | null | undefined
}

export interface WallsProjectSurvey extends WallsProjectEntryBase {
  type: WallsProjectEntryType.Survey
}

export const wallsProjectSurvey = (
  title: string,
  name: string | null | undefined,
  path: string | null | undefined,
  {
    detached,
    nameDefinesSegment,
    reviewDistanceUnit,
    launchAction,
    processSvgIfAttached,
    ...rest
  }: WallsProjectEntryRestOptions = {}
): WallsProjectSurvey => ({
  type: WallsProjectEntryType.Survey,
  title,
  name,
  path,
  ...rest,
  detached: detached || false,
  nameDefinesSegment: nameDefinesSegment || false,
  reviewDistanceUnit: reviewDistanceUnit || Length.meters,
  launchAction: launchAction || LaunchAction.Properties,
  processSvgIfAttached: processSvgIfAttached || false,
})

export interface WallsProjectOtherEntry extends WallsProjectEntryBase {
  type: WallsProjectEntryType.Other
}

export const wallsProjectOtherEntry = (
  title: string,
  name: string | null | undefined,
  path: string | null | undefined,
  {
    detached,
    nameDefinesSegment,
    reviewDistanceUnit,
    launchAction,
    processSvgIfAttached,
    ...rest
  }: WallsProjectEntryRestOptions = {}
): WallsProjectOtherEntry => ({
  type: WallsProjectEntryType.Other,
  title,
  name,
  path,
  ...rest,
  detached: detached || false,
  nameDefinesSegment: nameDefinesSegment || false,
  reviewDistanceUnit: reviewDistanceUnit || Length.meters,
  launchAction: launchAction || LaunchAction.Properties,
  processSvgIfAttached: processSvgIfAttached || false,
})

export interface WallsProjectBook extends WallsProjectEntryBase {
  type: WallsProjectEntryType.Book
  children: WallsProjectEntry[]
}

export const wallsProjectBook = (
  title: string,
  name: string | null | undefined,
  path: string | null | undefined,
  children: WallsProjectEntry[],
  {
    detached,
    nameDefinesSegment,
    reviewDistanceUnit,
    launchAction,
    processSvgIfAttached,
    ...rest
  }: WallsProjectEntryRestOptions = {}
): WallsProjectBook => ({
  type: WallsProjectEntryType.Book,
  title,
  name,
  path,
  children,
  ...rest,
  detached: detached || false,
  nameDefinesSegment: nameDefinesSegment || false,
  reviewDistanceUnit: reviewDistanceUnit || Length.meters,
  launchAction: launchAction || LaunchAction.Properties,
  processSvgIfAttached: processSvgIfAttached || false,
})

export type WallsProjectEntry =
  | WallsProjectSurvey
  | WallsProjectOtherEntry
  | WallsProjectBook

export type WallsWpjFile = {
  root: WallsProjectBook
}
