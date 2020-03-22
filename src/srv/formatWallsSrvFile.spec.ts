import { describe, it } from 'mocha'
import { expect } from 'chai'

import formatWallsSrvFile, {
  formatUnitsOption,
  formatUnitsDirective,
  formatSegmentDirective,
  formatVariance,
  formatFixDirective,
  formatPrefixDirective,
  formatNoteDirective,
  formatFlagDirective,
  formatDateDirective,
  formatShot,
} from './formatWallsSrvFile'
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
  compassAndTapeOption,
  defaultSrvSettings,
  rectilinearOption,
  frontsightAzimuthUnitOption,
  backsightAzimuthUnitOption,
  frontsightInclinationUnitOption,
  backsightInclinationUnitOption,
  magneticDeclinationOption,
  gridNorthCorrectionOption,
  rectilinearNorthCorrectionOption,
  frontsightAzimuthCorrectionOption,
  backsightAzimuthCorrectionOption,
  backsightInclinationCorrectionOption,
  frontsightInclinationCorrectionOption,
  backsightAzimuthTypeOption,
  backsightInclinationTypeOption,
  resetOption,
  restoreOption,
  stationNameCaseOption,
  StationNameCaseConversion,
  prefixOption,
  tapingMethodOption,
  TapingMethod,
  unitVarianceOption,
  horizontalUnitVarianceOption,
  verticalUnitVarianceOption,
  macroOption,
  segmentDirective,
  lengthVarianceAssignment,
  rmsErrorVarianceAssignment,
  floatShotVarianceAssignment,
  floatTraverseVarianceAssignment,
  noteDirective,
  flagDirective,
  rectilinearShot,
  symbolDirective,
  SymbolOpacity,
  SymbolShape,
} from './WallsSrvFile'
import { Length, Unitize, Angle } from '@speleotica/unitized'

const settings = defaultSrvSettings()

