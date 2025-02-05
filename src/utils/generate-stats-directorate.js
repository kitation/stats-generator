const { getFunctions, getAFunctionsServices, sanitizeRates } = require('./helpers')
const { generateStatsForAService } = require('./generate-stats-service')
const { generateCitizenFacingStats } = require('./generate-stats-citizen')
const { generateStaffFacingStats } = require('./generate-stats-staff')
const { generateSunSettingStats } = require('./generate-stats-sunsetting')
const { generatePlannedComplianceStats } = require('./generate-stats-planned-compliance')
const { generateRisks } = require('../utils/generate-stats-risks')
const {
  generateTrueTotalComplianceRate,
  generateStrategicTotalComplianceRate,
  generateTrueCitizenComplianceRate,
  generateTrueStaffComplianceRate,
  generateStrategicStaffComplianceRate
} = require('./generate-stats-rates')

function generateStatsForADirectorate (data) {
  const functions = getFunctions(data)
  const directorateStats = {
    total_services: 0,
    total_live: 0,
    total_not_live: 0,
    total_live_compliant: 0,
    total_live_non_compliant: 0,

    total_citizen: 0,
    total_live_citizen: 0,
    total_live_compliant_citizen: 0,
    total_live_non_compliant_citizen: 0,
    total_not_live_citizen: 0,

    total_staff: 0,
    total_live_staff: 0,
    total_live_compliant_staff: 0,
    total_live_non_compliant_staff: 0,
    total_not_live_staff: 0,
    total_staff_after_descope: 0,

    high_risk: 0,
    medium_risk: 0,
    low_risk: 0,
    compliant_risk: 0,

    total_sunsetting: 0,
    total_descoped: 0,

    rates: {
      true_citizen: 0,
      true_staff: 0,
      strategic_staff: 0,
      true_total: 0,
      strategic_total: 0
    }
  }
  functions.forEach(_function => {
    const services = getAFunctionsServices(_function)
    services.forEach(service => {
      generateStatsForAService(service)

      directorateStats.total_services += 1

      generateCitizenFacingStats(service, directorateStats)
      generateStaffFacingStats(service, directorateStats)
      generateSunSettingStats(service, directorateStats)
      generatePlannedComplianceStats(service, directorateStats)

      generateRisks(service, directorateStats)
    })
  })
  generateTrueTotalComplianceRate(directorateStats)
  generateStrategicTotalComplianceRate(directorateStats)
  generateTrueCitizenComplianceRate(directorateStats)
  generateTrueStaffComplianceRate(directorateStats)
  generateStrategicStaffComplianceRate(directorateStats)

  sanitizeRates(directorateStats)

  data.stats = directorateStats
  return data
}

module.exports = { generateStatsForADirectorate }
