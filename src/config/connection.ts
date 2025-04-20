import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/SocialAPI');

export default mongoose.connection;