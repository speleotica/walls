'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = applyUnitsOptions

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _WallsSrvFile = require('./WallsSrvFile')

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        ;(0, _defineProperty2['default'])(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

function applyUnitsOptions(_ref, _ref2) {
  var stack = _ref.stack,
    macros = _ref.macros
  var options = _ref2.options

  if (
    options.find(function(o) {
      return o.type === _WallsSrvFile.UnitsOptionType.Save
    })
  ) {
    if (stack.length >= 11) {
      throw new Error("can't push more than 10 saves")
    }

    stack.push(_objectSpread({}, stack[stack.length - 1]))
  }

  if (
    options.find(function(o) {
      return o.type === _WallsSrvFile.UnitsOptionType.Restore
    })
  ) {
    if (stack.length < 2) {
      throw new Error('no more saves to restore')
    }

    stack.pop()
  }

  if (
    options.find(function(o) {
      return o.type === _WallsSrvFile.UnitsOptionType.Reset
    })
  ) {
    stack[stack.length - 1] = (0, _WallsSrvFile.defaultSrvSettings)()
  }

  var top = stack[stack.length - 1]
  var _iteratorNormalCompletion = true
  var _didIteratorError = false
  var _iteratorError = undefined

  try {
    for (
      var _iterator = options[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var option = _step.value

      switch (option.type) {
        case _WallsSrvFile.UnitsOptionType.CompassAndTape:
          top.shotType = _WallsSrvFile.ShotType.CompassAndTape
          break

        case _WallsSrvFile.UnitsOptionType.Rectilinear:
          top.shotType = _WallsSrvFile.ShotType.Rectilinear
          break

        case _WallsSrvFile.UnitsOptionType.Order:
          switch (option.order[0]) {
            case _WallsSrvFile.CompassAndTapeItem.Distance:
            case _WallsSrvFile.CompassAndTapeItem.Azimuth:
            case _WallsSrvFile.CompassAndTapeItem.Inclination:
              top.compassAndTapeOrder = option.order
              break

            case _WallsSrvFile.RectilinearItem.East:
            case _WallsSrvFile.RectilinearItem.North:
            case _WallsSrvFile.RectilinearItem.Elevation:
              top.rectilinearOrder = option.order
              break
          }

          break

        case _WallsSrvFile.UnitsOptionType.DistanceUnit:
          top.primaryDistanceUnit = top.secondaryDistanceUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.PrimaryDistanceUnit:
          top.primaryDistanceUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.SecondaryDistanceUnit:
          top.secondaryDistanceUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.BacksightAzimuthUnit:
          top.backsightAzimuthUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthUnit:
          top.frontsightAzimuthUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.BacksightInclinationUnit:
          top.backsightInclinationUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightInclinationUnit:
          top.frontsightInclinationUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.MagneticDeclination:
          top.magneticDeclination = option.trueNorthOffset
          break

        case _WallsSrvFile.UnitsOptionType.GridNorthCorrection:
          top.gridNorthCorrection = option.trueNorthOffset
          break

        case _WallsSrvFile.UnitsOptionType.RectilinearNorthCorrection:
          top.rectilinearNorthCorrection = option.trueNorthOffset
          break

        case _WallsSrvFile.UnitsOptionType.DistanceCorrection:
          top.distanceCorrection = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthCorrection:
          top.frontsightAzimuthCorrection = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.BacksightAzimuthCorrection:
          top.backsightAzimuthCorrection = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightInclinationCorrection:
          top.frontsightInclinationCorrection = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.BacksightInclinationCorrection:
          top.backsightInclinationCorrection = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.HeightAdjustment:
          top.heightAdjustment = option.correction
          break

        case _WallsSrvFile.UnitsOptionType.BacksightAzimuthType:
          top.isBacksightAzimuthCorrected = option.isCorrected
          top.backsightAzimuthTolerance = option.tolerance
          top.doNotAverageBacksightAzimuth = option.doNotAverage
          break

        case _WallsSrvFile.UnitsOptionType.BacksightInclinationType:
          top.isBacksightInclinationCorrected = option.isCorrected
          top.backsightInclinationTolerance = option.tolerance
          top.doNotAverageBacksightInclination = option.doNotAverage
          break

        case _WallsSrvFile.UnitsOptionType.StationNameCase:
          top.stationNameCaseConversion = option.conversion
          break

        case _WallsSrvFile.UnitsOptionType.LrudStyle:
          top.lrudStyle = option.style
          if (option.order) top.lrudOrder = option.order
          break

        case _WallsSrvFile.UnitsOptionType.Prefix:
          top.prefix[option.level - 1] = option.prefix || ''
          break

        case _WallsSrvFile.UnitsOptionType.TapingMethod:
          top.tapingMethod = option.tapingMethod
          break

        case _WallsSrvFile.UnitsOptionType.UnitVariance:
          top.verticalUnitVariance = top.horizontalUnitVariance =
            option.scalingFactor
          break

        case _WallsSrvFile.UnitsOptionType.HorizontalUnitVariance:
          top.horizontalUnitVariance = option.scalingFactor
          break

        case _WallsSrvFile.UnitsOptionType.VerticalUnitVariance:
          top.verticalUnitVariance = option.scalingFactor
          break

        case _WallsSrvFile.UnitsOptionType.Flag:
          top.flag = option.flag
          break

        case _WallsSrvFile.UnitsOptionType.Macro:
          macros.set(option.name, option.replacement || '')
          break
      }
    }
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return'] != null) {
        _iterator['return']()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }
}
