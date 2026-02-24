import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

if(!process.env.ARCJECT_KEY && process.env.NODE_ENG !== 'test'){
    throw new Error("The ARCJECT_KEY is required");
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