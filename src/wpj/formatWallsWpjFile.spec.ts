import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  Georeference,
  DisplayLatLongFormat,
  wallsProjectBook,
  wallsProjectSurvey,
  View,
} from './WallsWpjFile'
import formatWallsWpjFile, { writeGeoreference } from './formatWallsWpjFile'
import { Unitize } from '@speleotica/unitized'
import dedent from 'dedent-js'

function formatGeoreference(georeference: Georeference): string {
  let result = ''
  writeGeoreference(georeference, data => (result = data))
  return result
}

describe(`formatGeoreference`, function() {
  it(`northwest`, function() {
    expect(
      formatGeoreference({
        displayLatLongFormat: DisplayLatLongFormat.DegreesMinutesSeconds,
        utmEasting: Unitize.meters(733560),
        utmNorthing: Unitize.meters(1976521),
        utmZone: 14,
        utmConvergenceAngle: Unitize.degrees(0.688),
        elevation: Unitize.meters(2666),
        latitude: Unitize.degrees(17 + (51 + 50.507 / 60) / 60),
        longitude: Unitize.degrees(96 + (47 + 45.14 / 60) / 60).negate(),
        wallsDatumIndex: 27,
        datum: 'WGS 1984',
      })
    ).to.equal(
      `.REF\t1976521.000 733560.000 14 0.688 2666 6 17 51 50.507 96 47 45.140 27 "WGS 1984"`
    )
  })
  it(`southeast`, function() {
    expect(
      formatGeoreference({
        displayLatLongFormat: DisplayLatLongFormat.DegreesMinutesSeconds,
        utmEasting: Unitize.meters(266439.997),
        utmNorthing: Unitize.meters(8023478.993),
        utmZone: -47,
        utmConvergenceAngle: Unitize.degrees(0.676),
        elevation: Unitize.meters(2666),
        latitude: Unitize.degrees(17 + (51 + 50.507 / 60) / 60).negate(),
        longitude: Unitize.degrees(96 + (47 + 45.14 / 60) / 60),
        wallsDatumIndex: 27,
        datum: 'WGS 1984',
      })
    ).to.equal(
      `.REF\t8023478.993 266439.997 -47 0.676 2666 10 17 51 50.507 96 47 45.140 27 "WGS 1984"`
    )
  })
  it(`southwest`, function() {
    expect(
      formatGeoreference({
        displayLatLongFormat: DisplayLatLongFormat.DegreesMinutesSeconds,
        utmEasting: Unitize.meters(733560.003),
        utmNorthing: Unitize.meters(8023478.993),
        utmZone: -14,
        utmConvergenceAngle: Unitize.degrees(-0.676),
        elevation: Unitize.meters(2666),
        latitude: Unitize.degrees(17 + (51 + 50.507 / 60) / 60).negate(),
        longitude: Unitize.degrees(96 + (47 + 45.14 / 60) / 60).negate(),
        wallsDatumIndex: 27,
        datum: 'WGS 1984',
      })
    ).to.equal(
      `.REF\t8023478.993 733560.003 -14 -0.676 2666 14 17 51 50.507 96 47 45.140 27 "WGS 1984"`
    )
  })
  it(`northeast`, function() {
    expect(
      formatGeoreference({
        displayLatLongFormat: DisplayLatLongFormat.DegreesMinutesSeconds,
        utmEasting: Unitize.meters(266439.997),
        utmNorthing: Unitize.meters(1976521.007),
        utmZone: 47,
        utmConvergenceAngle: Unitize.degrees(-0.676),
        elevation: Unitize.meters(2666),
        latitude: Unitize.degrees(17 + (51 + 50.507 / 60) / 60),
        longitude: Unitize.degrees(96 + (47 + 45.14 / 60) / 60),
        wallsDatumIndex: 27,
        datum: 'WGS 1984',
      })
    ).to.equal(
      `.REF\t1976521.007 266439.997 47 -0.676 2666 2 17 51 50.507 96 47 45.140 27 "WGS 1984"`
    )
  })
})

describe(`formatWallsWpjFile`, function() {
  it(`basic test`, function() {
    expect(
      formatWallsWpjFile({
        root: wallsProjectBook(
          'Fisher Ridge',
          'test',
          null,
          [
            wallsProjectBook(
              'Historic',
              'blah',
              'historic',
              [wallsProjectSurvey('Entrance Drop', 'entrance', 'entrance')],
              {
                defaultViewAfterCompilation: View.NorthOrEast,
              }
            ),
          ],
          {
            georeference: {
              displayLatLongFormat: DisplayLatLongFormat.DegreesMinutesSeconds,
              utmEasting: Unitize.meters(266439.997),
              utmNorthing: Unitize.meters(1976521.007),
              utmZone: 47,
              utmConvergenceAngle: Unitize.degrees(-0.676),
              elevation: Unitize.meters(2666),
              latitude: Unitize.degrees(17 + (51 + 50.507 / 60) / 60),
              longitude: Unitize.degrees(96 + (47 + 45.14 / 60) / 60),
              wallsDatumIndex: 27,
              datum: 'WGS 1984',
            },
          }
        ),
      })
    ).to.equal(
      dedent`
        .BOOK\tFisher Ridge
        .NAME\ttest
        .STATUS\t1
        .REF\t1976521.007 266439.997 47 -0.676 2666 2 17 51 50.507 96 47 45.140 27 "WGS 1984"
        .BOOK\tHistoric
        .NAME\tblah
        .PATH\thistoric
        .STATUS\t524289
        .SURVEY\tEntrance Drop
        .NAME\tentrance
        .PATH\tentrance
        .STATUS\t0
        .ENDBOOK
        .ENDBOOK\n
      `.replace(/\n/gm, '\r\n')
    )
  })
})
