'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.formatLength = formatLength
exports.formatAzimuth = formatAzimuth
exports.formatInclination = formatInclination
exports.quote = quote
exports.formatUnitsOption = formatUnitsOption
exports.formatUnitsDirective = formatUnitsDirective
exports.formatSegmentDirective = formatSegmentDirective
exports.formatVarianceAssignment = formatVarianceAssignment
exports.formatVariance = formatVariance
exports.formatFixDirective = formatFixDirective
exports.formatPrefixDirective = formatPrefixDirective
exports.formatNoteDirective = formatNoteDirective
exports.formatFlagDirective = formatFlagDirective
exports.formatColor = formatColor
exports.formatSymbolDirective = formatSymbolDirective
exports.formatDateDirective = formatDateDirective
exports.formatShot = formatShot
exports.formatComment = formatComment
exports.formatSrvLine = formatSrvLine
exports['default'] = formatWallsSurveyFile

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _unitized = require('@speleotica/unitized')

var _WallsSrvFile = require('./WallsSrvFile')

var _lodash = require('lodash')

var _applyUnitsOptions = _interopRequireDefault(require('./applyUnitsOptions'))

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

function formatLengthUnitForDirective(unit) {
  switch (unit) {
    case _unitized.Length.meters:
      return 'Meters'

    case _unitized.Length.feet:
      return 'Feet'

    default:
      throw new Error('invalid length unit: '.concat(unit.id))
  }
}

function formatAzimuthUnitForDirective(unit) {
  switch (unit) {
    case _unitized.Angle.degrees:
      return 'Degrees'

    case _unitized.Angle.gradians:
      return 'Grads'

    case _unitized.Angle.milsNATO:
      return 'Mils'

    default:
      throw new Error('invalid azimuth unit: '.concat(unit.id))
  }
}

function formatInclinationUnitForDirective(unit) {
  switch (unit) {
    case _unitized.Angle.degrees:
      return 'Degrees'

    case _unitized.Angle.gradians:
      return 'Grads'

    case _unitized.Angle.milsNATO:
      return 'Mils'

    case _unitized.Angle.percentGrade:
      return 'Percent'

    default:
      throw new Error('invalid inclination unit: '.concat(unit.id))
  }
}

function unitSuffix(unit) {
  switch (unit) {
    case _unitized.Length.meters:
      return 'm'

    case _unitized.Length.feet:
      return 'f'

    case _unitized.Angle.degrees:
      return 'd'

    case _unitized.Angle.gradians:
      return 'g'

    case _unitized.Angle.milsNATO:
      return 'm'

    case _unitized.Angle.percentGrade:
      return 'p'

    default:
      throw new Error('invalid unit: '.concat(unit.id))
  }
}

function formatLength(length, defaultUnit) {
  switch (length.unit) {
    case _unitized.Length.meters:
    case _unitized.Length.feet: {
      break
    }

    case _unitized.Length.inches: {
      var _value = length.get(_unitized.Length.inches)

      if (_value % 12) {
        return ''.concat(Math.floor(_value / 12), 'i').concat(_value % 12)
      }

      length = length['in'](_unitized.Length.feet)
      break
    }

    default: {
      length = length['in'](defaultUnit)
    }
  }

  var value = length.get(length.unit)
  return length.unit === defaultUnit
    ? String(value)
    : ''.concat(value).concat(unitSuffix(length.unit))
}

function formatAzimuth(angle, defaultUnit) {
  switch (angle.unit) {
    case _unitized.Angle.degrees:
    case _unitized.Angle.gradians:
    case _unitized.Angle.milsNATO:
      break

    case _unitized.Angle.percentGrade:
      throw new Error('invalid azimuth unit: '.concat(angle.unit.id))

    default:
      angle = angle['in'](defaultUnit)
  }

  var value = angle.get(angle.unit)
  return angle.unit === defaultUnit
    ? String(value)
    : ''.concat(value).concat(unitSuffix(angle.unit))
}

