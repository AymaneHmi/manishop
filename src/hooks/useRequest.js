const reqURl = import.meta.env.VITE_REQUEST_URL;

export const useRequest = {
  post: async (data, endpoint) => {
    try {
      const response = await fetch(reqURl + endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  get: async (endpoint, queryParams = {}) => {
    try {
      const query = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

      const response = await fetch(reqURl + endpoint + (query ? `?${query}` : ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  delete: async (data, endpoint) => {
    try {
      const response = await fetch(reqURl + endpoint, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
  patch: async (data, endpoint) => {
    try {
      const response = await fetch(reqURl + endpoint, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {error: 'Failed to make request.'}
    }
  },
}
  