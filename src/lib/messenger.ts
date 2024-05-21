const API_PREFIX = 'https://graph.facebook.com/v16.0';

const fetchApi = async (
  url: string,
  options: any,
  retries = 3
): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    if (retries === 0) {
      console.log('Failed to fetch API', error);
      return null;
    }
    return fetchApi(url, options, retries - 1);
  }
};

export const sendMessage = async (senderId: string, message: string) => {
  const response = await fetchApi(
    `${API_PREFIX}/me/messages?access_token=${process.env.MESSENGER_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: {
          id: senderId,
        },
        message: {
          text: message,
        },
      }),
    }
  );
  return response;
};

export const sendImage = async (senderId: string, url: string) => {
  const response = await fetchApi(
    `${API_PREFIX}/me/messages?access_token=${process.env.MESSENGER_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: {
          id: senderId,
        },
        message: {
          attachment: {
            type: 'image',
            payload: {
              url,
              is_reusable: true,
            },
          },
        },
      }),
    }
  );
  return response;
};

export const sendQuickReply = async (
  senderId: string,
  message: string,
  quickReplies: any[]
) => {
  const response = await fetchApi(
    `${API_PREFIX}/me/messages?access_token=${process.env.MESSENGER_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: {
          id: senderId,
        },
        message: {
          text: message,
          quick_replies: quickReplies,
        },
      }),
    }
  );
  return response;
};

export const sendButtons = async (
  senderId: string,
  message: string,
  buttons: any[]
) => {
  const response = await fetchApi(
    `${API_PREFIX}/me/messages?access_token=${process.env.MESSENGER_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: {
          id: senderId,
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: message,
              buttons: buttons,
            },
          },
        },
      }),
    }
  );
  return response;
};
