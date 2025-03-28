import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
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
    // 🗑 Clear all collections before seeding
    await Promise.all([
      BarberCategory.deleteMany({}),
      barberCategoryFavor.deleteMany({}),
      Barber.deleteMany({}),
      BarberTranslation.deleteMany({}),
      Favor.deleteMany({}),
      FavorTranslations.deleteMany({}),
      Visit.deleteMany({}),
    ]);
    console.log("🗑 Existing data deleted...");

    // 🧑 Create Clients
    const client = await Client.create({
      name: "Kilian",
      email: "nyznyk288@gmail.com",
      password: "123456",
      isActivated: false,
      visits: [],
    });

    // ✂️ Create Favors
    const favors = await Favor.create([
      {
        time: "60min",
        price: 400,
        translations: [],
        BarberCategoryFavor: [],
        visits: [],
      },
      {
        time: "120min",
        price: 700,
        translations: [],
        BarberCategoryFavor: [],
        visits: [],
      },
    ]);

    // 🌎 Create Favor Translations
    const favorTranslations = await FavorTranslations.create([
      { language: "en", name: "Haircut", favor: favors[0]._id },
      { language: "ua", name: "Стрижка", favor: favors[0]._id },
      { language: "en", name: "Beard Trim", favor: favors[1]._id },
      { language: "ua", name: "Гоління бороди", favor: favors[1]._id },
    ]);

    // ✂️ Update Favors with Translations
    await Promise.all([
      Favor.updateOne(
        { _id: favors[0]._id },
        {
          $push: {
            translations: [favorTranslations[0]._id, favorTranslations[1]._id],
          },
        }
      ),
      Favor.updateOne(
        { _id: favors[1]._id },
        {
          $push: {
            translations: [favorTranslations[2]._id, favorTranslations[3]._id],
          },
        }
      ),
    ]);

    // 🏆 Create Barber Categories
    const barberCategories = await BarberCategory.insertMany([
      { categoryName: "Barber", barbers: [], categoryFavor: [] },
      { categoryName: "Top Barber", barbers: [], categoryFavor: [] },
      { categoryName: "Prime Barber", barbers: [], categoryFavor: [] },
    ]);

    // 🔗 Create BarberCategoryFavor
    await barberCategoryFavor.insertMany([
      { barberCategory: barberCategories[0]._id, favor: favors[0]._id },
      { barberCategory: barberCategories[1]._id, favor: favors[1]._id },
    ]);

    // ✂️ Create Barbers
    const barbers = await Barber.insertMany([
      {
        image:
          "https://res.cloudinary.com/dwhkxgtpg/image/upload/v1738761144/polishuk_rf8eg8.jpg",
        barberCategory: barberCategories[0]._id,
        translation: [],
        visits: [],
        coef: 1.0,
      },
      {
        image:
          "https://res.cloudinary.com/dwhkxgtpg/image/upload/v1738778967/tkachuk_lg8m1e.jpg",
        barberCategory: barberCategories[1]._id,
        translation: [],
        visits: [],
        coef: 1.125,
      },
      {
        image:"https://res.cloudinary.com/dwhkxgtpg/image/upload/v1738778971/kojan-240x240_kqlmuy.jpg"
        ,barberCategory: barberCategories[2]._id,
        translation: [],
        visits: [],
        coef: 1.25,
      }
    ]);

    const foundB = await Barber.find();
    console.log(foundB);
    

    // 📝 Create Barber Translations
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
      {
        language: "en",
        name: "Serhii",
        surname: "Bondarenko",
        barber: barbers[2]._id,
      },
      {
        language: "ua",
        name: "Сергій",
        surname: "Бондаренко",
        barber: barbers[2]._id,
      }
    ]);

    // Link translations to barbers
    await Promise.all([
      Barber.updateOne(
        { _id: barbers[0]._id },
        {
          $set: {
            translation: barberTranslations.slice(0, 2).map((t) => t._id),
          },
        }
      ),
      Barber.updateOne(
        { _id: barbers[1]._id },
        {
          $set: {
            translation: barberTranslations.slice(2, 4).map((t) => t._id),
          },
        }
      ),
      Barber.updateOne(
        { _id: barbers[2]._id }, 
        {
          $set: {
            translation: barberTranslations.slice(4, 6).map((t) => t._id),
          },
        }
      ),
    ]);
    

    // ⏳ Create Visits
    const [visit] = await Visit.insertMany([
      {
        date: new Date(),
        comment: "Great haircut!",
        barber: barbers[0]._id,
        client: client._id,
        favor: favors[0]._id,
      },
    ]);

    // Update Barber and Client with Visit
    await Promise.all([
      Barber.updateOne(
        { _id: barbers[0]._id },
        { $push: { visits: visit[0]._id } }
      ),
      Barber.updateOne(
        { _id: barbers[1]._id },
        { $push: { visits: visit[1]._id } }
      ),
      Client.updateOne({ _id: client._id }, { $push: { visits: visit._id } }),
      Favor.updateOne(
        { _id: favors[0]._id },
        { $set: { visits: [visit._id] } }
      ),
      Favor.updateOne(
        { _id: favors[1]._id },
        { $set: { visits: [visit._id] } }
      ),
    ]);

    res.status(200).json({ message: "✅ Database seeded successfully!" });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    res.status(500).json({ error: "Error seeding database" });
  }
};

export default seedData;
