import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://jsearch.p.rapidapi.com/search',
  params: {
    query: 'Python developer in Texas, USA',
    page: '1',
    num_pages: '1'
  },
  headers: {
    'X-RapidAPI-Key': '3665b47a22msh5fd52021a36f671p1cfe90jsnc032838920b2',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};


export const fetchData = async (req, res) => {
  try {
    const response = await axios.request(options);
    return res.status(200).json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};
