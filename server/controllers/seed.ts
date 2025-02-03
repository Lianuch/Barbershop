import { NextFunction, Request, Response } from "express";
import { Favor } from "../models/favors";
import { Client } from "../models/client";
import { FavorTranslations } from "../models/favorTranslations";
import Barber from "../models/barbers";
import BarberCategory from "../models/barberCategory";
import {barberCategoryFavor} from "../models/barberCategoryFavor";
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
      { email: "john@example.com", password: "password123", emailConfirmed: true },
      { email: "jane@example.com", password: "password456", emailConfirmed: true }
    ]);

    // Create Favors
    const favors = await Favor.insertMany([
      { time: "30min", price: 20, BarberCategoryFavor: [], visits: [] },
      { time: "45min", price: 30, BarberCategoryFavor: [], visits: [] }
    ]);

    // Create Favor Translations
    const favorTranslations = await FavorTranslations.insertMany([
      { language: "en", name: "Haircut", favor: favors[0]._id },
      { language: "ua", name: "Стрижка", favor: favors[0]._id },
      { language: "en", name: "Beard Trim", favor: favors[1]._id },
      { language: "ua", name: "Гоління бороди", favor: favors[1]._id }
    ]);

    // Create Barber Categories
    const barberCategories = await BarberCategory.insertMany([
      { categoryName: "Men's Haircut", barbers: [], categoryFavor: [] },
      { categoryName: "Beard Styling", barbers: [], categoryFavor: [] }
    ]);

    // Create BarberCategoryFavor
    const categoryFavors = await barberCategoryFavor.insertMany([
      { barberCategory: barberCategories[0]._id, favor: favors[0]._id },
      { barberCategory: barberCategories[1]._id, favor: favors[1]._id }
    ]);

    // Create Barbers
    const barbers = await Barber.insertMany([
      {
        image: "https://example.com/barber1.jpg",
        barberCategory: barberCategories[0]._id,
        translation: [],
        visits: []
      },
      {
        image: "https://example.com/barber2.jpg",
        barberCategory: barberCategories[1]._id,
        translation: [],
        visits: []
      }
    ]);

    // Create Barber Translations
    const barberTranslations = await BarberTranslation.insertMany([
      { language: "en", name: "Alex", surname: "Johnson", barber: barbers[0]._id },
      { language: "ua", name: "Олексій", surname: "Джонсон", barber: barbers[0]._id },
      { language: "en", name: "Michael", surname: "Brown", barber: barbers[1]._id },
      { language: "ua", name: "Михайло", surname: "Браун", barber: barbers[1]._id }
    ]);

    // Create Visits
    const visits = await Visit.insertMany([
      {
        date: new Date(),
        comment: "Great haircut!",
        barber: barbers[0]._id,
        client: clients[0]._id,
        favor: favors[0]._id
      },
      {
        date: new Date(),
        comment: "Loved the beard trim!",
        barber: barbers[1]._id,
        client: clients[1]._id,
        favor: favors[1]._id
      }
    ]);

    // Update Barber with visits
    await Barber.updateOne({ _id: barbers[0]._id }, { $push: { visits: visits[0]._id } });
    await Barber.updateOne({ _id: barbers[1]._id }, { $push: { visits: visits[1]._id } });

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Error seeding database" });
  }
};


export default seedData;