const request = require("supertest");
const express = require("express");
const { userRouter } = require("../route/route"); 
const User = require("../models/user");

const app = express();
app.use(express.json());
app.use("/users", userRouter);

// Mock the User model
jest.mock("../models/user");

describe("User Router", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const users = [{ userId: 1, email: "test@test.com", userName: "testuser" }];
      User.find.mockResolvedValue(users);

      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users);
    });

    it("should handle errors", async () => {
      User.find.mockRejectedValue(new Error("Internal Server Error"));

      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(500);
      expect(res.text).toEqual("Internal Server Error");
    });
  });

  describe("POST /users/login", () => {
    it("should create a new user if not exists", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({});

      const res = await request(app)
        .post("/users/login")
        .send({ userId: 1, email: "test@test.com", userName: "testuser" });

      expect(res.statusCode).toEqual(201);
      expect(res.text).toEqual("User created successfully");
    });

    it("should return a message if user already exists", async () => {
      const user = { userId: 1, email: "test@test.com", userName: "testuser" };
      User.findOne.mockResolvedValue(user);

      const res = await request(app)
        .post("/users/login")
        .send({ userId: 1, email: "test@test.com", userName: "testuser" });

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("user already exist");
    });

    it("should handle errors", async () => {
      User.findOne.mockRejectedValue(new Error("Internal Server Error"));

      const res = await request(app)
        .post("/users/login")
        .send({ userId: 1, email: "test@test.com", userName: "testuser" });

      expect(res.statusCode).toEqual(500);
      expect(res.text).toEqual("Internal Server Error");
    });
  });

  describe("DELETE /users", () => {
    it("should delete a user if exists", async () => {
      const user = { userId: 1, email: "test@test.com", userName: "testuser" };
      User.findOneAndDelete.mockResolvedValue(user);

      const res = await request(app).delete("/users").send({ userId: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("User deleted successfully");
    });

    it("should return 404 if user not found", async () => {
      User.findOneAndDelete.mockResolvedValue(null);

      const res = await request(app).delete("/users").send({ userId: 1 });

      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual("User not found");
    });

    it("should handle errors", async () => {
      User.findOneAndDelete.mockRejectedValue(new Error("Internal Server Error"));

      const res = await request(app).delete("/users").send({ userId: 1 });

      expect(res.statusCode).toEqual(500);
      expect(res.text).toEqual("Internal Server Error");
    });
  });
});
