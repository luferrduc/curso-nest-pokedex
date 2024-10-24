
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7
})  