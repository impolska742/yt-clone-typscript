import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

const gracefulShutDown = (signal: string) => {
  process.on(signal, async () => {
    console.log("Goodbye, got signal :", signal);

    server.close();

    // disconnect from the db
    console.log("My work here is done.");

    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  gracefulShutDown(signals[i]);
}
