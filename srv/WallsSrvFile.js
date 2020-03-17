'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.defaultSrvSettings = exports.comment = exports.dateDirective = exports.symbolDirective = exports.SymbolShape = exports.SymbolOpacity = exports.flagDirective = exports.noteDirective = exports.prefixDirective = exports.VarianceAssignmentType = exports.segmentDirective = exports.unitsDirective = exports.macroOption = exports.flagOption = exports.verticalUnitVarianceOption = exports.horizontalUnitVarianceOption = exports.unitVarianceOption = exports.tapingMethodOption = exports.TapingMethod = exports.prefixOption = exports.lrudStyleOption = exports.LrudItem = exports.LrudStyle = exports.stationNameCaseOption = exports.StationNameCaseConversion = exports.restoreOption = exports.saveOption = exports.resetOption = exports.backsightInclinationTypeOption = exports.backsightAzimuthTypeOption = exports.backsightInclinationCorrectionOption = exports.frontsightInclinationCorrectionOption = exports.backsightAzimuthCorrectionOption = exports.frontsightAzimuthCorrectionOption = exports.heightAdjustmentOption = exports.distanceCorrectionOption = exports.rectilinearNorthCorrectionOption = exports.gridNorthCorrectionOption = exports.magneticDeclinationOption = exports.backsightInclinationUnitOption = exports.frontsightInclinationUnitOption = exports.distanceUnitOption = exports.secondaryDistanceUnitOption = exports.primaryDistanceUnitOption = exports.backsightAzimuthUnitOption = exports.frontsightAzimuthUnitOption = exports.orderOption = exports.RectilinearItem = exports.CompassAndTapeItem = exports.rectilinearOption = exports.compassAndTapeOption = exports.UnitsOptionType = exports.ShotType = exports.SrvLineType = void 0

var _unitized = require('@speleotica/unitized')

var SrvLineType
exports.SrvLineType = SrvLineType

;(function(SrvLineType) {
  SrvLineType['Shot'] = '_'
  SrvLineType['UnitsDirective'] = '#UNITS'
  SrvLineType['SegmentDirective'] = '#SEGMENT'
  SrvLineType['FixDirective'] = '#FIX'
  SrvLineType['PrefixDirective'] = '#PREFIX'
  SrvLineType['NoteDirective'] = '#NOTE'
  SrvLineType['FlagDirective'] = '#FLAG'
  SrvLineType['SymbolDirective'] = '#SYMBOL'
  SrvLineType['DateDirective'] = '#DATE'
  SrvLineType['Comment'] = '#['
})(SrvLineType || (exports.SrvLineType = SrvLineType = {}))

var ShotType
exports.ShotType = ShotType

;(function(ShotType) {
  ShotType['CompassAndTape'] = 'CT'
  ShotType['Rectilinear'] = 'RECT'
})(ShotType || (exports.ShotType = ShotType = {}))

var UnitsOptionType
/**
 * Indicates following shots are measured with compass and tape
 */

exports.UnitsOptionType = UnitsOptionType

