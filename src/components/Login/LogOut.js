import axios from 'axios';

delete axios.defaults.headers.common['Authorization'];
localStorage.removeItem('accessToken');
localStorage.removeItem('refresh-token');
