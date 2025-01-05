import { Barber } from "../models/barbersModel";

const getBarbers = async (req, res) => {
  const barbers = await Barber.find();
  res.json(barbers);
};

const addBarber = async (req, res) => {
    const {name, surname} = req.body;
    const newBarber = await Barber.create({name,surname})
    res.json(newBarber);

};

const deleteBarber = async (req, res) => {
    const {id} = req.params;
    const deletedBarber = await Barber.findByIdAndDelete(id);
    res.json(deletedBarber); 
}

export { getBarbers, addBarber, deleteBarber };