;(function(UnitsOptionType) {
  UnitsOptionType['CompassAndTape'] = 'CT'
  UnitsOptionType['Rectilinear'] = 'RECT'
  UnitsOptionType['Order'] = 'Order='
  UnitsOptionType['FrontsightAzimuthUnit'] = 'A='
  UnitsOptionType['BacksightAzimuthUnit'] = 'AB='
  UnitsOptionType['PrimaryDistanceUnit'] = 'D='
  UnitsOptionType['SecondaryDistanceUnit'] = 'S='
  UnitsOptionType['DistanceUnit'] = '_'
  UnitsOptionType['FrontsightInclinationUnit'] = 'V='
  UnitsOptionType['BacksightInclinationUnit'] = 'VB='
  UnitsOptionType['MagneticDeclination'] = 'DECL='
  UnitsOptionType['GridNorthCorrection'] = 'GRID='
  UnitsOptionType['RectilinearNorthCorrection'] = 'RECT='
  UnitsOptionType['DistanceCorrection'] = 'INCD='
  UnitsOptionType['FrontsightAzimuthCorrection'] = 'INCA='
  UnitsOptionType['BacksightAzimuthCorrection'] = 'INCAB='
  UnitsOptionType['FrontsightInclinationCorrection'] = 'INCV='
  UnitsOptionType['BacksightInclinationCorrection'] = 'INCVB='
  UnitsOptionType['HeightAdjustment'] = 'INCH='
  UnitsOptionType['BacksightAzimuthType'] = 'TYPEAB='
  UnitsOptionType['BacksightInclinationType'] = 'TYPEVB='
  UnitsOptionType['Reset'] = 'RESET'
  UnitsOptionType['Save'] = 'SAVE'
  UnitsOptionType['Restore'] = 'RESTORE'
  UnitsOptionType['StationNameCase'] = 'CASE='
  UnitsOptionType['LrudStyle'] = 'LRUD='
  UnitsOptionType['Prefix'] = 'PREFIX='
  UnitsOptionType['TapingMethod'] = 'TAPE='
  UnitsOptionType['UnitVariance'] = 'UV='
  UnitsOptionType['HorizontalUnitVariance'] = 'UVH='
  UnitsOptionType['VerticalUnitVariance'] = 'UVV='
  UnitsOptionType['Flag'] = 'FLAG='
  UnitsOptionType['Macro'] = '$'
})(UnitsOptionType || (exports.UnitsOptionType = UnitsOptionType = {}))

var compassAndTapeOption = function compassAndTapeOption() {
  return {
    type: UnitsOptionType.CompassAndTape,
  }
}
/**
 * Indicates following shots are measured with true-north-relative east/north/elevation displacemenets
 */

exports.compassAndTapeOption = compassAndTapeOption

var rectilinearOption = function rectilinearOption() {
  return {
    type: UnitsOptionType.Rectilinear,
  }
}

exports.rectilinearOption = rectilinearOption
var CompassAndTapeItem
exports.CompassAndTapeItem = CompassAndTapeItem

;(function(CompassAndTapeItem) {
  CompassAndTapeItem['Distance'] = 'D'
  CompassAndTapeItem['Azimuth'] = 'A'
  CompassAndTapeItem['Inclination'] = 'V'
})(CompassAndTapeItem || (exports.CompassAndTapeItem = CompassAndTapeItem = {}))

var RectilinearItem
exports.RectilinearItem = RectilinearItem

;(function(RectilinearItem) {
  RectilinearItem['East'] = 'E'
  RectilinearItem['North'] = 'N'
  RectilinearItem['Elevation'] = 'U'
})(RectilinearItem || (exports.RectilinearItem = RectilinearItem = {}))

var orderOption = function orderOption(order) {
  return {
    type: UnitsOptionType.Order,
    order: order,
  }
}

exports.orderOption = orderOption

var frontsightAzimuthUnitOption = function frontsightAzimuthUnitOption(unit) {
  return {
    type: UnitsOptionType.FrontsightAzimuthUnit,
    unit: unit,
  }
}

exports.frontsightAzimuthUnitOption = frontsightAzimuthUnitOption

var backsightAzimuthUnitOption = function backsightAzimuthUnitOption(unit) {
  return {
    type: UnitsOptionType.BacksightAzimuthUnit,
    unit: unit,
  }
}

exports.backsightAzimuthUnitOption = backsightAzimuthUnitOption

var primaryDistanceUnitOption = function primaryDistanceUnitOption(unit) {
  return {
    type: UnitsOptionType.PrimaryDistanceUnit,
    unit: unit,
  }
}

exports.primaryDistanceUnitOption = primaryDistanceUnitOption

var secondaryDistanceUnitOption = function secondaryDistanceUnitOption(unit) {
  return {
    type: UnitsOptionType.SecondaryDistanceUnit,
    unit: unit,
  }
}

exports.secondaryDistanceUnitOption = secondaryDistanceUnitOption

var distanceUnitOption = function distanceUnitOption(unit) {
  return {
    type: UnitsOptionType.DistanceUnit,
    unit: unit,
  }
}

exports.distanceUnitOption = distanceUnitOption

var frontsightInclinationUnitOption = function frontsightInclinationUnitOption(
  unit
) {
  return {
    type: UnitsOptionType.FrontsightInclinationUnit,
    unit: unit,
  }
}

