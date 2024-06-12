export const environment = {
  production: false,
  port: 3000,
  host: "127.0.0.1",
  database: {
    host: process.env["DB_HOST"] ?? "localhost",
    port: process.env["DB_USER"],
    username: process.env["DB_USER"] ?? "",
    password: process.env["DB_PASS"] ?? "",
    dbname: process.env["DB_NAME"] ?? "gaming-platform",
  },
};
