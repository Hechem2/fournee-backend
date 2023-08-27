const Setting = require("../models/setting");



const getSetting = async (req, res) => {

    try{
        const settingList = await Setting.find();

        res.json(settingList[0]);
    } catch (error) {
        console.log("Error :", error);
    }

}


const updateSetting = async (req,res) => {
    try {
        const settingId = req.params.id;
        const updateSettingInfo = res.body;

        const setting = await Setting.findById(settingId);

        if (!setting) {
            return res.status(400).json({ msg: "Setting not found" })
        }
        await setting.updateOne(updateSettingInfo);

        const updatedSetting = await Setting.findById(settingId);

        return res.status(201).json({
            msg: "Setting successfully updated",
            Setting: updatedSetting
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}
module.exports = {
    getSetting,
    updateSetting,
}