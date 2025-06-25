// import express from 'express';
// import upload from '../../docs/cloudinary.upload';
// import Post from '../../models/Post.model'; // saving image URL

// const router = express.Router();

// router.post('/image', upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file?.path || null; // This is the Cloudinary URL

//     // Optional: save to DB
//     const newPost = await Post.create({
//       content: req.body.content,
//       image: imageUrl,
//     });

//     res.status(201).json({ message: 'Upload successful', imageUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });