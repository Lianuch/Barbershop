import dotenv from "dotenv";
dotenv.config();

// const Port = 5000
// const  Db_Name = "barbershop"

// const DB_URL = `mongodb://mongo:27017/${Db_Name}`;

// export {Port, DB_URL}

export const PORT = process.env.PORT || 5000;
export const DB_URL = process.env.DB_URL ;