exports.frontsightInclinationUnitOption = frontsightInclinationUnitOption

var backsightInclinationUnitOption = function backsightInclinationUnitOption(
  unit
) {
  return {
    type: UnitsOptionType.BacksightInclinationUnit,
    unit: unit,
  }
}

exports.backsightInclinationUnitOption = backsightInclinationUnitOption

var magneticDeclinationOption = function magneticDeclinationOption(
  trueNorthOffset
) {
  return {
    type: UnitsOptionType.MagneticDeclination,
    trueNorthOffset: trueNorthOffset,
  }
}

exports.magneticDeclinationOption = magneticDeclinationOption

var gridNorthCorrectionOption = function gridNorthCorrectionOption(
  trueNorthOffset
) {
  return {
    type: UnitsOptionType.GridNorthCorrection,
    trueNorthOffset: trueNorthOffset,
  }
}

exports.gridNorthCorrectionOption = gridNorthCorrectionOption

var rectilinearNorthCorrectionOption = function rectilinearNorthCorrectionOption(
  trueNorthOffset
) {
  return {
    type: UnitsOptionType.RectilinearNorthCorrection,
    trueNorthOffset: trueNorthOffset,
  }
}

exports.rectilinearNorthCorrectionOption = rectilinearNorthCorrectionOption

var distanceCorrectionOption = function distanceCorrectionOption(correction) {
  return {
    type: UnitsOptionType.DistanceCorrection,
    correction: correction,
  }
}

exports.distanceCorrectionOption = distanceCorrectionOption

var heightAdjustmentOption = function heightAdjustmentOption(correction) {
  return {
    type: UnitsOptionType.HeightAdjustment,
    correction: correction,
  }
}

exports.heightAdjustmentOption = heightAdjustmentOption

var frontsightAzimuthCorrectionOption = function frontsightAzimuthCorrectionOption(
  correction
) {
  return {
    type: UnitsOptionType.FrontsightAzimuthCorrection,
    correction: correction,
  }
}

exports.frontsightAzimuthCorrectionOption = frontsightAzimuthCorrectionOption

var backsightAzimuthCorrectionOption = function backsightAzimuthCorrectionOption(
  correction
) {
  return {
    type: UnitsOptionType.BacksightAzimuthCorrection,
    correction: correction,
  }
}

exports.backsightAzimuthCorrectionOption = backsightAzimuthCorrectionOption

var frontsightInclinationCorrectionOption = function frontsightInclinationCorrectionOption(
  correction
) {
  return {
    type: UnitsOptionType.FrontsightInclinationCorrection,
    correction: correction,
  }
}

exports.frontsightInclinationCorrectionOption = frontsightInclinationCorrectionOption

var backsightInclinationCorrectionOption = function backsightInclinationCorrectionOption(
  correction
) {
  return {
    type: UnitsOptionType.BacksightInclinationCorrection,
    correction: correction,
  }
}

exports.backsightInclinationCorrectionOption = backsightInclinationCorrectionOption

var backsightAzimuthTypeOption = function backsightAzimuthTypeOption(
  isCorrected,
  tolerance,
  doNotAverage
) {
  return {
    type: UnitsOptionType.BacksightAzimuthType,
    isCorrected: isCorrected,
    tolerance: tolerance,
    doNotAverage: doNotAverage,
  }
}

exports.backsightAzimuthTypeOption = backsightAzimuthTypeOption

var backsightInclinationTypeOption = function backsightInclinationTypeOption(
  isCorrected,
  tolerance,
  doNotAverage
) {
  return {
    type: UnitsOptionType.BacksightInclinationType,
    isCorrected: isCorrected,
    tolerance: tolerance,
    doNotAverage: doNotAverage,
  }
}

exports.backsightInclinationTypeOption = backsightInclinationTypeOption

var resetOption = function resetOption() {
  return {
    type: UnitsOptionType.Reset,
  }
}

exports.resetOption = resetOption

var saveOption = function saveOption() {
  return {
    type: UnitsOptionType.Save,
  }
}

exports.saveOption = saveOption

var restoreOption = function restoreOption() {
  return {
    type: UnitsOptionType.Restore,
  }
}

