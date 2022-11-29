// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

import { routeUtils } from 'utils'

type Response = {
  message: string
}

const createTicket = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<void> => {
  try {
    const query = req?.query
    const bps = routeUtils.getAsString(query?.bps)
    const b = Buffer.from(
      `${process.env.EOSRATE_GET_STATS_USER}:${process.env.EOSRATE_GET_STATS_PASSWORD}`
    )
    const encoded = b.toString('base64')
    const body = { ratesStatsInput: { bps: JSON.parse(bps) } }
    const fetchedResult = await fetch(process.env.EOSRATE_GET_STATS_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`
      }
    })
    const response = await fetchedResult.json()

    if (fetchedResult?.status === 200) {
      res.status(200).json(response?.getRatesStats?.bpsStats)
    } else {
      res.status(500).json({ message: 'failed to esorate api data' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Interval server error' })
  }
}

export default createTicket
