export default {
    origin: function (origin, callback) {
      console.log("origin:", origin);
      const allowedOrigins = ['http://localhost:3000', 'http://192.168.29.215:3000'];
      if (allowedOrigins.includes(origin) || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Request blocked, this origin is not allowed by CORS')); 
      }
    }
}