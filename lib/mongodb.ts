import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to mongoDb.');
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
