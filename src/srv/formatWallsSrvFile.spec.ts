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
  orderOption,
  CompassAndTapeItem,
  RectilinearItem,
  lrudStyleOption,
  LrudStyle,
  LrudItem,
  fixDirective,
  prefixDirective,
  compassAndTapeShot,
  stationLruds,
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
          compassAndTapeShot(
            'A',
            'B',
            Unitize.meters(3),
            [null, Unitize.degrees(30.5)],
            Unitize.degrees(-3),
            [Unitize.meters(1), null, null, null, Unitize.gradians(20)],
            {
              segment: '/test',
              comment: 'foobar',
              instrumentHeight: Unitize.feet(1),
            }
          ),
          stationLruds('B', [
            Unitize.meters(1),
            Unitize.meters(2),
            Unitize.meters(3),
            Unitize.meters(4),
          ]),
          dateDirective(new Date('Feb 4, 1986')),
          comment(`this\nis\na\ntest`),
          prefixDirective(1, 'Test'),
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
#PREFIX Test\r
#FIX A 5m 3 2m /foo\r
#FIX C N34.567 4 W83.2342\r
`)
  })
})
