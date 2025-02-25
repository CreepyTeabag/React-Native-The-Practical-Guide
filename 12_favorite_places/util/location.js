import { API_GEOCODING_KEY } from "./api_geocoding_key";
import { API_KEY } from "./api_key_2";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=maptiler-3d&width=400&height=200&center=lonlat:${lng},${lat}&zoom=15&pitch=11&apiKey=${API_KEY}
`;

  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${API_GEOCODING_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.display_name;

  return address;
}
