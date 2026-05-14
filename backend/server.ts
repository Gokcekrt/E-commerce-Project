import app from './app'
import * as os from 'os'


// to use env variables
import './src/common/env';

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port ${PORT}`);
})