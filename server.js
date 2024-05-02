import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const port = process.env.PORT // Use port 4001 if PORT environment variable is not set

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
// app.listen(process.env.PORT, () => {
//   console.log(`Server running at port ${process.env.PORT}`);
// });
app.get('/helloworld', (req, res) => {
  res.send('Hello, world!'); // Send "Hello, world!" as the response
});