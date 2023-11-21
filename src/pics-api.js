import axios from 'axios';

const KEY = '40066874-c684fea7be1806c3f735d28e1';
const url = 'https://pixabay.com/api/?';

export default async function fetchPics(request, page) {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/',

      {
        params: {
          q: `${request.split(' ').join('+')}`,
          key: KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 100,
          page: page,
        },
      }
    );
    //console.log(response);
    return response;
  } catch {
    console.error('error');
  }
}

// export async function fetchMorePics(request, page) {
//   try {
//     const response = await axios.get(
//       'https://pixabay.com/api/',

//       {
//         params: {
//           q: `${request.split(' ').join('+')}`,
//           key: KEY,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,
//           per_page: 40,
//           page: page,
//         },
//       }
//     );
//     //console.log(response);
//     return response;
//   } catch {
//     console.error('error');
//   }
// }
