🎨 Color Palette Generator API
A free and simple API for generating color palettes based on a base color.

Base URL
arduino
Copy
Edit
https://yourwebsite.com/api/generate-palette
Authentication
No authentication required.
You can start using the API right away.

Endpoints
GET /api/generate-palette
Description
Generates a color palette.
Optionally, pass a base color to customize the palette.

Query Parameters
Name	Type	Required	Description
color	string	No	Base color in hex format. Must be URL-encoded if including #. Defaults to #3b82f6 (Tailwind blue).

Example Request
bash
Copy
Edit
# Default palette
curl "https://yourwebsite.com/api/generate-palette"

# With a base color
curl "https://yourwebsite.com/api/generate-palette?color=%23ff5733"
Example Response
json
Copy
Edit
{
  "palette": [
    "#ff5733",
    "#33ff57",
    "#ffd700",
    "#6a0dad",
    "#a1b2c3"
  ]
}
Response Format
Field	Type	Description
palette	string[]	Array of generated hex colors

Error Handling
If you pass an invalid color code:

json
Copy
Edit
{
  "error": "Invalid color format. Please use hex format like #RRGGBB."
}
Status code: 400 Bad Request

Usage Example (JavaScript)
js
Copy
Edit
async function getPalette(baseColor = "#ff5733") {
  const url = `https://yourwebsite.com/api/generate-palette?color=${encodeURIComponent(baseColor)}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.palette);
}

getPalette();
Rate Limits
No hard rate limit for now (but please be respectful).

License
This API is free to use under the MIT License. Attribution is appreciated but not required.