describe(`formatUnitsDirective`, function() {
  it('comment', () => {
    expect(
      formatUnitsDirective(
        unitsDirective([compassAndTapeOption()], 'this is a test'),
        settings
      )
    ).to.equal('#UNITS CT ;this is a test\r\n')
  })
  it('CompassAndTape option', () => {
    expect(formatUnitsOption(compassAndTapeOption(), settings)).to.equal('CT')
  })
  it('Rectilinear option', () => {
    expect(formatUnitsOption(rectilinearOption(), settings)).to.equal('RECT')
  })
  it('Order option', () => {
    expect(
      formatUnitsOption(
        orderOption([
          CompassAndTapeItem.Azimuth,
          CompassAndTapeItem.Distance,
          CompassAndTapeItem.Inclination,
        ]),
        settings
      )
    ).to.equal('ORDER=ADV')
    expect(
      formatUnitsOption(
        orderOption([CompassAndTapeItem.Azimuth, CompassAndTapeItem.Distance]),
        settings
      )
    ).to.equal('ORDER=AD')
    expect(
      formatUnitsOption(
        orderOption([
          RectilinearItem.Elevation,
          RectilinearItem.Easting,
          RectilinearItem.Northing,
        ]),
        settings
      )
    ).to.equal('ORDER=UEN')
  })
  it('DistanceUnit option', () => {
    expect(
      formatUnitsOption(distanceUnitOption(Length.feet), settings)
    ).to.equal('Feet')
    expect(
      formatUnitsOption(distanceUnitOption(Length.meters), settings)
    ).to.equal('Meters')
    expect(() =>
      formatUnitsOption(distanceUnitOption(Length.inches), settings)
    ).to.throw('invalid length unit: in')
  })
  it('PrimaryDistanceUnit option', () => {
    expect(
      formatUnitsOption(primaryDistanceUnitOption(Length.feet), settings)
    ).to.equal('D=Feet')
    expect(
      formatUnitsOption(primaryDistanceUnitOption(Length.meters), settings)
    ).to.equal('D=Meters')
    expect(() =>
      formatUnitsOption(primaryDistanceUnitOption(Length.inches), settings)
    ).to.throw('invalid length unit: in')
  })
  it('SecondaryDistanceUnit option', () => {
    expect(
      formatUnitsOption(secondaryDistanceUnitOption(Length.feet), settings)
    ).to.equal('S=Feet')
    expect(
      formatUnitsOption(secondaryDistanceUnitOption(Length.meters), settings)
    ).to.equal('S=Meters')
    expect(() =>
      formatUnitsOption(secondaryDistanceUnitOption(Length.inches), settings)
    ).to.throw('invalid length unit: in')
  })
  it('FrontsightAzimuthUnit option', () => {
    expect(
      formatUnitsOption(frontsightAzimuthUnitOption(Angle.degrees), settings)
    ).to.equal('A=Degrees')
    expect(
      formatUnitsOption(frontsightAzimuthUnitOption(Angle.gradians), settings)
    ).to.equal('A=Grads')
    expect(
      formatUnitsOption(frontsightAzimuthUnitOption(Angle.milsNATO), settings)
    ).to.equal('A=Mils')
    expect(() =>
      formatUnitsOption(frontsightAzimuthUnitOption(Angle.radians), settings)
    ).to.throw('invalid azimuth unit: rad')
    expect(() =>
      formatUnitsOption(
        frontsightAzimuthUnitOption(Angle.percentGrade),
        settings
      )
    ).to.throw('invalid azimuth unit: %')
  })
  it('BacksightAzimuthUnit option', () => {
    expect(
      formatUnitsOption(backsightAzimuthUnitOption(Angle.degrees), settings)
    ).to.equal('AB=Degrees')
    expect(
      formatUnitsOption(backsightAzimuthUnitOption(Angle.gradians), settings)
    ).to.equal('AB=Grads')
    expect(
      formatUnitsOption(backsightAzimuthUnitOption(Angle.milsNATO), settings)
    ).to.equal('AB=Mils')
    expect(() =>
      formatUnitsOption(backsightAzimuthUnitOption(Angle.radians), settings)
    ).to.throw('invalid azimuth unit: rad')
    expect(() =>
      formatUnitsOption(
        backsightAzimuthUnitOption(Angle.percentGrade),
        settings
      )
    ).to.throw('invalid azimuth unit: %')
  })
  it('FrontsightInclinationUnit option', () => {
    expect(
      formatUnitsOption(
        frontsightInclinationUnitOption(Angle.degrees),
        settings
      )
    ).to.equal('V=Degrees')
    expect(
      formatUnitsOption(
        frontsightInclinationUnitOption(Angle.gradians),
        settings
      )
    ).to.equal('V=Grads')
    expect(
      formatUnitsOption(
        frontsightInclinationUnitOption(Angle.milsNATO),
        settings
      )
    ).to.equal('V=Mils')
    expect(
      formatUnitsOption(
        frontsightInclinationUnitOption(Angle.percentGrade),
        settings
      )
    ).to.equal('V=Percent')
    expect(() =>
      formatUnitsOption(
        frontsightInclinationUnitOption(Angle.radians),
        settings
      )
    ).to.throw('invalid inclination unit: rad')
  })
  it('BacksightInclinationUnit option', () => {
    expect(
      formatUnitsOption(backsightInclinationUnitOption(Angle.degrees), settings)
    ).to.equal('VB=Degrees')
    expect(
      formatUnitsOption(
        backsightInclinationUnitOption(Angle.gradians),
        settings
      )
    ).to.equal('VB=Grads')
    expect(
      formatUnitsOption(
        backsightInclinationUnitOption(Angle.milsNATO),
        settings
      )
    ).to.equal('VB=Mils')
    expect(
      formatUnitsOption(
        backsightInclinationUnitOption(Angle.percentGrade),
        settings
      )
    ).to.equal('VB=Percent')
    expect(() =>
      formatUnitsOption(backsightInclinationUnitOption(Angle.radians), settings)
    ).to.throw('invalid inclination unit: rad')
  })
  it('MagneticDeclination option', () => {
    expect(
      formatUnitsOption(magneticDeclinationOption(Unitize.degrees(5)), settings)
    ).to.equal('DECL=5')
    expect(
      formatUnitsOption(
        magneticDeclinationOption(Unitize.gradians(50)),
        settings
      )
    ).to.equal('DECL=50g')
    expect(() =>
      formatUnitsOption(
        magneticDeclinationOption(Unitize.percentGrade(45)),
        settings
      )
    ).to.throw('invalid azimuth unit: % grade')
  })
  it('GridNorthCorrection option', () => {
    expect(
      formatUnitsOption(gridNorthCorrectionOption(Unitize.degrees(5)), settings)
    ).to.equal('GRID=5')
    expect(
      formatUnitsOption(
        gridNorthCorrectionOption(Unitize.gradians(50)),
        settings
      )
    ).to.equal('GRID=50g')
    expect(() =>
      formatUnitsOption(
        gridNorthCorrectionOption(Unitize.percentGrade(45)),
        settings
      )
    ).to.throw('invalid azimuth unit: % grade')
  })
  it('RectilinearNorthCorrection option', () => {
    expect(
      formatUnitsOption(
        rectilinearNorthCorrectionOption(Unitize.degrees(5)),
        settings
      )
    ).to.equal('RECT=5')
    expect(
      formatUnitsOption(
        rectilinearNorthCorrectionOption(Unitize.gradians(50)),
        settings
      )
    ).to.equal('RECT=50g')
    expect(() =>
      formatUnitsOption(
        rectilinearNorthCorrectionOption(Unitize.percentGrade(45)),
        settings
      )
    ).to.throw('invalid azimuth unit: % grade')
  })
  it('DistanceCorrection option', () => {
    expect(
      formatUnitsOption(distanceCorrectionOption(Unitize.meters(2)), settings)
    ).to.equal('INCD=2')
    expect(
      formatUnitsOption(distanceCorrectionOption(Unitize.feet(5)), settings)
    ).to.equal('INCD=5f')
    expect(
      formatUnitsDirective(
        unitsDirective([
          primaryDistanceUnitOption(Length.feet),
          distanceCorrectionOption(Unitize.feet(3)),
        ]),
        settings
      )
    ).to.equal('#UNITS D=Feet INCD=3\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          primaryDistanceUnitOption(Length.feet),
          distanceCorrectionOption(Unitize.meters(3)),
        ]),
        settings
      )
    ).to.equal('#UNITS D=Feet INCD=3m\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          distanceUnitOption(Length.feet),
          distanceCorrectionOption(Unitize.feet(3)),
        ]),
        settings
      )
    ).to.equal('#UNITS Feet INCD=3\r\n')
  })
  it('FrontsightAzimuthCorrection option', () => {
    expect(
      formatUnitsOption(
        frontsightAzimuthCorrectionOption(Unitize.degrees(-2)),
        settings
      )
    ).to.equal('INCA=-2')
    expect(
      formatUnitsOption(
        frontsightAzimuthCorrectionOption(Unitize.milsNATO(-2)),
        settings
      )
    ).to.equal('INCA=-2m')
    expect(
      formatUnitsOption(
        frontsightAzimuthCorrectionOption(Unitize.radians(Math.PI / 4)),
        settings
      )
    ).to.equal('INCA=45')
    expect(
      formatUnitsOption(
        frontsightAzimuthCorrectionOption(Unitize.gradians(-2)),
        settings
      )
    ).to.equal('INCA=-2g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightAzimuthUnitOption(Angle.milsNATO),
          frontsightAzimuthCorrectionOption(Unitize.milsNATO(100)),
        ]),
        settings
      )
    ).to.equal('#UNITS A=Mils INCA=100\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightAzimuthUnitOption(Angle.milsNATO),
          frontsightAzimuthCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS A=Mils INCA=2d\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightAzimuthUnitOption(Angle.milsNATO),
          frontsightAzimuthCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS AB=Mils INCA=2\r\n')
  })
  it('BacksightAzimuthCorrection option', () => {
    expect(
      formatUnitsOption(
        backsightAzimuthCorrectionOption(Unitize.degrees(-2)),
        settings
      )
    ).to.equal('INCAB=-2')
    expect(
      formatUnitsOption(
        backsightAzimuthCorrectionOption(Unitize.gradians(-2)),
        settings
      )
    ).to.equal('INCAB=-2g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightAzimuthUnitOption(Angle.milsNATO),
          backsightAzimuthCorrectionOption(Unitize.milsNATO(100)),
        ]),
        settings
      )
    ).to.equal('#UNITS AB=Mils INCAB=100\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightAzimuthUnitOption(Angle.milsNATO),
          backsightAzimuthCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS AB=Mils INCAB=2d\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightAzimuthUnitOption(Angle.milsNATO),
          backsightAzimuthCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS A=Mils INCAB=2\r\n')
  })
  it('FrontsightInclinationCorrection option', () => {
    expect(
      formatUnitsOption(
        frontsightInclinationCorrectionOption(Unitize.degrees(-2)),
        settings
      )
    ).to.equal('INCV=-2')
    expect(
      formatUnitsOption(
        frontsightInclinationCorrectionOption(Unitize.percentGrade(-2)),
        settings
      )
    ).to.equal('INCV=-2p')
    expect(
      formatUnitsOption(
        frontsightInclinationCorrectionOption(Unitize.gradians(-2)),
        settings
      )
    ).to.equal('INCV=-2g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightInclinationUnitOption(Angle.milsNATO),
          frontsightInclinationCorrectionOption(Unitize.milsNATO(100)),
        ]),
        settings
      )
    ).to.equal('#UNITS V=Mils INCV=100\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightInclinationUnitOption(Angle.milsNATO),
          frontsightInclinationCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS V=Mils INCV=2d\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightInclinationUnitOption(Angle.milsNATO),
          frontsightInclinationCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS VB=Mils INCV=2\r\n')
  })
  it('BacksightInclinationCorrection option', () => {
    expect(
      formatUnitsOption(
        backsightInclinationCorrectionOption(Unitize.degrees(-2)),
        settings
      )
    ).to.equal('INCVB=-2')
    expect(
      formatUnitsOption(
        backsightInclinationCorrectionOption(Unitize.radians(Math.PI / 4)),
        settings
      )
    ).to.equal('INCVB=45')
    expect(
      formatUnitsOption(
        backsightInclinationCorrectionOption(Unitize.gradians(-2)),
        settings
      )
    ).to.equal('INCVB=-2g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightInclinationUnitOption(Angle.milsNATO),
          backsightInclinationCorrectionOption(Unitize.milsNATO(100)),
        ]),
        settings
      )
    ).to.equal('#UNITS VB=Mils INCVB=100\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightInclinationUnitOption(Angle.milsNATO),
          backsightInclinationCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS VB=Mils INCVB=2d\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          frontsightInclinationUnitOption(Angle.milsNATO),
          backsightInclinationCorrectionOption(Unitize.degrees(2)),
        ]),
        settings
      )
    ).to.equal('#UNITS V=Mils INCVB=2\r\n')
  })
  it('HeightAdjustment option', () => {
    expect(
      formatUnitsOption(heightAdjustmentOption(Unitize.meters(3)), settings)
    ).to.equal('INCH=3')
    expect(
      formatUnitsOption(
        heightAdjustmentOption(Unitize.centimeters(32)),
        settings
      )
    ).to.equal('INCH=0.32')
    expect(
      formatUnitsOption(heightAdjustmentOption(Unitize.feet(3)), settings)
    ).to.equal('INCH=3f')
    expect(
      formatUnitsDirective(
        unitsDirective([
          primaryDistanceUnitOption(Length.feet),
          heightAdjustmentOption(Unitize.feet(3)),
        ]),
        settings
      )
    ).to.equal('#UNITS D=Feet INCH=3\r\n')
    expect(
      formatUnitsDirective(
        unitsDirective([
          primaryDistanceUnitOption(Length.feet),
          heightAdjustmentOption(Unitize.inches(15.25)),
        ]),
        settings
      )
    ).to.equal('#UNITS D=Feet INCH=1i3.25\r\n')
  })
  it('BacksightAzimuthType option', () => {
    expect(
      formatUnitsOption(
        backsightAzimuthTypeOption(true, Unitize.degrees(3), true),
        settings
      )
    ).to.equal('TYPEAB=C,3,X')
    expect(
      formatUnitsOption(
        backsightAzimuthTypeOption(false, Unitize.gradians(3), false),
        settings
      )
    ).to.equal('TYPEAB=N,3g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightAzimuthUnitOption(Angle.gradians),
          backsightAzimuthTypeOption(false, Unitize.gradians(3), false),
        ]),
        settings
      )
    ).to.equal('#UNITS AB=Grads TYPEAB=N,3\r\n')
  })
  it('BacksightInclinationType option', () => {
    expect(
      formatUnitsOption(
        backsightInclinationTypeOption(true, Unitize.degrees(3), true),
        settings
      )
    ).to.equal('TYPEVB=C,3,X')
    expect(
      formatUnitsOption(
        backsightInclinationTypeOption(false, Unitize.gradians(3), false),
        settings
      )
    ).to.equal('TYPEVB=N,3g')
    expect(
      formatUnitsDirective(
        unitsDirective([
          backsightInclinationUnitOption(Angle.gradians),
          backsightInclinationTypeOption(false, Unitize.gradians(3), false),
        ]),
        settings
      )
    ).to.equal('#UNITS VB=Grads TYPEVB=N,3\r\n')
  })
  it('Reset option', () => {
    expect(formatUnitsOption(resetOption(), settings)).to.equal('RESET')
  })
  it('Save option', () => {
    expect(formatUnitsOption(saveOption(), settings)).to.equal('SAVE')
  })
  it('Restore option', () => {
    expect(formatUnitsOption(restoreOption(), settings)).to.equal('RESTORE')
  })
  it('StationNameCase option', () => {
    expect(
      formatUnitsOption(
        stationNameCaseOption(StationNameCaseConversion.Lower),
        settings
      )
    ).to.equal('CASE=Lower')
    expect(
      formatUnitsOption(
        stationNameCaseOption(StationNameCaseConversion.Upper),
        settings
      )
    ).to.equal('CASE=Upper')
  })
  it('LrudStyle option', () => {
    expect(
      formatUnitsOption(
        lrudStyleOption(LrudStyle.FromStationPerpendicular),
        settings
      )
    ).to.equal('LRUD=F')
    expect(
      formatUnitsOption(
        lrudStyleOption(LrudStyle.ToStationPerpendicular),
        settings
      )
    ).to.equal('LRUD=T')
    expect(
      formatUnitsOption(
        lrudStyleOption(LrudStyle.FromStationBisector),
        settings
      )
    ).to.equal('LRUD=FB')
    expect(
      formatUnitsOption(lrudStyleOption(LrudStyle.ToStationBisector), settings)
    ).to.equal('LRUD=TB')
    expect(
      formatUnitsOption(
        lrudStyleOption(LrudStyle.ToStationBisector, [
          LrudItem.Up,
          LrudItem.Down,
          LrudItem.Right,
          LrudItem.Left,
        ]),
        settings
      )
    ).to.equal('LRUD=TB:UDRL')
  })
  it('Prefix option', () => {
    expect(formatUnitsOption(prefixOption(1, 'foo'), settings)).to.equal(
      'PREFIX=foo'
    )
    expect(formatUnitsOption(prefixOption(2, 'foo'), settings)).to.equal(
      'PREFIX2=foo'
    )
    expect(formatUnitsOption(prefixOption(3, 'foo'), settings)).to.equal(
      'PREFIX3=foo'
    )
    expect(formatUnitsOption(prefixOption(3, null), settings)).to.equal(
      'PREFIX3'
    )
  })
  it('TapingMethod option', () => {
    expect(
      formatUnitsOption(
        tapingMethodOption(TapingMethod.InstrumentToTarget),
        settings
      )
    ).to.equal('TAPE=IT')
    expect(
      formatUnitsOption(
        tapingMethodOption(TapingMethod.StationToStation),
        settings
      )
    ).to.equal('TAPE=SS')
    expect(
      formatUnitsOption(
        tapingMethodOption(TapingMethod.InstrumentToStation),
        settings
      )
    ).to.equal('TAPE=IS')
    expect(
      formatUnitsOption(
        tapingMethodOption(TapingMethod.StationToTarget),
        settings
      )
    ).to.equal('TAPE=ST')
  })
  it('UnitVariance option', () => {
    expect(formatUnitsOption(unitVarianceOption(2.3), settings)).to.equal(
      'UV=2.3'
    )
  })
  it('HorizontalUnitVariance option', () => {
    expect(
      formatUnitsOption(horizontalUnitVarianceOption(2.3), settings)
    ).to.equal('UVH=2.3')
  })
  it('VerticalUnitVariance option', () => {
    expect(
      formatUnitsOption(verticalUnitVarianceOption(2.3), settings)
    ).to.equal('UVV=2.3')
  })
  it('Flag option', () => {
    expect(formatUnitsOption(flagOption('hello "world"'), settings)).to.equal(
      'FLAG="hello \\"world\\""'
    )
    expect(formatUnitsOption(flagOption(null), settings)).to.equal('FLAG')
  })
  it('Macro', () => {
    expect(formatUnitsOption(macroOption('test', null), settings)).to.equal(
      '$test'
    )
    expect(
      formatUnitsOption(macroOption('test', 'hello "world"'), settings)
    ).to.equal('$test="hello \\"world\\""')
  })
})
describe(`formatSegmentDirective`, function() {
  it(`base`, function() {
    expect(formatSegmentDirective(segmentDirective('foo'))).to.equal(
      '#SEGMENT\tfoo\r\n'
    )
  })
  it(`comment`, function() {
    expect(formatSegmentDirective(segmentDirective('foo', 'test'))).to.equal(
      '#SEGMENT\tfoo\t;test\r\n'
    )
  })
})
it(`formatVariance`, function() {
  expect(formatVariance(null, null, settings)).to.equal('')
  expect(
    formatVariance(lengthVarianceAssignment(Unitize.feet(3)), null, settings)
  ).to.equal('(3f,)')
  expect(
    formatVariance(
      lengthVarianceAssignment(Unitize.feet(3)),
      rmsErrorVarianceAssignment(Unitize.meters(2)),
      settings
    )
  ).to.equal('(3f,R2)')
  expect(
    formatVariance(
      rmsErrorVarianceAssignment(Unitize.meters(2)),
      rmsErrorVarianceAssignment(Unitize.meters(2)),
      settings
    )
  ).to.equal('(R2)')
  expect(
    formatVariance(
      floatShotVarianceAssignment(),
      floatTraverseVarianceAssignment(),
      settings
    )
  ).to.equal('(?,*)')
  expect(
    formatVariance(
      floatShotVarianceAssignment(),
      floatShotVarianceAssignment(),
      settings
    )
  ).to.equal('(?)')
})
describe(`formatFixDirective`, function() {
  it(`long/lat`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(32.7),
          Unitize.degrees(12.4),
          Unitize.meters(5)
        ),
        settings
      )
    ).to.equal('#FIX\tA\tE32.7\tN12.4\t5\r\n')
  })
  it(`west longitude`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(-173.5),
          Unitize.degrees(12.4),
          Unitize.meters(5)
        ),
        settings
      )
    ).to.equal('#FIX\tA\tW173.5\tN12.4\t5\r\n')
  })
  it(`south latitude`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(32.7),
          Unitize.degrees(-83.4),
          Unitize.meters(5)
        ),
        settings
      )
    ).to.equal('#FIX\tA\tE32.7\tS83.4\t5\r\n')
  })

  it(`south latitude`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(32.7),
          Unitize.degrees(-83.4),
          Unitize.meters(5)
        ),
        settings
      )
    ).to.equal('#FIX\tA\tE32.7\tS83.4\t5\r\n')
  })
  it(`variance`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(32.7),
          Unitize.degrees(-83.4),
          Unitize.meters(5),
          { horizontalVariance: lengthVarianceAssignment(Unitize.feet(20)) }
        ),
        settings
      )
    ).to.equal('#FIX\tA\tE32.7\tS83.4\t5\t(20f,)\r\n')
  })
  it(`elevation units`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.degrees(32.7),
          Unitize.degrees(-83.4),
          Unitize.miles(-1),
          { horizontalVariance: lengthVarianceAssignment(Unitize.feet(20)) }
        ),
        settings
      )
    ).to.equal('#FIX\tA\tE32.7\tS83.4\t-5280f\t(20f,)\r\n')
  })
  it(`segment`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
          { segment: 'test' }
        ),
        settings
      )
    ).to.equal('#FIX\tA\t2\t3\t4\t#SEGMENT test\r\n')
  })
  it(`note + segment`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
          { note: 'note', segment: 'test' }
        ),
        settings
      )
    ).to.equal('#FIX\tA\t2\t3\t4\t/note\t#SEGMENT test\r\n')
  })
  it(`comment`, function() {
    expect(
      formatFixDirective(
        fixDirective(
          'A',
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
          { comment: 'foo' }
        ),
        settings
      )
    ).to.equal('#FIX\tA\t2\t3\t4\t;foo\r\n')
  })
})
describe(`formatPrefixDirective`, function() {
  it(`level 1`, function() {
    expect(formatPrefixDirective(prefixDirective(1, 'foo'))).to.equal(
      '#PREFIX\tfoo\r\n'
    )
  })
  it(`level 1 empty`, function() {
    expect(formatPrefixDirective(prefixDirective(1, null))).to.equal(
      '#PREFIX\r\n'
    )
  })
  it(`level 2`, function() {
    expect(formatPrefixDirective(prefixDirective(2, 'foo'))).to.equal(
      '#PREFIX2\tfoo\r\n'
    )
  })
  it(`level 2 empty`, function() {
    expect(formatPrefixDirective(prefixDirective(2, null))).to.equal(
      '#PREFIX2\r\n'
    )
  })
  it(`level 3`, function() {
    expect(formatPrefixDirective(prefixDirective(3, 'foo'))).to.equal(
      '#PREFIX3\tfoo\r\n'
    )
  })
  it(`comment`, function() {
    expect(formatPrefixDirective(prefixDirective(3, 'foo', 'blah'))).to.equal(
      '#PREFIX3\tfoo\t;blah\r\n'
    )
  })
})
describe(`formatNoteDirective`, function() {
  it(`base`, function() {
    expect(formatNoteDirective(noteDirective('A', 'test blah blah'))).to.equal(
      '#NOTE\tA\ttest blah blah\r\n'
    )
  })
  it(`comment`, function() {
    expect(
      formatNoteDirective(noteDirective('A', 'test blah blah', 'floogh'))
    ).to.equal('#NOTE\tA\ttest blah blah\t;floogh\r\n')
  })
})
describe(`formatFlagDirective`, function() {
  it(`base`, function() {
    expect(
      formatFlagDirective(flagDirective(['A', 'B', 'C'], 'foo bar baz'))
    ).to.equal('#FLAG\tA\tB\tC\t/foo bar baz\r\n')
  })
  it(`comment`, function() {
    expect(
      formatFlagDirective(
        flagDirective(['A', 'B', 'C'], 'foo bar baz', 'this is a comment')
      )
    ).to.equal('#FLAG\tA\tB\tC\t/foo bar baz\t;this is a comment\r\n')
  })
})
describe(`formatDateDirective`, function() {
  it(`base`, function() {
    expect(formatDateDirective(dateDirective(new Date('Aug 7 2019')))).to.equal(
      '#DATE\t2019-08-07\r\n'
    )
  })
  it(`comment`, function() {
    expect(
      formatDateDirective(
        dateDirective(new Date('Aug 7 2019'), 'this is a comment')
      )
    ).to.equal('#DATE\t2019-08-07\t;this is a comment\r\n')
  })
})
describe(`formatShot`, function() {
  it(`compass and tape`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3)
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\r\n')
  })
  it(`instrument and target heights`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          {
            instrumentHeight: Unitize.meters(4),
            targetHeight: Unitize.meters(5),
          }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t4\t5\r\n')
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          {
            instrumentHeight: null,
            targetHeight: Unitize.meters(5),
          }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t--\t5\r\n')
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          {
            instrumentHeight: Unitize.meters(4),
            targetHeight: null,
          }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t4\t--\r\n')
  })
  it(`rectilinear`, function() {
    expect(
      formatShot(
        rectilinearShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.meters(2),
          Unitize.meters(3)
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\r\n')
  })
  it(`segment`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          { segment: 'foo/bar' }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t#SEGMENT foo/bar\r\n')
  })
  it(`comment`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          { comment: 'this is a comment' }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t;this is a comment\r\n')
  })
  it(`variance`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          { horizontalVariance: floatShotVarianceAssignment() }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t(?,)\r\n')
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3),
          null,
          { verticalVariance: floatShotVarianceAssignment() }
        ),
        settings
      )
    ).to.equal('A\tB\t1\t2\t3\t(,?)\r\n')
  })
  it(`LRUDs only`, function() {
    expect(
      formatShot(
        stationLruds('A', [
          Unitize.meters(1),
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
        ]),
        settings
      )
    ).to.equal('A\t<1,2,3,4>\r\n')
  })
  it(`LRUDs only, facing azimuth`, function() {
    expect(
      formatShot(
        stationLruds('A', [
          Unitize.meters(1),
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
          Unitize.degrees(320),
        ]),
        settings
      )
    ).to.equal('A\t<1,2,3,4,320>\r\n')
  })
  it(`LRUDs only, left/right azimuths`, function() {
    expect(
      formatShot(
        stationLruds('A', [
          Unitize.meters(1),
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
          Unitize.degrees(320),
          Unitize.degrees(165),
        ]),
        settings
      )
    ).to.equal('A\t<1,2,3,4,320,165>\r\n')
  })
  it(`LRUDs only, different order`, function() {
    expect(
      formatShot(
        stationLruds('A', [
          Unitize.meters(1),
          Unitize.meters(2),
          Unitize.meters(3),
          Unitize.meters(4),
        ]),
        {
          ...settings,
          lrudOrder: [
            LrudItem.Down,
            LrudItem.Up,
            LrudItem.Right,
            LrudItem.Left,
          ],
        }
      )
    ).to.equal('A\t<4,3,2,1>\r\n')
  })
  it(`LRUDs only, some missing`, function() {
    expect(
      formatShot(
        stationLruds('A', [Unitize.meters(1), null, Unitize.meters(3), null]),
        settings
      )
    ).to.equal('A\t<1,--,3,-->\r\n')
  })
  it(`missing azimuth`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          null,
          Unitize.degrees(-90)
        ),
        settings
      )
    ).to.equal('A\tB\t1\t--\t-90\r\n')
  })
  it(`azimuth frontsight and backsight`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          [Unitize.degrees(30), Unitize.degrees(32)],
          Unitize.degrees(-90)
        ),
        settings
      )
    ).to.equal('A\tB\t1\t30/32\t-90\r\n')
  })
  it(`backsight azimuth only`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          [null, Unitize.degrees(32)],
          Unitize.degrees(-90)
        ),
        settings
      )
    ).to.equal('A\tB\t1\t--/32\t-90\r\n')
  })
  it(`missing inclination`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          'B',
          Unitize.meters(1),
          Unitize.degrees(5),
          null
        ),
        settings
      )
    ).to.equal('A\tB\t1\t5\t--\r\n')
  })
  it(`inclination frontsight and backsight`, function() {
    expect(
      formatShot(
        compassAndTapeShot('A', 'B', Unitize.meters(1), Unitize.degrees(5), [
          Unitize.degrees(4),
          Unitize.degrees(5),
        ]),
        settings
      )
    ).to.equal('A\tB\t1\t5\t4/5\r\n')
  })
  it(`backsight inclination only`, function() {
    expect(
      formatShot(
        compassAndTapeShot('A', 'B', Unitize.meters(1), Unitize.degrees(5), [
          null,
          Unitize.degrees(-5),
        ]),
        settings
      )
    ).to.equal('A\tB\t1\t5\t--/-5\r\n')
  })
  it(`splays`, function() {
    expect(
      formatShot(
        compassAndTapeShot(
          null,
          'B',
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3)
        ),
        settings
      )
    ).to.equal('-\tB\t1\t2\t3\r\n')
    expect(
      formatShot(
        compassAndTapeShot(
          'A',
          null,
          Unitize.meters(1),
          Unitize.degrees(2),
          Unitize.degrees(3)
        ),
        settings
      )
    ).to.equal('A\t-\t1\t2\t3\r\n')
  })
})
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
          segmentDirective('foo/bar'),
          prefixDirective(1, 'Test'),
          flagDirective(['A'], 'this is a flag'),
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
          noteDirective('A', 'test'),
          symbolDirective(
            SymbolOpacity.Clear,
            SymbolShape.PlusSign,
            10,
            { r: 15, g: 238, b: 125 },
            'blah'
          ),
        ],
      })
    ).to.deep
      .equal(`#UNITS D=Feet Meters D=Feet S=Meters INCD=2 INCH=3m SAVE FLAG="this is\\n\\"a test" ORDER=ADV ORDER=NUE LRUD=F:LUDR\r
A\tB\t--/30.5\t3m\t-3\t1f\t--\t<1,--,--,--,20g>\t#SEGMENT /test\t;foobar\r
B\t<1,3,4,2>\r
#DATE\t1986-02-04\r
#[\r
this\r
is\r
a\r
test\r
#]\r
#SEGMENT\tfoo/bar\r
#PREFIX\tTest\r
#FLAG\tA\t/this is a flag\r
#FIX\tA\t5m\t3\t2m\t/foo\r
#FIX\tC\tN34.567\t4\tW83.2342\r
#NOTE\tA\ttest\r
#SYMBOL\tCP10\t(15, 238, 125)\t/blah\r
`)
  })
})
