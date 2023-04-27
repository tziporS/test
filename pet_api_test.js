const request = require('supertest');
const expect = require('chai').expect;
let createdPetId;
const petStoreApiUrl = 'https://petstore.swagger.io/v2';
describe('Pet Store API - Pet Endpoint', function () {
  it('should add a new pet to the store', async () => {
    const response = await request(petStoreApiUrl).post('/pet')
      .send({
        "id": 50,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200);
    expect(response.body.name).to.equal('doggie');
    createdPetId = response.body.id;
  });

  it('should retrieve the newly added pet by ID', async () => {
    const response = await request(petStoreApiUrl).get(`/pet/${createdPetId}`)
      .expect(200);
    expect(response.body.name).to.equal('doggie');
  });

  after(async () => {
    // Clean up by deleting the created pet
    await request(petStoreApiUrl).delete(`/pet/${createdPetId}`)
      .expect(200);
  });

  it('should return a 404 status code when a pet is not found', async () => {
    const response = await request(petStoreApiUrl).get('/pet/-28')
      .expect(404);
    expect(response.body.code).to.equal(1);
    expect(response.body.message).to.equal('Pet not found');
  });
});