function formatInclination(angle, defaultUnit) {
  switch (angle.unit) {
    case _unitized.Angle.degrees:
    case _unitized.Angle.gradians:
    case _unitized.Angle.milsNATO:
    case _unitized.Angle.percentGrade:
      break

    default:
      angle = angle['in'](defaultUnit)
  }

  var value = angle.get(angle.unit)
  return angle.unit === defaultUnit
    ? String(value)
    : ''.concat(value).concat(unitSuffix(angle.unit))
}

var quoted = {
  '"': '\\"',
  '\\': '\\\\',
  '\n': '\\n',
  '\t': '\\t',
  '\r': '\\r',
}

function quote(str) {
  return '"'.concat(
    str.replace(/["\\\n\t\r]/g, function(match) {
      return quoted[match] || match
    }),
    '"'
  )
}

function formatUnitsOption(option, settings) {
  switch (option.type) {
    case _WallsSrvFile.UnitsOptionType.CompassAndTape:
      return 'CT'

    case _WallsSrvFile.UnitsOptionType.Rectilinear:
      return 'RECT'

    case _WallsSrvFile.UnitsOptionType.Order:
      return 'ORDER=' + option.order.join('')

    case _WallsSrvFile.UnitsOptionType.DistanceUnit:
      return formatLengthUnitForDirective(option.unit)

    case _WallsSrvFile.UnitsOptionType.PrimaryDistanceUnit:
      return 'D='.concat(formatLengthUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.SecondaryDistanceUnit:
      return 'S='.concat(formatLengthUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.BacksightAzimuthUnit:
      return 'A='.concat(formatAzimuthUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthUnit:
      return 'AB='.concat(formatAzimuthUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.BacksightInclinationUnit:
      return 'V='.concat(formatInclinationUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.FrontsightInclinationUnit:
      return 'VB='.concat(formatInclinationUnitForDirective(option.unit))

    case _WallsSrvFile.UnitsOptionType.MagneticDeclination:
      return 'DECL='.concat(
        formatAzimuth(option.trueNorthOffset, settings.frontsightAzimuthUnit)
      )

    case _WallsSrvFile.UnitsOptionType.GridNorthCorrection:
      return 'GRID='.concat(
        formatAzimuth(option.trueNorthOffset, settings.frontsightAzimuthUnit)
      )

    case _WallsSrvFile.UnitsOptionType.RectilinearNorthCorrection:
      return 'RECT='.concat(
        formatAzimuth(option.trueNorthOffset, settings.frontsightAzimuthUnit)
      )

    case _WallsSrvFile.UnitsOptionType.DistanceCorrection:
      return 'INCD='.concat(
        formatLength(option.correction, settings.primaryDistanceUnit)
      )

    case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthCorrection:
      return 'INCA='.concat(
        formatAzimuth(option.correction, settings.frontsightAzimuthUnit)
      )

    case _WallsSrvFile.UnitsOptionType.BacksightAzimuthCorrection:
      return 'INCA='.concat(
        formatAzimuth(option.correction, settings.backsightAzimuthUnit)
      )

    case _WallsSrvFile.UnitsOptionType.FrontsightInclinationCorrection:
      return 'INCA='.concat(
        formatInclination(option.correction, settings.frontsightInclinationUnit)
      )

    case _WallsSrvFile.UnitsOptionType.BacksightInclinationCorrection:
      return 'INCA='.concat(
        formatInclination(option.correction, settings.backsightInclinationUnit)
      )

    case _WallsSrvFile.UnitsOptionType.HeightAdjustment:
      return 'INCH='.concat(
        formatLength(option.correction, settings.primaryDistanceUnit)
      )

    case _WallsSrvFile.UnitsOptionType.BacksightAzimuthType:
      return 'TYPEAB='
        .concat(option.isCorrected ? 'C' : 'N', ',')
        .concat(formatAzimuth(option.tolerance, settings.backsightAzimuthUnit))
        .concat(option.doNotAverage ? ',X' : '')

    case _WallsSrvFile.UnitsOptionType.BacksightInclinationType:
      return 'TYPEVB='
        .concat(option.isCorrected ? 'C' : 'N', ',')
        .concat(
          formatInclination(option.tolerance, settings.backsightInclinationUnit)
        )
        .concat(option.doNotAverage ? ',X' : '')

    case _WallsSrvFile.UnitsOptionType.Reset:
      return 'RESET'

    case _WallsSrvFile.UnitsOptionType.Save:
      return 'SAVE'

    case _WallsSrvFile.UnitsOptionType.Restore:
      return 'RESTORE'

    case _WallsSrvFile.UnitsOptionType.StationNameCase:
      return 'CASE='.concat(option.conversion)

    case _WallsSrvFile.UnitsOptionType.LrudStyle:
      return 'LRUD='
        .concat(option.style)
        .concat(option.order ? '?'.concat(option.order.join('')) : '')

    case _WallsSrvFile.UnitsOptionType.Prefix:
      return 'PREFIX'
        .concat(option.level === 1 ? '' : option.level, '=')
        .concat(option.prefix)

    case _WallsSrvFile.UnitsOptionType.TapingMethod:
      return 'TAPE='.concat(option.tapingMethod)

    case _WallsSrvFile.UnitsOptionType.UnitVariance:
      return 'UV='.concat(option.scalingFactor)

    case _WallsSrvFile.UnitsOptionType.HorizontalUnitVariance:
      return 'UVH='.concat(option.scalingFactor)

    case _WallsSrvFile.UnitsOptionType.VerticalUnitVariance:
      return 'UVV='.concat(option.scalingFactor)

    case _WallsSrvFile.UnitsOptionType.Flag:
      return option.flag ? 'FLAG='.concat(quote(option.flag)) : 'FLAG'

    case _WallsSrvFile.UnitsOptionType.Macro:
      return '$'
        .concat(option.name)
        .concat(option.replacement ? '='.concat(quote(option.replacement)) : '')
  }
}

function formatUnitsDirective(_ref, settings) {
  var options = _ref.options,
    comment = _ref.comment,
    raw = _ref.raw
  if (raw) return raw.value
  var curSettings = settings
  var parts = ['#UNITS']
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
      parts.push(formatUnitsOption(option, curSettings))

      switch (option.type) {
        case _WallsSrvFile.UnitsOptionType.DistanceUnit:
        case _WallsSrvFile.UnitsOptionType.PrimaryDistanceUnit:
        case _WallsSrvFile.UnitsOptionType.SecondaryDistanceUnit:
        case _WallsSrvFile.UnitsOptionType.BacksightAzimuthUnit:
        case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthUnit:
        case _WallsSrvFile.UnitsOptionType.BacksightInclinationUnit:
        case _WallsSrvFile.UnitsOptionType.FrontsightInclinationUnit:
          if (curSettings === settings)
            curSettings = _objectSpread({}, settings)
          break

        default:
          continue
      }

      switch (option.type) {
        case _WallsSrvFile.UnitsOptionType.DistanceUnit:
          curSettings.primaryDistanceUnit = curSettings.secondaryDistanceUnit =
            option.unit
          break

        case _WallsSrvFile.UnitsOptionType.PrimaryDistanceUnit:
          curSettings.primaryDistanceUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.SecondaryDistanceUnit:
          curSettings.secondaryDistanceUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.BacksightAzimuthUnit:
          curSettings.backsightAzimuthUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightAzimuthUnit:
          curSettings.frontsightAzimuthUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.BacksightInclinationUnit:
          curSettings.backsightInclinationUnit = option.unit
          break

        case _WallsSrvFile.UnitsOptionType.FrontsightInclinationUnit:
          curSettings.frontsightInclinationUnit = option.unit
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

  if (comment) parts.push('; '.concat(comment))
  return parts.join(' ') + '\r\n'
}

function formatSegmentDirective(_ref2) {
  var segment = _ref2.segment,
    comment = _ref2.comment,
    raw = _ref2.raw
  if (raw) return raw.value
  return '#SEGMENT '
    .concat(segment)
    .concat(comment ? ' ; '.concat(comment) : '', '\r\n')
}

function formatVarianceAssignment(assignment, settings) {
  if (!assignment) return ''

  switch (assignment.type) {
    case _WallsSrvFile.VarianceAssignmentType.FloatShot:
      return '?'

    case _WallsSrvFile.VarianceAssignmentType.FloatTraverse:
      return '*'

    case _WallsSrvFile.VarianceAssignmentType.Length:
      return formatLength(assignment.length, settings.primaryDistanceUnit)

    case _WallsSrvFile.VarianceAssignmentType.RMSError:
      return 'R'.concat(
        formatLength(assignment.length, settings.primaryDistanceUnit)
      )
  }
}

function formatVariance(horizontal, vertical, settings) {
  if (!horizontal && !vertical) return ''
  if ((0, _lodash.isEqual)(horizontal, vertical))
    return '('.concat(formatVarianceAssignment(horizontal, settings), ')')
  return '('
    .concat(formatVarianceAssignment(horizontal, settings), ',')
    .concat(formatVarianceAssignment(vertical, settings), ')')
}

function formatFixDirective(_ref3, settings) {
  var station = _ref3.station,
    latitude = _ref3.latitude,
    longitude = _ref3.longitude,
    east = _ref3.east,
    north = _ref3.north,
    elevation = _ref3.elevation,
    horizontalVariance = _ref3.horizontalVariance,
    verticalVariance = _ref3.verticalVariance,
    note = _ref3.note,
    segment = _ref3.segment,
    comment = _ref3.comment,
    raw = _ref3.raw
  if (raw) return raw.value
  var parts = ['#FIX', station]

  if (east && north) {
    var _iteratorNormalCompletion2 = true
    var _didIteratorError2 = false
    var _iteratorError2 = undefined

    try {
      for (
        var _iterator2 = settings.rectilinearOrder[Symbol.iterator](), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        var item = _step2.value

        switch (item) {
          case _WallsSrvFile.RectilinearItem.East:
            parts.push(formatLength(east, settings.primaryDistanceUnit))
            break

          case _WallsSrvFile.RectilinearItem.North:
            parts.push(formatLength(north, settings.primaryDistanceUnit))
            break

          case _WallsSrvFile.RectilinearItem.Elevation:
            parts.push(formatLength(elevation, settings.primaryDistanceUnit))
            break
        }
      }
    } catch (err) {
      _didIteratorError2 = true
      _iteratorError2 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return'] != null) {
          _iterator2['return']()
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2
        }
      }
    }
  } else if (longitude && latitude) {
    var _iteratorNormalCompletion3 = true
    var _didIteratorError3 = false
    var _iteratorError3 = undefined

    try {
      for (
        var _iterator3 = settings.rectilinearOrder[Symbol.iterator](), _step3;
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        _iteratorNormalCompletion3 = true
      ) {
        var _item = _step3.value

        switch (_item) {
          case _WallsSrvFile.RectilinearItem.East:
            parts.push(
              ''
                .concat(longitude.isNegative ? 'W' : 'E')
                .concat(longitude.abs().get(_unitized.Angle.degrees))
            )
            break

          case _WallsSrvFile.RectilinearItem.North:
            parts.push(
              ''
                .concat(latitude.isNegative ? 'S' : 'N')
                .concat(latitude.abs().get(_unitized.Angle.degrees))
            )
            break

          case _WallsSrvFile.RectilinearItem.Elevation:
            parts.push(formatLength(elevation, settings.primaryDistanceUnit))
            break
        }
      }
    } catch (err) {
      _didIteratorError3 = true
      _iteratorError3 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return'] != null) {
          _iterator3['return']()
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3
        }
      }
    }
  } else {
    throw new Error('either east/north or latitude/longitude must be given')
  }

  if (horizontalVariance || verticalVariance) {
    parts.push(formatVariance(horizontalVariance, verticalVariance, settings))
  }

  if (note) parts.push('/'.concat(note))
  if (segment) parts.push('#SEGMENT '.concat(segment))
  if (comment) parts.push('; '.concat(comment))
  return parts.join(' ') + '\r\n'
}

function formatPrefixDirective(_ref4) {
  var level = _ref4.level,
    prefix = _ref4.prefix,
    comment = _ref4.comment,
    raw = _ref4.raw
  if (raw) return raw.value
  var parts = ['#PREFIX'.concat(level === 1 ? '' : level)]
  if (prefix) parts.push(prefix)
  if (comment) parts.push('; '.concat(comment))
  return parts.join(' ') + '\r\n'
}

function formatNoteDirective(_ref5) {
  var station = _ref5.station,
    note = _ref5.note,
    comment = _ref5.comment,
    raw = _ref5.raw
  if (raw) return raw.value
  return '#NOTE '
    .concat(station, ' ')
    .concat(note)
    .concat(comment ? '; '.concat(comment) : '', '\r\n')
}

function formatFlagDirective(_ref6) {
  var stations = _ref6.stations,
    flag = _ref6.flag,
    comment = _ref6.comment,
    raw = _ref6.raw
  if (raw) return raw.value
  return '#FLAG '
    .concat(stations.join(' '), ' /')
    .concat(flag)
    .concat(comment ? '; '.concat(comment) : '', '\r\n')
}

function formatColor(_ref7) {
  var r = _ref7.r,
    g = _ref7.g,
    b = _ref7.b
  return '('
    .concat(r, ', ')
    .concat(g, ', ')
    .concat(b, ')')
}

function formatSymbolDirective(_ref8) {
  var opacity = _ref8.opacity,
    shape = _ref8.shape,
    pointSize = _ref8.pointSize,
    color = _ref8.color,
    flag = _ref8.flag,
    comment = _ref8.comment,
    raw = _ref8.raw
  if (raw) return raw.value
  return '#SYMBOL '
    .concat(opacity || '-')
    .concat(shape || '-')
    .concat(pointSize !== null && pointSize !== void 0 ? pointSize : '-')
    .concat(color ? formatColor(color) : '', ' /')
    .concat(flag)
    .concat(comment ? '; '.concat(comment) : '', '\r\n')
}

function formatDateDirective(_ref9) {
  var date = _ref9.date,
    comment = _ref9.comment,
    raw = _ref9.raw
  if (raw) return raw.value
  return '#DATE '
    .concat(date.getFullYear(), '-')
    .concat(String(date.getMonth() + 1).padStart(2, '0'), '-')
    .concat(String(date.getDate()).padStart(2, '0'))
    .concat(comment ? '; '.concat(comment) : '', '\r\n')
}

function formatAzimuths(frontsight, backsight, settings) {
  var frontsightAzimuthUnit = settings.frontsightAzimuthUnit,
    backsightAzimuthUnit = settings.backsightAzimuthUnit

  if (backsight) {
    return ''
      .concat(
        frontsight ? formatAzimuth(frontsight, frontsightAzimuthUnit) : '--',
        '/'
      )
      .concat(formatAzimuth(backsight, backsightAzimuthUnit))
  }

  return frontsight ? formatAzimuth(frontsight, frontsightAzimuthUnit) : '--'
}

function formatInclinations(frontsight, backsight, settings) {
  var frontsightInclinationUnit = settings.frontsightInclinationUnit,
    backsightInclinationUnit = settings.backsightInclinationUnit

  if (backsight) {
    return ''
      .concat(
        frontsight
          ? formatInclination(frontsight, frontsightInclinationUnit)
          : '--',
        '/'
      )
      .concat(formatInclination(backsight, backsightInclinationUnit))
  }

  return frontsight
    ? formatInclination(frontsight, frontsightInclinationUnit)
    : '--'
}

function formatShot(_ref10, settings) {
  var from = _ref10.from,
    to = _ref10.to,
    distance = _ref10.distance,
    frontsightAzimuth = _ref10.frontsightAzimuth,
    backsightAzimuth = _ref10.backsightAzimuth,
    frontsightInclination = _ref10.frontsightInclination,
    backsightInclination = _ref10.backsightInclination,
    instrumentHeight = _ref10.instrumentHeight,
    targetHeight = _ref10.targetHeight,
    east = _ref10.east,
    north = _ref10.north,
    elevation = _ref10.elevation,
    horizontalVariance = _ref10.horizontalVariance,
    verticalVariance = _ref10.verticalVariance,
    left = _ref10.left,
    right = _ref10.right,
    up = _ref10.up,
    down = _ref10.down,
    lrudFacingAzimuth = _ref10.lrudFacingAzimuth,
    leftAzimuth = _ref10.leftAzimuth,
    rightAzimuth = _ref10.rightAzimuth,
    cFlag = _ref10.cFlag,
    segment = _ref10.segment,
    comment = _ref10.comment,
    raw = _ref10.raw
  if (raw) return raw.value
  var primaryDistanceUnit = settings.primaryDistanceUnit,
    secondaryDistanceUnit = settings.secondaryDistanceUnit,
    frontsightAzimuthUnit = settings.frontsightAzimuthUnit,
    compassAndTapeOrder = settings.compassAndTapeOrder,
    rectilinearOrder = settings.rectilinearOrder,
    lrudOrder = settings.lrudOrder
  var parts = []
  parts.push(from || '-')
  parts.push(to || '-')

  if (settings.shotType === _WallsSrvFile.ShotType.CompassAndTape) {
    var _iteratorNormalCompletion4 = true
    var _didIteratorError4 = false
    var _iteratorError4 = undefined

    try {
      for (
        var _iterator4 = compassAndTapeOrder[Symbol.iterator](), _step4;
        !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
        _iteratorNormalCompletion4 = true
      ) {
        var item = _step4.value

        switch (item) {
          case _WallsSrvFile.CompassAndTapeItem.Distance:
            parts.push(
              distance ? formatLength(distance, primaryDistanceUnit) : '--'
            )
            break

          case _WallsSrvFile.CompassAndTapeItem.Azimuth:
            parts.push(
              formatAzimuths(frontsightAzimuth, backsightAzimuth, settings)
            )
            break

          case _WallsSrvFile.CompassAndTapeItem.Inclination:
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
    } catch (err) {
      _didIteratorError4 = true
      _iteratorError4 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return'] != null) {
          _iterator4['return']()
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4
        }
      }
    }

    if (instrumentHeight || targetHeight) {
      parts.push(
        instrumentHeight
          ? formatLength(instrumentHeight, secondaryDistanceUnit)
          : '--'
      )
      parts.push(
        targetHeight ? formatLength(targetHeight, secondaryDistanceUnit) : '--'
      )
    }
  } else {
    var _iteratorNormalCompletion5 = true
    var _didIteratorError5 = false
    var _iteratorError5 = undefined

    try {
      for (
        var _iterator5 = rectilinearOrder[Symbol.iterator](), _step5;
        !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
        _iteratorNormalCompletion5 = true
      ) {
        var _item2 = _step5.value

        switch (_item2) {
          case _WallsSrvFile.RectilinearItem.East:
            parts.push(east ? formatLength(east, primaryDistanceUnit) : '--')
            break

          case _WallsSrvFile.RectilinearItem.North:
            parts.push(north ? formatLength(north, primaryDistanceUnit) : '--')
            break

          case _WallsSrvFile.RectilinearItem.Elevation:
            parts.push(
              elevation ? formatLength(elevation, primaryDistanceUnit) : '--'
            )
            break
        }
      }
    } catch (err) {
      _didIteratorError5 = true
      _iteratorError5 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5['return'] != null) {
          _iterator5['return']()
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5
        }
      }
    }
  }

  if (horizontalVariance || verticalVariance) {
    parts.push(formatVariance(horizontalVariance, verticalVariance, settings))
  }

  if (left || right || up || down) {
    var lrudParts = []
    var _iteratorNormalCompletion6 = true
    var _didIteratorError6 = false
    var _iteratorError6 = undefined

    try {
      for (
        var _iterator6 = lrudOrder[Symbol.iterator](), _step6;
        !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
        _iteratorNormalCompletion6 = true
      ) {
        var _item3 = _step6.value

        switch (_item3) {
          case _WallsSrvFile.LrudItem.Left:
            lrudParts.push(
              left ? formatLength(left, secondaryDistanceUnit) : '--'
            )
            break

          case _WallsSrvFile.LrudItem.Right:
            lrudParts.push(
              right ? formatLength(right, secondaryDistanceUnit) : '--'
            )
            break

          case _WallsSrvFile.LrudItem.Up:
            lrudParts.push(up ? formatLength(up, secondaryDistanceUnit) : '--')
            break

          case _WallsSrvFile.LrudItem.Down:
            lrudParts.push(
              down ? formatLength(down, secondaryDistanceUnit) : '--'
            )
            break
        }
      }
    } catch (err) {
      _didIteratorError6 = true
      _iteratorError6 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6['return'] != null) {
          _iterator6['return']()
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6
        }
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
    parts.push('<'.concat(lrudParts.join(','), '>'))
  }

  if (segment) parts.push('#SEGMENT '.concat(segment))
  if (comment) parts.push('; '.concat(comment))
  return parts.join('\t') + '\r\n'
}

