"use client";
import { io } from "socket.io-client";
const socket_url = "http://localhost:8080";
const socket = io(socket_url);
export default socket;
