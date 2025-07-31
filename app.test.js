const request = require('supertest')
const app = require('./app.js')
const gigs = require('./data/gigsData.js')

describe('GET /gigs', () => {
    test('returns list of gigs', async () => {
        const response = await request(app).get('/gigs')
        const formattedResponse = response.body.map(item => ({...item, date: new Date(item.date)}))

        expect(formattedResponse).toEqual(gigs);
        expect(response.status).toBe(200);
    })
});

describe('GET /gigs/:id', () => {
    test('returns Sigur Rós gig when id is 1', async () => {
        const response = await request(app).get('/gigs/1')
        const formattedResponse = {...response.body, date: new Date(response.body.date)}

        expect(formattedResponse).toEqual(gigs[0])
        expect(response.status).toBe(200)
    })
    test('returns Chumbawamba gig when id is 3', async () => {
        const response = await request(app).get('/gigs/3')
        const formattedResponse = {...response.body, date: new Date(response.body.date)}

        expect(formattedResponse).toEqual(gigs[2])
        expect(response.status).toBe(200)
    })
    test('returns Chumbawamba gig when id is 3', async () => {
        const response = await request(app).get('/gigs/3')
        const formattedResponse = {...response.body, date: new Date(response.body.date)}

        expect(formattedResponse).toEqual(gigs[2])
        expect(response.status).toBe(200)
    })
    test('returns Bad Request 400 error when id is "a"', async () => {
        const response = await request(app).get('/gigs/a')

        expect(response.text).toEqual("Bad Request")
        expect(response.status).toBe(400)
    })
    test('returns Not Found 404 error when id is 5', async () => {
        const response = await request(app).get('/gigs/5')

        expect(response.text).toEqual("Not Found")
        expect(response.status).toBe(404)
    })
})

