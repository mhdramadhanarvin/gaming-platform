export const environment = {
  production: true,
  port: 3000,
  host: "0.0.0.0",
  database: {
    host: process.env["DB_HOST"] ?? "localhost",
    port: process.env["DB_USER"],
    username: process.env["DB_USER"] ?? "",
    password: process.env["DB_PASS"] ?? "",
    dbname: process.env["DB_NAME"] ?? "gaming-platform",
  },
};
