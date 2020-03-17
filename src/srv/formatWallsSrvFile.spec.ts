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
              RectilinearItem.North,
              RectilinearItem.Elevation,
              RectilinearItem.East,
            ]),
          ]),
          {
            type: SrvLineType.Shot,
            from: 'A',
            to: 'B',
            distance: Unitize.meters(3),
            backsightAzimuth: Unitize.degrees(30.5),
            frontsightInclination: Unitize.degrees(-3),
            instrumentHeight: Unitize.feet(1),
            targetHeight: null,
            left: Unitize.meters(1),
            lrudFacingAzimuth: Unitize.gradians(20),
            segment: '/test',
            comment: 'foobar',
          },
          dateDirective(new Date('Feb 4, 1986')),
          comment(`this
is
a
test`),
          {
            type: SrvLineType.FixDirective,
            station: 'A',
            east: Unitize.meters(2),
            north: Unitize.meters(5),
            elevation: Unitize.feet(3),
            note: 'foo',
          },
          {
            type: SrvLineType.FixDirective,
            station: 'C',
            longitude: Unitize.degrees(-83.2342),
            latitude: Unitize.degrees(34.567),
            elevation: Unitize.feet(4),
          },
        ],
      })
    ).to.deep
      .equal(`#UNITS D=Feet Meters D=Feet S=Meters INCD=2 INCH=3m SAVE FLAG="this is\\n\\"a test" ORDER=ADV ORDER=NUE\r
A\tB\t--/30.5\t3m\t-3\t1f\t--\t<1,--,--,--,20g>\t#SEGMENT /test\t; foobar\r
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
