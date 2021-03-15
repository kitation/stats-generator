const { getFunctions, getAFunctionsServices } = require('./helpers')
const { generateStatsForAService } = require('./generate-stats-service')
const { generateCitizenFacingStats } = require('./generate-stats-citizen')
const { generateStaffFacingStats } = require('./generate-stats-staff')
const { generateSunSettingStats } = require('./generate-stats-sunsetting')
const { generatePlannedComplianceStats } = require('./generate-stats-planned-compliance')
const {
  generateTrueTotalComplianceRate,
  generateStrategicTotalComplianceRate,
  generateTrueCitizenComplianceRate,
  generateTrueStaffComplianceRate,
  generateStrategicStaffComplianceRate
} = require('./generate-stats-rates')

function generateStatsForOverview (data) {
  const overviewStats = {
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
  data.forEach(directorate => {
    const functions = getFunctions(directorate)
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
      const functionStats = {
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
      const services = getAFunctionsServices(_function)
      services.forEach(service => {
        generateStatsForAService(service)

        overviewStats.total_services += 1
        directorateStats.total_services += 1
        functionStats.total_services += 1

        generateCitizenFacingStats(service, functionStats)
        generateStaffFacingStats(service, functionStats)
        generateSunSettingStats(service, functionStats)
        generatePlannedComplianceStats(service, functionStats)

        generateCitizenFacingStats(service, directorateStats)
        generateStaffFacingStats(service, directorateStats)
        generateSunSettingStats(service, directorateStats)
        generatePlannedComplianceStats(service, directorateStats)

        generateCitizenFacingStats(service, overviewStats)
        generateStaffFacingStats(service, overviewStats)
        generateSunSettingStats(service, overviewStats)
        generatePlannedComplianceStats(service, overviewStats)

        _function.stats = functionStats
      })
    })
    generateTrueTotalComplianceRate(directorateStats)
    generateStrategicTotalComplianceRate(directorateStats)
    generateTrueCitizenComplianceRate(directorateStats)
    generateTrueStaffComplianceRate(directorateStats)
    generateStrategicStaffComplianceRate(directorateStats)
    directorate.stats = directorateStats
  })
  generateTrueTotalComplianceRate(overviewStats)
  generateStrategicTotalComplianceRate(overviewStats)
  generateTrueCitizenComplianceRate(overviewStats)
  generateTrueStaffComplianceRate(overviewStats)
  generateStrategicStaffComplianceRate(overviewStats)
  data.stats = overviewStats
}

module.exports = { generateStatsForOverview }
