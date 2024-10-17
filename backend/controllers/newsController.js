import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getNews = async (req, res) => {
  try {
    const response = await prisma.news.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(error).json({ msg: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const response = await prisma.news.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(error).json({ msg: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
      const response = await prisma.news.create({
        data: {
          ...req.body,
          images: imageUrl,
        },
      });
      res.status(200).json(response);
    } else {
      res.status(400).json({ msg: 'No image uploaded' });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    // Fetch the existing news data to retain the current image if none is uploaded
    const existingNews = await prisma.news.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!existingNews) {
      return res.status(404).json({ msg: 'News not found' });
    }

    // If a new image is uploaded, update the `images` field, otherwise keep the old one
    let imageUrl = existingNews.images;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
    }

    const updatedNews = await prisma.news.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
        images: imageUrl, // Update images if a new file is uploaded
      },
    });

    res.status(200).json(updatedNews); // Return the updated news item
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const response = await prisma.news.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
