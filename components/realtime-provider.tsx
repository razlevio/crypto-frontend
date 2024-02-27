"use client";

import { useEffect } from "react";
import { revalidateAction } from "@/app/_actions/actions";
import io from "socket.io-client";

/**
 * Sets up a real-time WebSocket connection to a backend service for cryptocurrency rate updates.
 * Utilizes `socket.io-client` for establishing the WebSocket connection.
 *
 * The component listens for a specific event (`cryptoRatesUpdateSignal`) from the server,
 * and triggers a revalidation action when the event is received, indicating that new cryptocurrency rates are available.
 */
export function RealTimeProvider() {
  useEffect(() => {
    console.log("RealTimeProvider mounted");

    // Establish the WebSocket connection with the server
    const socket = io("http://crypto-backend-service", {
      withCredentials: true,
      transports: ["websocket"],
    });

    // Handle connection event
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen for the crypto rates update signal from the server
    socket.on("cryptoRatesUpdateSignal", () => {
      // Revalidate the root path when the server sends a signal to load new rates
      console.log("Received cryptoRatesUpdateSignal");
      revalidateAction();
    });

    // Cleanup function to disconnect the socket when the component will unmount
    return () => {
      console.log("RealTimeProvider will unmount");
      socket.disconnect();
    };
  }, []);

  return null;
}
