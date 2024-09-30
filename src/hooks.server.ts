import { connect } from '$db';

// Connect to MongoDB before starting the server
connect().then((): void => {
  console.log("MongoDB started");
}).catch((e) => {
  console.error("MongoDB failed to start");
  console.error(e);
});
