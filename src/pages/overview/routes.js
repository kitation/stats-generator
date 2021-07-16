const express = require('express')
const router = express.Router()

const data = require('../../data/data')
const { generateStatsForOverview } = require('../../utils/generate-stats-overview')

router.get('/', (req, res) => {
  generateStatsForOverview(data)
  res.render('pages/overview/template_new.njk', { overview: data, current_url: req.url })
})

module.exports = router
