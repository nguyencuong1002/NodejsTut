module.exports = {
    multipleMongooseToObject: (mongooseArr) => {
        return mongooseArr.map(mongoose => mongoose.toObject());
    },

    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose ;
    }
};