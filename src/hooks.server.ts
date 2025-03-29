import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  // request.headers.set('Authorization', `${event.cookies.get('authtoken')}`);
  request.headers.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5X25hbWUiOiJGaGlsaXBlIENvZWxobyIsImV4cCI6MTc0MzI4NTgwOSwiaWF0IjoxNzQzMjgyMjA5LCJpY29uIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHNnZFZuMzNOM0dCOFg4MGpSM19qQ0FQeGpMSFBqZUtyS0tIY1dPWHZKaE9XbENCOFRtQT1zOTYtYyIsImlkIjoiNzI1N2ZjZmEtMDg5Ni00Y2I2LThjYTItYjkyZjVjYzkzMTk2In0.dNYEJxi8epxZEUXsjMLsSfYJnkj0tqKkxnkDfTsH8LY');
  if (request.method !== 'GET') {
    request.headers.set('content-type', 'application/json');
  }
  return fetch(request);
}
