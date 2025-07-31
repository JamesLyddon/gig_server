const {app, gigs} = require('./app.js')
const request = require('supertest')

describe('GET /gigs', () => {
    test('returns list of gigs', async () => {
        const response = await request(app).get('/gigs')
        const formattedResponse = response.body.map(item => ({...item, date: new Date(item.date)}))

        expect(formattedResponse).toEqual(gigs);
        expect(response.status).toBe(200);
    })
});