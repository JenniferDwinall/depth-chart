import chai from 'chai'

import {
  addPlayerToDepthChart,
  getFullDepthChart,
  getPlayersUnderPlayerInDepthChart,
  removePlayerFromDepthChart
} from '../src'

/* global expect */
global.expect = chai.expect
global.depthChart = {}

/* global describe it before after */
describe('Test example', function () {
  /* global bob alice charlie */
  before(function () {
    // Define an empty depth chart.
    depthChart = {}

    // Define some players.
    global.bob = {
      player_id: 1,
      name: 'Bob',
      position: 'WR'
    }
    global.alice = {
      player_id: 2,
      name: 'Alice',
      position: 'WR'
    }
    global.charlie = {
      player_id: 3,
      name: 'Charlie',
      position: 'WR'
    }
  })

  after(function () {
    // Reset depth chart.
    depthChart = {}
  })

  describe('Adds a player to a depth chart for a given position (at a specific spot).', function (done) {
    it('Adds some players to the depth chart', function (done) {
      addPlayerToDepthChart(bob, 'WR', 0)
      addPlayerToDepthChart(alice, 'WR', 0)
      addPlayerToDepthChart(charlie, 'WR', 2)
      addPlayerToDepthChart(bob, 'KR')
      addPlayerToDepthChart(charlie, 'KR')
      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal({ WR: [ 2, 1, 3 ], KR: [ 3, 1 ] })
      done()
    })
    it('Adds a player to the depth chart that does not exist', function (done) {
      addPlayerToDepthChart({}, 'K')
      done()
    })
  })

  describe('Removes a player from the depth chart for a position', function (done) {
    it('Remove a player from the depth chart', function (done) {
      removePlayerFromDepthChart(charlie, 'KR')
      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal({ WR: [ 2, 1, 3 ], KR: [ 1 ] })
      done()
    })
    it('Remove a player from the depth chart that does not exist', function (done) {
      removePlayerFromDepthChart(alice, 'KR')
      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal({ WR: [ 2, 1, 3 ], KR: [ 1 ] })
      done()
    })
  })

  describe('Prints out all depth chart positions', function () {
    it('Returns all players', function (done) {
      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal({ WR: [ 2, 1, 3 ], KR: [ 1 ] })
      done()
    })
  })

  describe('For a given player find all players below them on the depth chart.', function (done) {
    it('Return players', function (done) {
      const p = getPlayersUnderPlayerInDepthChart(alice, 'WR')
      expect(p).to.deep.equal([1, 3])
      done()
    })
    it('Return nothing', function (done) {
      const p = getPlayersUnderPlayerInDepthChart(bob, 'WR')
      expect(p).to.deep.equal([])
      done()
    })
  })
})

describe('Test NFL', function () {
  /* global tomBrady brianHoyer brandinCooks chrisHogan dannyAmendola  */
  /* global dionLewis jamesWhite dwayneAllen martellusBennett robGronkowski */
  /* global steveGostkowski  */
  before(function () {
    // Define an empty depth chart.
    depthChart = {}

    // Define some players.
    global.tomBrady = {
      player_id: 12,
      name: 'Tom Brady',
      position: 'QB'
    }
    global.brianHoyer = {
      player_id: 2,
      name: 'Brian Hoyer',
      position: 'QB'
    }
    global.brandinCooks = {
      player_id: 14,
      name: 'Brandin Cooks',
      position: 'WR'
    }
    global.chrisHogan = {
      player_id: 15,
      name: 'Chris Hogan',
      position: 'WR'
    }
    global.dannyAmendola = {
      player_id: 80,
      name: 'Danny Amendola',
      position: 'WR'
    }
    global.dionLewis = {
      player_id: 33,
      name: 'Dion Lewis',
      position: 'RB'
    }
    global.jamesWhite = {
      player_id: 28,
      name: 'James White',
      position: 'RB'
    }
    global.robGronkowski = {
      player_id: 87,
      name: 'Rob Gronkowski',
      position: 'TE'
    }
    global.martellusBennett = {
      player_id: 88,
      name: 'Martellus Bennett',
      position: 'TE'
    }
    global.dwayneAllen = {
      player_id: 83,
      name: 'Dwayne Allen',
      position: 'TE'
    }
    global.steveGostkowski = {
      player_id: 3,
      name: 'Steve Gostkowski',
      position: 'K'
    }
    global.ryanAllen = {
      player_id: 6,
      name: 'Ryan Allen',
      position: 'P'
    }
  })

  after(function () {
    // Reset depth chart.
    depthChart = {}
  })

  describe('Using New England', function (done) {
    it('Create depth chart for New England', function (done) {
      addPlayerToDepthChart(tomBrady, 'QB', 0)
      addPlayerToDepthChart(brianHoyer, 'QB', 1)
      addPlayerToDepthChart(brandinCooks, 'WR', 0)
      addPlayerToDepthChart(chrisHogan, 'WR', 1)
      addPlayerToDepthChart(dannyAmendola, 'WR', 2)
      addPlayerToDepthChart(dionLewis, 'RB', 0)
      addPlayerToDepthChart(jamesWhite, 'RB', 1)
      addPlayerToDepthChart(dwayneAllen, 'TE')
      addPlayerToDepthChart(martellusBennett, 'TE')
      addPlayerToDepthChart(robGronkowski, 'TE')
      addPlayerToDepthChart(steveGostkowski, 'K')
      addPlayerToDepthChart(dionLewis, 'KR')
      addPlayerToDepthChart(dannyAmendola, 'PR')
      done()
    })

    it('Check New England depth chart', function (done) {
      const newEnglandDepthChart = {
        QB: [ 12, 2 ],
        WR: [ 14, 15, 80 ],
        RB: [ 33, 28 ],
        TE: [ 87, 88, 83 ],
        K: [ 3 ],
        KR: [ 33 ],
        PR: [ 80 ]
      }

      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal(newEnglandDepthChart)
      done()
    })

    it('Process Transactions', function (done) {
      removePlayerFromDepthChart(martellusBennett, 'TE')
      removePlayerFromDepthChart(brandinCooks, 'WR')
      done()
    })
    it('Check New England depth chart', function (done) {
      const newEnglandDepthChart = {
        QB: [ 12, 2 ],
        WR: [ 15, 80 ],
        RB: [ 33, 28 ],
        TE: [ 87, 83 ],
        K: [ 3 ],
        KR: [ 33 ],
        PR: [ 80 ]
      }

      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal(newEnglandDepthChart)
      done()
    })
  })
})

