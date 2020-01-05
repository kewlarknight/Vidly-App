const moment = require("moment");
const request = require("supertest");
const { Rental } = require("../../models/rental");
const { Movie } = require("../../models/movie");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;
  let movie;
  let token;
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({
        customerId,
        movieId
      });
  };

  beforeEach(async () => {
    server = require("../../index");
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: "123456",
      dailyRentalRate: 2,
      genre: { name: "123456" },
      numberInStock: 10
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12467"
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2
      }
    });

    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for movie/customer", async () => {
    await Rental.remove({});
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 400 if return is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if we have valid request", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it("should return date if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rental.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should return rentalFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days");
    await rental.save();

    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase movie stock if input is valid", async () => {
    const res = await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movieInDb.numberInStock + 1);
  });

  it("should rental if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    // expect(res.body).toHaveProperty("dateOut");
    // expect(res.body).toHaveProperty("dateReturned");
    // expect(res.body).toHaveProperty("rentalFee");
    // expect(res.body).toHaveProperty("customer");
    // expect(res.body).toHaveProperty("movie");

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "dateReturned",
        "rentalFee",
        "customer",
        "movie"
      ])
    );
  });
});
