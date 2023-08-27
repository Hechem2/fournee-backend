const Stock = require("../models/stock");


const createStock = async (req, res) => {
    try {
        console.log(req.body);
        const stock = new Stock(req.body);

        const {name} = req.body;
        const exist = await Stock.findOne({name});

        if (exist) res.status(400).send({error: "Stock already exists"});
        const newStock = await stock.save();
        return res.status(201).json(newStock);
        
    } catch (error) {
        console.log (error)
    }
};


const getStocks = async (req, res) => {

    try{
        const stocksList = await Stock.find();

        res.json(stocksList);
    } catch (error) {
        console.log("Error :", error);
    }

}


const getStock = async (req, res) => {

    try {
        const stockId = req.params.id;
        const stock = await Stock.findById(stockId);

        res.json(stock);
    } catch (error) {
        console.log("Error : ", error);
    }
}


const deleteStock = async (req, res) => {

    try {
        const stockId = req.params.id;
        const check_stock = await Stock.findById(stockId);

        check_stock ? await check_stock.deleteOne() : res.status(400).json({
            msg: "Stock not found"
        })
        returnres.status(201).json(
            {
                msg: "Stock successfully removed",
                stock: check_stock
            }
        );
    } catch (error) {
        console.log("Error : ", error);
    }
}


const updateStock = async (req,res) => {
    try {
        const stockId = req.params.id;
        const updateStockInfo = res.body;

        const stock = await Stock.findById(stockId);

        if (!stock) {
            return res.status(400).json({ msg: "Stock not found" })
        }
        await stock.updateOne(updateStockInfo);

        const updatedStock = await Stock.findById(stockId);

        return res.status(201).json({
            msg: "Stock successfully updated",
            Stock: updatedStock
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


module.exports = {
    createStock,
    getStocks,
    getStock,
    deleteStock,
    updateStock,
}