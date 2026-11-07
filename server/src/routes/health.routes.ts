
import { Router } from 'express'

const router = Router()



router.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'Sahyadri Tour Company API',
  })
})

export default router