function formatComment(_ref11) {
  var comment = _ref11.comment,
    raw = _ref11.raw,
    block = _ref11.block
  if (raw) return raw.value
  return block || /[\r\n]/.test(comment)
    ? '#[\r\n'.concat(comment.replace(/\r\n?|\n/gm, '\r\n'), '\r\n#]\r\n')
    : '; '.concat(comment, '\r\n')
}

function formatSrvLine(line, settings) {
  switch (line.type) {
    case _WallsSrvFile.SrvLineType.Shot:
      return formatShot(line, settings)

    case _WallsSrvFile.SrvLineType.UnitsDirective:
      return formatUnitsDirective(line, settings)

    case _WallsSrvFile.SrvLineType.FixDirective:
      return formatFixDirective(line, settings)

    case _WallsSrvFile.SrvLineType.SegmentDirective:
      return formatSegmentDirective(line)

    case _WallsSrvFile.SrvLineType.FlagDirective:
      return formatFlagDirective(line)

    case _WallsSrvFile.SrvLineType.SymbolDirective:
      return formatSymbolDirective(line)

    case _WallsSrvFile.SrvLineType.NoteDirective:
      return formatNoteDirective(line)

    case _WallsSrvFile.SrvLineType.DateDirective:
      return formatDateDirective(line)

    case _WallsSrvFile.SrvLineType.Comment:
      return formatComment(line)
  }
}

function formatWallsSurveyFile(file, options) {
  if (!(options === null || options === void 0 ? void 0 : options.write)) {
    var lines = []
    formatWallsSurveyFile(file, {
      write: function write(line) {
        return lines.push(line)
      },
    })
    return lines.join('')
  } else {
    var write = options.write
    var stack = [(0, _WallsSrvFile.defaultSrvSettings)()]
    var macros = new Map()
    var _iteratorNormalCompletion7 = true
    var _didIteratorError7 = false
    var _iteratorError7 = undefined

    try {
      for (
        var _iterator7 = file.lines[Symbol.iterator](), _step7;
        !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
        _iteratorNormalCompletion7 = true
      ) {
        var line = _step7.value

        if (line.type === _WallsSrvFile.SrvLineType.UnitsDirective) {
          ;(0, _applyUnitsOptions['default'])(
            {
              stack: stack,
              macros: macros,
            },
            line
          )
        }

        write(formatSrvLine(line, stack[stack.length - 1]))
      }
    } catch (err) {
      _didIteratorError7 = true
      _iteratorError7 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7['return'] != null) {
          _iterator7['return']()
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7
        }
      }
    }
  }
}
