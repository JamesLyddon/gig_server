const gigs = require('./app.js')

describe('GET /gigs', () => {
    test('returns list of gigs', async () => {
        const response = await fetch('http://localhost:3000/gigs');
        const data = await response.json();
        const formattedData = data.map(item => ({...item, date: new Date(item.date)}))

        expect(formattedData).toEqual(gigs);
        expect(response.status).toBe(200);
    })
});