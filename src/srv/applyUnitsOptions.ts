import {
  UnitsDirective,
  SrvSettings,
  UnitsOptionType,
  defaultSrvSettings,
  ShotType,
  CompassAndTapeItem,
  RectilinearItem,
} from './WallsSrvFile'

export default function applyUnitsOptions(
  {
    stack,
    macros,
  }: {
    stack: SrvSettings[]
    macros: Map<string, string>
  },
  { options }: UnitsDirective
): void {
  if (options.find((o) => o.type === UnitsOptionType.Save)) {
    if (stack.length >= 11) {
      throw new Error(`can't push more than 10 saves`)
    }
    stack.push({ ...stack[stack.length - 1] })
  }
  if (options.find((o) => o.type === UnitsOptionType.Restore)) {
    if (stack.length < 2) {
      throw new Error(`no more saves to restore`)
    }
    stack.pop()
  }
  if (options.find((o) => o.type === UnitsOptionType.Reset)) {
    stack[stack.length - 1] = defaultSrvSettings()
  }

  const top = stack[stack.length - 1]
  for (const option of options) {
    switch (option.type) {
      case UnitsOptionType.CompassAndTape:
        top.shotType = ShotType.CompassAndTape
        break
      case UnitsOptionType.Rectilinear:
        top.shotType = ShotType.Rectilinear
        break
      case UnitsOptionType.Order:
        switch (option.order[0]) {
          case CompassAndTapeItem.Distance:
          case CompassAndTapeItem.Azimuth:
          case CompassAndTapeItem.Inclination:
            top.compassAndTapeOrder = option.order
            break
          case RectilinearItem.Easting:
          case RectilinearItem.Northing:
          case RectilinearItem.Elevation:
            top.rectilinearOrder = option.order
            break
        }
        break
      case UnitsOptionType.DistanceUnit:
        top.primaryDistanceUnit = top.secondaryDistanceUnit = option.unit
        break
      case UnitsOptionType.PrimaryDistanceUnit:
        top.primaryDistanceUnit = option.unit
        break
      case UnitsOptionType.SecondaryDistanceUnit:
        top.secondaryDistanceUnit = option.unit
        break
      case UnitsOptionType.BacksightAzimuthUnit:
        top.backsightAzimuthUnit = option.unit
        break
      case UnitsOptionType.FrontsightAzimuthUnit:
        top.frontsightAzimuthUnit = option.unit
        break
      case UnitsOptionType.BacksightInclinationUnit:
        top.backsightInclinationUnit = option.unit
        break
      case UnitsOptionType.FrontsightInclinationUnit:
        top.frontsightInclinationUnit = option.unit
        break
      case UnitsOptionType.MagneticDeclination:
        top.magneticDeclination = option.trueNorthOffset
        break
      case UnitsOptionType.GridNorthCorrection:
        top.gridNorthCorrection = option.trueNorthOffset
        break
      case UnitsOptionType.RectilinearNorthCorrection:
        top.rectilinearNorthCorrection = option.trueNorthOffset
        break
      case UnitsOptionType.DistanceCorrection:
        top.distanceCorrection = option.correction
        break
      case UnitsOptionType.FrontsightAzimuthCorrection:
        top.frontsightAzimuthCorrection = option.correction
        break
      case UnitsOptionType.BacksightAzimuthCorrection:
        top.backsightAzimuthCorrection = option.correction
        break
      case UnitsOptionType.FrontsightInclinationCorrection:
        top.frontsightInclinationCorrection = option.correction
        break
      case UnitsOptionType.BacksightInclinationCorrection:
        top.backsightInclinationCorrection = option.correction
        break
      case UnitsOptionType.HeightAdjustment:
        top.heightAdjustment = option.correction
        break
      case UnitsOptionType.BacksightAzimuthType:
        top.isBacksightAzimuthCorrected = option.isCorrected
        top.backsightAzimuthTolerance = option.tolerance
        top.doNotAverageBacksightAzimuth = option.doNotAverage
        break
      case UnitsOptionType.BacksightInclinationType:
        top.isBacksightInclinationCorrected = option.isCorrected
        top.backsightInclinationTolerance = option.tolerance
        top.doNotAverageBacksightInclination = option.doNotAverage
        break
      case UnitsOptionType.StationNameCase:
        top.stationNameCaseConversion = option.conversion
        break
      case UnitsOptionType.LrudStyle:
        top.lrudStyle = option.style
        if (option.order) top.lrudOrder = option.order
        break
      case UnitsOptionType.Prefix:
        top.prefix[option.level - 1] = option.prefix || ''
        break
      case UnitsOptionType.TapingMethod:
        top.tapingMethod = option.tapingMethod
        break
      case UnitsOptionType.UnitVariance:
        top.verticalUnitVariance = top.horizontalUnitVariance =
          option.scalingFactor
        break
      case UnitsOptionType.HorizontalUnitVariance:
        top.horizontalUnitVariance = option.scalingFactor
        break
      case UnitsOptionType.VerticalUnitVariance:
        top.verticalUnitVariance = option.scalingFactor
        break
      case UnitsOptionType.Flag:
        top.flag = option.flag
        break
      case UnitsOptionType.Macro:
        macros.set(option.name, option.replacement || '')
        break
    }
  }
}
