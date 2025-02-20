import { API_KEY } from "./api_key";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=maptiler-3d&width=400&height=200&center=lonlat:${lng},${lat}&zoom=15&pitch=11&apiKey=${API_KEY}
`;

  return imagePreviewUrl;
}
