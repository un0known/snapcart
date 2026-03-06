import mongoose, { mongo } from "mongoose";

interface IGrocery{
    _id? : mongoose.Types.ObjectId,
    name: string,
    category: string,
    price: string,
    unit : string,
    image : string,
    createdAt? : Date,
    updateAt? : Date
}

const grocerySchema = new mongoose.Schema<IGrocery>({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Fruits & Vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Snacks & Biscuits",
            "Spices & Masalas",
            "Personal Care",
            "Household Essentials",
            "Instant & Packaged Food",
            "Baby & Pet Care"
        ],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},{timestamps: true})

const Grocery = mongoose.models.Grocery || mongoose.model("Gerocery", grocerySchema)
export default Grocery