exports.restoreOption = restoreOption
var StationNameCaseConversion
exports.StationNameCaseConversion = StationNameCaseConversion

;(function(StationNameCaseConversion) {
  StationNameCaseConversion['Upper'] = 'Upper'
  StationNameCaseConversion['Lower'] = 'Lower'
  StationNameCaseConversion['Mixed'] = 'Mixed'
})(
  StationNameCaseConversion ||
    (exports.StationNameCaseConversion = StationNameCaseConversion = {})
)

var stationNameCaseOption = function stationNameCaseOption(conversion) {
  return {
    type: UnitsOptionType.StationNameCase,
    conversion: conversion,
  }
}

exports.stationNameCaseOption = stationNameCaseOption
var LrudStyle
exports.LrudStyle = LrudStyle

;(function(LrudStyle) {
  LrudStyle['FromStationPerpendicular'] = 'F'
  LrudStyle['ToStationPerpendicular'] = 'T'
  LrudStyle['FromStationBisector'] = 'FB'
  LrudStyle['ToStationBisector'] = 'TB'
})(LrudStyle || (exports.LrudStyle = LrudStyle = {}))

var LrudItem
exports.LrudItem = LrudItem

;(function(LrudItem) {
  LrudItem['Left'] = 'L'
  LrudItem['Right'] = 'R'
  LrudItem['Up'] = 'U'
  LrudItem['Down'] = 'D'
})(LrudItem || (exports.LrudItem = LrudItem = {}))

var lrudStyleOption = function lrudStyleOption(style, order) {
  return {
    type: UnitsOptionType.LrudStyle,
    style: style,
    order: order,
  }
}

exports.lrudStyleOption = lrudStyleOption

var prefixOption = function prefixOption(level, prefix) {
  return {
    type: UnitsOptionType.Prefix,
    level: level,
    prefix: prefix,
  }
}

exports.prefixOption = prefixOption
var TapingMethod
exports.TapingMethod = TapingMethod

;(function(TapingMethod) {
  TapingMethod['InstrumentToTarget'] = 'IT'
  TapingMethod['StationToStation'] = 'SS'
  TapingMethod['InstrumentToStation'] = 'IS'
  TapingMethod['StationToTarget'] = 'ST'
})(TapingMethod || (exports.TapingMethod = TapingMethod = {}))

var tapingMethodOption = function tapingMethodOption(tapingMethod) {
  return {
    type: UnitsOptionType.TapingMethod,
    tapingMethod: tapingMethod,
  }
}

exports.tapingMethodOption = tapingMethodOption

var unitVarianceOption = function unitVarianceOption(scalingFactor) {
  return {
    type: UnitsOptionType.UnitVariance,
    scalingFactor: scalingFactor,
  }
}

exports.unitVarianceOption = unitVarianceOption

var horizontalUnitVarianceOption = function horizontalUnitVarianceOption(
  scalingFactor
) {
  return {
    type: UnitsOptionType.HorizontalUnitVariance,
    scalingFactor: scalingFactor,
  }
}

exports.horizontalUnitVarianceOption = horizontalUnitVarianceOption

var verticalUnitVarianceOption = function verticalUnitVarianceOption(
  scalingFactor
) {
  return {
    type: UnitsOptionType.VerticalUnitVariance,
    scalingFactor: scalingFactor,
  }
}

exports.verticalUnitVarianceOption = verticalUnitVarianceOption

var flagOption = function flagOption(flag) {
  return {
    type: UnitsOptionType.Flag,
    flag: flag,
  }
}

exports.flagOption = flagOption

var macroOption = function macroOption(name, replacement) {
  return {
    type: UnitsOptionType.Macro,
    name: name,
    replacement: replacement,
  }
}

exports.macroOption = macroOption

var unitsDirective = function unitsDirective(options, comment) {
  return {
    type: SrvLineType.UnitsDirective,
    options: options,
    comment: comment,
  }
}

exports.unitsDirective = unitsDirective

var segmentDirective = function segmentDirective(segment, comment) {
  return {
    type: SrvLineType.SegmentDirective,
    segment: segment,
    comment: comment,
  }
}

