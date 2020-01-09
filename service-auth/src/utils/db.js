import mongoose from 'mongoose';
import options from '../config';

const connect = (url = options.dbUrl, opts = {}) => mongoose.connect(url, {
  ...opts, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
});

export default connect;
