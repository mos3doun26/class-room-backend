import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

const isTest = process.env.ARCJET_ENV === 'test' || process.env.NODE_ENV === 'test'
if(!process.env.ARCJET_KEY && !isTest){
    throw new Error("The ARCJET_KEY is required");
 }
 
// This for request rate limiting and bot detection.
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
        mode: 'LIVE',
        interval: '2s',
        max: 5
    })
  ],
});

export default aj