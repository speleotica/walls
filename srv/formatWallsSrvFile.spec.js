'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _mocha = require('mocha')

var _chai = require('chai')

var _formatWallsSrvFile = _interopRequireDefault(
  require('./formatWallsSrvFile')
)

var _WallsSrvFile = require('./WallsSrvFile')

var _unitized = require('@speleotica/unitized')

;(0, _mocha.describe)('formatWallsSrvFile', function() {
  ;(0, _mocha.it)('catchall test', function() {
    ;(0, _chai.expect)(
      (0, _formatWallsSrvFile['default'])({
        lines: [
          (0, _WallsSrvFile.unitsDirective)([
            (0, _WallsSrvFile.primaryDistanceUnitOption)(_unitized.Length.feet),
            (0, _WallsSrvFile.distanceUnitOption)(_unitized.Length.meters),
            (0, _WallsSrvFile.primaryDistanceUnitOption)(_unitized.Length.feet),
            (0, _WallsSrvFile.secondaryDistanceUnitOption)(
              _unitized.Length.meters
            ),
            (0, _WallsSrvFile.distanceCorrectionOption)(
              _unitized.Unitize.feet(2)
            ),
            (0, _WallsSrvFile.heightAdjustmentOption)(
              _unitized.Unitize.meters(3)
            ),
            (0, _WallsSrvFile.saveOption)(),
            (0, _WallsSrvFile.flagOption)('this is\n"a test'),
            (0, _WallsSrvFile.orderOption)([
              _WallsSrvFile.CompassAndTapeItem.Azimuth,
              _WallsSrvFile.CompassAndTapeItem.Distance,
              _WallsSrvFile.CompassAndTapeItem.Inclination,
            ]),
            (0, _WallsSrvFile.orderOption)([
              _WallsSrvFile.RectilinearItem.North,
              _WallsSrvFile.RectilinearItem.Elevation,
              _WallsSrvFile.RectilinearItem.East,
            ]),
          ]),
          {
            type: _WallsSrvFile.SrvLineType.Shot,
            from: 'A',
            to: 'B',
            distance: _unitized.Unitize.meters(3),
            backsightAzimuth: _unitized.Unitize.degrees(30.5),
            frontsightInclination: _unitized.Unitize.degrees(-3),
            instrumentHeight: _unitized.Unitize.feet(1),
            targetHeight: null,
            left: _unitized.Unitize.meters(1),
            lrudFacingAzimuth: _unitized.Unitize.gradians(20),
            segment: '/test',
            comment: 'foobar',
          },
          (0, _WallsSrvFile.dateDirective)(new Date('Feb 4, 1986')),
          (0, _WallsSrvFile.comment)('this\nis\na\ntest'),
          {
            type: _WallsSrvFile.SrvLineType.FixDirective,
            station: 'A',
            east: _unitized.Unitize.meters(2),
            north: _unitized.Unitize.meters(5),
            elevation: _unitized.Unitize.feet(3),
            note: 'foo',
          },
          {
            type: _WallsSrvFile.SrvLineType.FixDirective,
            station: 'C',
            longitude: _unitized.Unitize.degrees(-83.2342),
            latitude: _unitized.Unitize.degrees(34.567),
            elevation: _unitized.Unitize.feet(4),
          },
        ],
      })
    ).to.deep.equal(
      '#UNITS D=Feet Meters D=Feet S=Meters INCD=2 INCH=3m SAVE FLAG="this is\\n\\"a test" ORDER=ADV ORDER=NUE\r\nA\tB\t--/30.5\t3m\t-3\t1f\t--\t<1,--,--,--,20g>\t#SEGMENT /test\t; foobar\r\n#DATE 1986-02-04\r\n#[\r\nthis\r\nis\r\na\r\ntest\r\n#]\r\n#FIX A 5m 3 2m /foo\r\n#FIX C N34.567 4 W83.2342\r\n'
    )
  })
})
