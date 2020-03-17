import { describe, it } from 'mocha'
import { expect } from 'chai'

import formatWallsSrvFile from './formatWallsSrvFile'
import {
  distanceUnitOption,
  primaryDistanceUnitOption,
  secondaryDistanceUnitOption,
  unitsDirective,
  distanceCorrectionOption,
  heightAdjustmentOption,
  saveOption,
  flagOption,
  comment,
  dateDirective,
  SrvLineType,
  orderOption,
  CompassAndTapeItem,
  RectilinearItem,
  ShotType,
  lrudStyleOption,
  LrudStyle,
  LrudItem,
  fixDirective,
} from './WallsSrvFile'
import { Length, Unitize } from '@speleotica/unitized'

describe(`formatWallsSrvFile`, function() {
  it(`catchall test`, function() {
    expect(
      formatWallsSrvFile({
        lines: [
          unitsDirective([
            primaryDistanceUnitOption(Length.feet),
            distanceUnitOption(Length.meters),
            primaryDistanceUnitOption(Length.feet),
            secondaryDistanceUnitOption(Length.meters),
            distanceCorrectionOption(Unitize.feet(2)),
            heightAdjustmentOption(Unitize.meters(3)),
            saveOption(),
            flagOption('this is\n"a test'),
            orderOption([
              CompassAndTapeItem.Azimuth,
              CompassAndTapeItem.Distance,
              CompassAndTapeItem.Inclination,
            ]),
            orderOption([
              RectilinearItem.Northing,
              RectilinearItem.Elevation,
              RectilinearItem.Easting,
            ]),
            lrudStyleOption(LrudStyle.FromStationPerpendicular, [
              LrudItem.Left,
              LrudItem.Up,
              LrudItem.Down,
              LrudItem.Right,
            ]),
          ]),
          {
            type: SrvLineType.Shot,
            from: 'A',
            to: 'B',
            measurements: {
              type: ShotType.CompassAndTape,
              distance: Unitize.meters(3),
              backsightAzimuth: Unitize.degrees(30.5),
              frontsightInclination: Unitize.degrees(-3),
              instrumentHeight: Unitize.feet(1),
              targetHeight: null,
            },
            left: Unitize.meters(1),
            lrudFacingAzimuth: Unitize.gradians(20),
            segment: '/test',
            comment: 'foobar',
          },
          {
            type: SrvLineType.Shot,
            from: 'B',
            left: Unitize.meters(1),
            right: Unitize.meters(2),
            up: Unitize.meters(3),
            down: Unitize.meters(4),
          },
          dateDirective(new Date('Feb 4, 1986')),
          comment(`this
is
a
test`),
          fixDirective(
            'A',
            Unitize.meters(2),
            Unitize.meters(5),
            Unitize.feet(3),
            { note: 'foo' }
          ),
          fixDirective(
            'C',
            Unitize.degrees(-83.2342),
            Unitize.degrees(34.567),
            Unitize.feet(4)
          ),
        ],
      })
    ).to.deep
      .equal(`#UNITS D=Feet Meters D=Feet S=Meters INCD=2 INCH=3m SAVE FLAG="this is\\n\\"a test" ORDER=ADV ORDER=NUE LRUD=F:LUDR\r
A\tB\t--/30.5\t3m\t-3\t1f\t--\t<1,--,--,--,20g>\t#SEGMENT /test\t; foobar\r
B\t<1,3,4,2>\r
#DATE 1986-02-04\r
#[\r
this\r
is\r
a\r
test\r
#]\r
#FIX A 5m 3 2m /foo\r
#FIX C N34.567 4 W83.2342\r
`)
  })
})
