const express = require('express')
const router = express.Router()

const { generateStatsForAService } = require('../../utils/generate-stats-service')

router.get('/:directorate/:function/:service', (req, res) => {
  const directorate = req.params.directorate
  const _function = req.params.function
  const _service =  req.params.service
  const data = require(`../../data/${directorate}/functions/${_function}/services/${_service}.js`)
  generateStatsForAService(data)
  res.render('pages/service/template.njk', { service: data, current_url: req.url })
})

module.exports = router
