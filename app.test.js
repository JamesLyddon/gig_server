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

describe('DELETE /gigs/:id', () => {
    test('deletes Sigur Rós gig when id is 1', async () => {
        const response = await request(app).delete('/gigs/1')
        const returnedMsg = response.body.message
        const returnedGigs = response.body.gigs
        const formattedGigs = returnedGigs.map(gig => ({...gig, date: new Date(gig.date)}))

        expect(formattedGigs).toEqual(gigs)
        expect(returnedMsg).toEqual("Successfully deleted gig")
        expect(response.status).toBe(200)
    })
    test('deletes Chumbawamba gig when id is 3', async () => {
        const response = await request(app).delete('/gigs/3')
        const returnedMsg = response.body.message
        const returnedGigs = response.body.gigs
        const formattedGigs = returnedGigs.map(gig => ({...gig, date: new Date(gig.date)}))

        expect(formattedGigs).toEqual(gigs)
        expect(returnedMsg).toEqual("Successfully deleted gig")
        expect(response.status).toBe(200)
    })
})

describe('POST /gigs', () => {
    test('add a new gig to the list of gigs', async () => {
        const ACDCpayload = {"gig":{
            name: "AC/DC",
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTn83aQ8zMfk6nMcMm-wTyV8EsJb6RIorfZo10Urp18T4X7f4NsyDAS5HXAWJ98ZunVp-xsckUq8sCf6fB6pebEf3bDk_KOs9zHe_QUc2LC",
            description: "It's AC/DC!",
            date: new Date("November 17, 2025 20:00:00"),
            location: "London, UK"
        }}
        
        const response = await request(app)
            .post('/gigs')
            .send(ACDCpayload)
            .set('Accept', 'application/json')
        
        const formattedGigs = response.body.gigs.map(
            gig => ({...gig, date: new Date(gig.date)})
        )
        
        expect(response.body.message).toEqual("Successfully posted new gig")
        expect(formattedGigs).toEqual(gigs)
        expect(response.body.gigs.length).toBe(2) // Sigur Rós and Chumbawumba deleted by delete tests above
    })
})