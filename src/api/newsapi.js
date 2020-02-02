

const API_TOKEN = "dbc79cd96eb74a8f8f67687c82174961";

export function getNewsFromApiPage(page){
      const url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2019-08-05&' +
          'sortBy=popularity&' +
          'apiKey='+ API_TOKEN + '&page='+ page
          //https://newsapi.org/v2/everything?q=Apple&from=2019-08-05&sortBy=popularity&apiKey=dbc79cd96eb74a8f8f67687c82174961
          return fetch(url)
                .then((response) => response.json())
}