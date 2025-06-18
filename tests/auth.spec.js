import app from "../src/app";
import request from "supertest";
import { faker } from "@faker-js/faker/locale/es_MX";

const orgUser = { email: "pruebas@morelia.tecm.mx", password: "olakase123" };
const terUser = { email: "l19121050@morelia.tecnm.mx", password: "olakase123" };

const invalidOrgUser = { email: faker.internet.email(), password: faker.internet.password() };
const invalidTerUser = { email: faker.internet.email(), password: faker.internet.password() };
console.log(invalidOrgUser);
console.log(invalidTerUser);

var orgToken = "";
var terToken = "";

describe("GET /ping", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /pruebaDB", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/pruebaDB");
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with an array of objects", async () => {
    const response = await request(app).get("/api/pruebaDB");
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe("POST /login", () => {
  describe("Given a valid email and password", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/login").send(orgUser);
      expect(response.statusCode).toBe(200);
    });

    test("It should respond with a token", async () => {
      const response = await request(app).post("/api/login").send(orgUser);
      expect(response.body).toHaveProperty("data");
    });

    test("It should respond with a organization token", async () => {
      const response = await request(app).post("/api/login").send(orgUser);
      orgToken = response.body.data;
      expect(response.body.role).toBe("organizacion");
    });

    test("It should respond with a therapist token", async () => {
      const response = await request(app).post("/api/login").send(terUser);
      expect(response.body.role).toBe("terapeuta");
    });
  });

  describe("Given an invalid email and password", () => {
    test("It should respond with a 422 status code", async () => {
      const response = await request(app).post("/api/login").send(invalidOrgUser);
      expect(response.statusCode).toBe(422);
    });

    test("It should respond with an error message", async () => {
      const response = await request(app).post("/api/login").send(invalidOrgUser);
      expect(response.body.error).toBe(true);
    });
  });

  describe("Given both fields empty", () => {
    test("It should respond with a 422 status code", async () => {
      const response = await request(app).post("/api/login").send({});
      expect(response.statusCode).toBe(422);
    });

    test("It should respond with an error message", async () => {
      const response = await request(app).post("/api/login").send({});
      expect(response.body.error).toBe(true);
    });
  });
});

describe("POST /loginT", () => {
  describe("Given a valid email and password", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/loginT").send(terUser);
      expect(response.statusCode).toBe(200);
    });

    test("It should respond with a token", async () => {
      const response = await request(app).post("/api/loginT").send(terUser);
      terToken = response.body.data;
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("Given an invalid email and password", () => {
    test("It should respond with a 422 status code", async () => {
      const response = await request(app).post("/api/loginT").send(invalidTerUser);
      expect(response.statusCode).toBe(422);
    });

    test("It should respond with an error message", async () => {
      const response = await request(app).post("/api/loginT").send(invalidTerUser);
      expect(response.body.error).toBe(true);
    });
  });

  describe("Given both fields empty", () => {
    test("It should respond with a 422 status code", async () => {
      const response = await request(app).post("/api/loginT").send({});
      expect(response.statusCode).toBe(422);
    });

    test("It should respond with an error message", async () => {
      const response = await request(app).post("/api/loginT").send({});
      expect(response.body.error).toBe(true);
    });
  });
})

describe("GET /pruebaToken", () => {
  describe("Given a valid organization token", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/pruebaToken").set("Authorization", `Bearer ${orgToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Given a valid therapist token", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/pruebaToken").set("Authorization", `Bearer ${terToken}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Given an invalid token", () => {
    test("It should respond with a 403 status code", async () => {
      const response = await request(app).get("/api/pruebaToken").set("Authorization", `Bearer ${orgToken}123`);
      expect(response.statusCode).toBe(403);
    });

    test("It should respond with an error message", async () => {
      const response = await request(app).get("/api/pruebaToken").set("Authorization", `Bearer ${terToken}123`);
      expect(response.body.error).toBe(true);
    });
  });

  describe("Given no token", () => {
    test("It should respond with a 401 status code", async () => {
      const response = await request(app).get("/api/pruebaToken");
      expect(response.statusCode).toBe(401);
    });
  });
})