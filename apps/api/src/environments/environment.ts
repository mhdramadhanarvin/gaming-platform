export const environment = {
  production: false,
  port: 9000,
  host: '127.0.0.1',
  databaseUrl: process.env['DATABASE_URL'],
  saltRounds: +(process.env['SALT_ROUNDS'] ?? 0),
  secret: process.env['SECRET'],
  cookieSecret: process.env['COOKIE_SECRET'],
  mailgun: {
    options: {
      key: process.env['MAILGUN_PRIVATE_API_KEY'] ?? '',
    },
    transportOptions: {
      host: process.env['MAILER_HOST'] ?? '',
      port: +(process.env['MAILER_PORT'] ?? 0),
      auth: {
        user: process.env['MAILER_USER'] ?? '',
        pass: process.env['MAILER_PASS'] ?? '',
      },
      sender: process.env['MAILER_SENDER'] ?? '',
    },
    domain: process.env['MAILGUN_DOMAIN'] ?? '',
  },
  folder: process.env['UPLOAD_PATH'] ?? '/tmp/',
  mailDomain: process.env['DOMAIN'] ?? '127.0.0.1',
  media: {
    prefix:
      process.env['APP_ENV'] === 'prod'
        ? 'http://0.0.0.0:3001/media/'
        : process.env['MEDIA_URL'] ?? '',
  },
};
