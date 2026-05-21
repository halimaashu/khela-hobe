import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("khela-hobe");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
     google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
  },
  session:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      maxAge:7*24
    }

  },
    plugins: [
        jwt(), 
    ]
});