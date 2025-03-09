import { NextFunction, Request, Response } from "express";
import { Favor } from "../models/favors";
import { Client } from "../models/client";
import { FavorTranslations } from "../models/favorTranslations";
import Barber from "../models/barbers";
import BarberCategory from "../models/barberCategory";
import { barberCategoryFavor } from "../models/barberCategoryFavor";
import { BarberTranslation } from "../models/barberTranslations";
import Visit from "../models/visit";

const seedData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear all collections before seeding
    await BarberCategory.deleteMany({});
    await barberCategoryFavor.deleteMany({});
    await Barber.deleteMany({});
    await BarberTranslation.deleteMany({});
    await Client.deleteMany({});
    await Favor.deleteMany({});
    await FavorTranslations.deleteMany({});
    await Visit.deleteMany({});

    console.log("Existing data deleted...");

    // Create Clients
    const clients = await Client.insertMany([
      {
        email: "john@example.com",
        password: "password123",
        emailConfirmed: false,
      },
      {
        email: "jane@example.com",
        password: "password456",
        emailConfirmed: false,
      },
    ]);

    // Create Favors
    const favors = await Favor.insertMany([
      { time: "60min", price: 400, BarberCategoryFavor: [], visits: [] },
      { time: "120min", price: 700, BarberCategoryFavor: [], visits: [] },
    ]);

    // Create Favor Translations
    const favorTranslations = await FavorTranslations.insertMany([
      { language: "en", name: "Haircut", favor: favors[0]._id },
      { language: "ua", name: "Стрижка", favor: favors[0]._id },
      { language: "en", name: "Beard Trim", favor: favors[1]._id },
      { language: "ua", name: "Гоління бороди", favor: favors[1]._id },
    ]);

    // Create Barber Categories
    const barberCategories = await BarberCategory.insertMany([
      { categoryName: "Barber", barbers: [], categoryFavor: [] },
      { categoryName: "Top Barber", barbers: [], categoryFavor: [] },
    ]);

    // Create BarberCategoryFavor
    const categoryFavors = await barberCategoryFavor.insertMany([
      { barberCategory: barberCategories[0]._id, favor: favors[0]._id },
      { barberCategory: barberCategories[1]._id, favor: favors[1]._id },
    ]);

    // Create Barbers
    const barbers = await Barber.insertMany([
      {
        image:
          "https://res.cloudinary.com/dwhkxgtpg/image/upload/v1738761144/polishuk_rf8eg8.jpg",
        barberCategory: barberCategories[0]._id,
        translation: ["67a371b1fc258232487dca5d","67a371b1fc258232487dca5e"],
        visits: [],
      },
      {
        image:
          "https://res.cloudinary.com/dwhkxgtpg/image/upload/v1738761151/skoryk_kg0nsh.jpg",
        barberCategory: barberCategories[1]._id,
        translation: ["67a371b1fc258232487dca5f","67a371b1fc258232487dca60"],
        visits: [],
      },
    ]);

    // Create Barber Translations
    const barberTranslations = await BarberTranslation.insertMany([
      {
        language: "en",
        name: "Vladyslav",
        surname: "Tomkov",
        barber: barbers[0]._id,
      },
      {
        language: "ua",
        name: "Владислав",
        surname: "Томков",
        barber: barbers[0]._id,
      },
      {
        language: "en",
        name: "Nazar",
        surname: "Ozorovich",
        barber: barbers[1]._id,
      },
      {
        language: "ua",
        name: "Назар",
        surname: "Озорович",
        barber: barbers[1]._id,
      },
    ]);

    // Create Visits
    const visits = await Visit.insertMany([
      {
        date: new Date(),
        comment: "Great haircut!",
        barber: barbers[0]._id,
        client: clients[0]._id,
        favor: favors[0]._id,
      },
      {
        date: new Date(),
        comment: "Loved the beard trim!",
        barber: barbers[1]._id,
        client: clients[1]._id,
        favor: favors[1]._id,
      },
    ]);

    // Update Barber with visits
    await Barber.updateOne(
      { _id: barbers[0]._id },
      { $push: { visits: visits[0]._id } }
    );
    await Barber.updateOne(
      { _id: barbers[1]._id },
      { $push: { visits: visits[1]._id } }
    );

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Error seeding database" });
  }
};

export default seedData;
