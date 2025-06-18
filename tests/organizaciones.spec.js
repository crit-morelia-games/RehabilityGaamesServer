import app from "../src/app";
import request from "supertest";
import { faker } from "@faker-js/faker/locale/es_MX";

const organizacion = {
  organizacion: faker.company.name(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  direccion: faker.location.streetAddress(),
  telefono: "1234567890",
};
console.log(organizacion);

describe("POST /organizacion", () => {
  describe("Given a valid organization", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/organizacion").send(organizacion);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Given a registered organization", () => {
    test("It should respond with a 500 status code", async () => {
      const response = await request(app).post("/api/organizacion").send(organizacion);
      expect(response.statusCode).toBe(500);
    });
  });
});