exports.segmentDirective = segmentDirective
var VarianceAssignmentType
exports.VarianceAssignmentType = VarianceAssignmentType

;(function(VarianceAssignmentType) {
  VarianceAssignmentType['Length'] = '_'
  VarianceAssignmentType['RMSError'] = 'R'
  VarianceAssignmentType['FloatShot'] = '?'
  VarianceAssignmentType['FloatTraverse'] = '*'
})(
  VarianceAssignmentType ||
    (exports.VarianceAssignmentType = VarianceAssignmentType = {})
)

var prefixDirective = function prefixDirective(level, prefix, comment) {
  return {
    type: SrvLineType.PrefixDirective,
    level: level,
    prefix: prefix,
    comment: comment,
  }
}

exports.prefixDirective = prefixDirective

var noteDirective = function noteDirective(level, station, note, comment) {
  return {
    type: SrvLineType.NoteDirective,
    station: station,
    note: note,
    comment: comment,
  }
}

exports.noteDirective = noteDirective

var flagDirective = function flagDirective(level, stations, flag, comment) {
  return {
    type: SrvLineType.FlagDirective,
    stations: stations,
    flag: flag,
    comment: comment,
  }
}

exports.flagDirective = flagDirective
var SymbolOpacity
exports.SymbolOpacity = SymbolOpacity

;(function(SymbolOpacity) {
  SymbolOpacity['Solid'] = 'S'
  SymbolOpacity['Opaque'] = 'O'
  SymbolOpacity['Clear'] = 'C'
  SymbolOpacity['Transparent'] = 'T'
})(SymbolOpacity || (exports.SymbolOpacity = SymbolOpacity = {}))

var SymbolShape
exports.SymbolShape = SymbolShape

;(function(SymbolShape) {
  SymbolShape['Square'] = 'S'
  SymbolShape['Circle'] = 'C'
  SymbolShape['Triangle'] = 'T'
  SymbolShape['PlusSign'] = 'P'
})(SymbolShape || (exports.SymbolShape = SymbolShape = {}))

var symbolDirective = function symbolDirective(
  opacity,
  shape,
  pointSize,
  color,
  flag,
  comment
) {
  return {
    type: SrvLineType.SymbolDirective,
    opacity: opacity,
    shape: shape,
    pointSize: pointSize,
    color: color,
    flag: flag,
    comment: comment,
  }
}

exports.symbolDirective = symbolDirective

var dateDirective = function dateDirective(date, comment) {
  return {
    type: SrvLineType.DateDirective,
    date: date,
    comment: comment,
  }
}

exports.dateDirective = dateDirective

var comment = function comment(_comment) {
  return {
    type: SrvLineType.Comment,
    comment: _comment,
  }
}

exports.comment = comment

var defaultSrvSettings = function defaultSrvSettings() {
  return {
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
    primaryDistanceUnit: _unitized.Length.meters,
    secondaryDistanceUnit: _unitized.Length.meters,
    frontsightAzimuthUnit: _unitized.Angle.degrees,
    backsightAzimuthUnit: _unitized.Angle.degrees,
    frontsightInclinationUnit: _unitized.Angle.degrees,
    backsightInclinationUnit: _unitized.Angle.degrees,
    magneticDeclination: _unitized.Unitize.degrees(0),
    gridNorthCorrection: _unitized.Unitize.degrees(0),
    rectilinearNorthCorrection: _unitized.Unitize.degrees(0),
    distanceCorrection: _unitized.Unitize.meters(0),
    frontsightAzimuthCorrection: _unitized.Unitize.degrees(0),
    backsightAzimuthCorrection: _unitized.Unitize.degrees(0),
    frontsightInclinationCorrection: _unitized.Unitize.degrees(0),
    backsightInclinationCorrection: _unitized.Unitize.degrees(0),
    heightAdjustment: _unitized.Unitize.meters(0),
    isBacksightAzimuthCorrected: false,
    backsightAzimuthTolerance: _unitized.Unitize.degrees(5),
    doNotAverageBacksightAzimuth: false,
    isBacksightInclinationCorrected: false,
    backsightInclinationTolerance: _unitized.Unitize.degrees(5),
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
  }
}

exports.defaultSrvSettings = defaultSrvSettings
