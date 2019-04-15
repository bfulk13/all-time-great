import axios from 'axios';

export function getTrendingQuestions() {
    let res = axios.get('/api/questions')
    return res.data
   
  }

  export function getPopularProfiles() {
    let res = axios.get('/api/profiles')
    return res.data
  
  }