describe('Test MLB', function () {
  /* global davidPrice chrisSale joeKelly christianVazquez sandyLeon hanleyRamirez mitchMoreland brockHolt rafaelDevers eduardoNunez andrewBenintendi jdMartinez jackieBradleyJr xanderBogaerts */
  before(function () {
    // Define an empty depth chart.
    depthChart = {}

    // Define some players.
    global.chrisSale = {
      player_id: 41,
      name: 'Chris Sale',
      position: 'SP'
    }
    global.davidPrice = {
      player_id: 24,
      name: 'David Price',
      position: 'SP'
    }
    global.joeKelly = {
      player_id: 56,
      name: 'Joe Kelly',
      position: 'RP'
    }
    global.christianVazquez = {
      player_id: 7,
      name: 'Christian Vazquez',
      position: 'C'
    }
    global.sandyLeon = {
      player_id: 3,
      name: 'Sandy Leon',
      position: 'C'
    }
    global.hanleyRamirez = {
      player_id: 13,
      name: 'Hanley Ramirez',
      position: '1B'
    }
    global.mitchMoreland = {
      player_id: 18,
      name: 'Mitch Moreland',
      position: '1B'
    }
    global.eduardoNunez = {
      player_id: 36,
      name: 'Eduardo Núñez',
      position: '2B'
    }
    global.brockHolt = {
      player_id: 12,
      name: 'Brock Holt',
      position: '2B'
    }
    global.rafaelDevers = {
      player_id: 11,
      name: 'Rafael Devers',
      position: '3B'
    }
    global.xanderBogaerts = {
      player_id: 2,
      name: 'Xander Bogaerts',
      position: 'SS'
    }
    global.andrewBenintendi = {
      player_id: 16,
      name: 'Andrew Benintendi',
      position: 'LF'
    }
    global.jdMartinez = {
      player_id: 28,
      name: 'J.D. Martinez',
      position: 'LF'
    }
    global.jackieBradleyJr = {
      player_id: 19,
      name: 'Jackie Bradley Jr.',
      position: 'CF'
    }
  })

  after(function () {
    // Reset depth chart.
    depthChart = {}
  })

  describe('Using Boston', function (done) {
    it('Create depth chart for Boston', function (done) {
      addPlayerToDepthChart(davidPrice, 'SP')
      addPlayerToDepthChart(chrisSale, 'SP')
      addPlayerToDepthChart(joeKelly, 'RP')
      addPlayerToDepthChart(christianVazquez, 'C')
      addPlayerToDepthChart(sandyLeon, 'C')
      addPlayerToDepthChart(hanleyRamirez, '1B')
      addPlayerToDepthChart(mitchMoreland, '1B')
      addPlayerToDepthChart(eduardoNunez, '2B')
      addPlayerToDepthChart(brockHolt, '2B')
      addPlayerToDepthChart(rafaelDevers, '3B')
      addPlayerToDepthChart(eduardoNunez, 'SS')
      addPlayerToDepthChart(andrewBenintendi, 'LF')
      addPlayerToDepthChart(jdMartinez, 'LF')
      addPlayerToDepthChart(jdMartinez, 'RF')
      addPlayerToDepthChart(andrewBenintendi, 'CF')
      addPlayerToDepthChart(jackieBradleyJr, 'CF')
      addPlayerToDepthChart(xanderBogaerts, 'SS')
      addPlayerToDepthChart(hanleyRamirez, 'DH')
      addPlayerToDepthChart(jdMartinez, 'DH')

      done()
    })

    it('Check Boston depth chart', function (done) {
      const bostonDepthChart = {
        SP: [ 41, 24 ],
        RP: [ 56 ],
        C: [ 3, 7 ],
        '1B': [ 18, 13 ],
        '2B': [ 12, 36 ],
        '3B': [ 11 ],
        SS: [ 2, 36 ],
        LF: [ 28, 16 ],
        RF: [ 28 ],
        CF: [ 19, 16 ],
        DH: [ 28, 13 ]
      }

      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal(bostonDepthChart)
      done()
    })

    it('Process Transactions', function (done) {
      removePlayerFromDepthChart(chrisSale, 'SP')
      removePlayerFromDepthChart(jdMartinez, 'DH')
      done()
    })
    it('Check New England depth chart', function (done) {
      const bostonDepthChart = {
        SP: [ 24 ],
        RP: [ 56 ],
        C: [ 3, 7 ],
        '1B': [ 18, 13 ],
        '2B': [ 12, 36 ],
        '3B': [ 11 ],
        SS: [ 2, 36 ],
        LF: [ 28, 16 ],
        RF: [ 28 ],
        CF: [ 19, 16 ],
        DH: [ 13 ]
      }

      depthChart = getFullDepthChart()
      expect(depthChart).to.be.a('object')
      expect(depthChart).to.deep.equal(bostonDepthChart)
      done()
    })
  })
})
