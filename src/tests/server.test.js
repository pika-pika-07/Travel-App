const request = require('supertest')
import {app,server} from '../server/index';

describe("Test the get method which returns an object which has temperature property ", () => {
    afterAll(() => {
        server.close();
    });
    test("It should response the output of the get method", async () => {
        const response = await request(app).get('/forecast')
        expect(response.status).toBe(200) // check if request was successfull
        expect(response.body).toBeDefined(); 
    
    });
});