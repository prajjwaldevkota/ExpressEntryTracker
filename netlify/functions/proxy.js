/* eslint-disable no-unused-vars */
// netlify/functions/proxy.js
import { get } from "axios";

export async function handler(event, context) {
  try {
    /*  */// Concatenate query parameters if any were passed in
    const queryParams = event.queryStringParameters
      ? Object.entries(event.queryStringParameters)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
      : "";

    const externalUrl = `https://can-ee-draws.onrender.com/api`;

    // Fetch data from the external API
    const apiResponse = await get(externalUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(apiResponse.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  }
}
