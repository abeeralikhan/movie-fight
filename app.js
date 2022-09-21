// helper function
const fetchData = async () => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "96f77f16",
      s: "avengers",
    },
  });

  console.log(response.data);
};

fetchData();
