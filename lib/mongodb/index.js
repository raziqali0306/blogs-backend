const { connect } = require('mongoose');

const connectDB = async () => {
    await connect(process.env.MONGO_URI);
}


module.exports = {
    connectDB
}