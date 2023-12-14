const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41244507-707b606fed489ebf977ae697c';

export default async function getGallery(filter, page) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${filter}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.log(error.message);
  }
}