const axios = require('axios');

// Post to Facebook/Meta
const postToFacebook = async (content, imageUrl = null) => {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || pageId === 'your-facebook-page-id' || !accessToken || accessToken === 'your-facebook-access-token') {
    console.log('📱 FACEBOOK POST (DEV MODE):');
    console.log(content);
    if (imageUrl) console.log(`Image: ${imageUrl}`);
    console.log('---');
    return { success: true, provider: 'facebook', devMode: true };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    const params = {
      message: content,
      access_token: accessToken
    };

    if (imageUrl) {
      params.link = imageUrl;
    }

    const response = await axios.post(url, null, { params });
    console.log(`Posted to Facebook: ${response.data.id}`);

    return {
      success: true,
      provider: 'facebook',
      postId: response.data.id,
      devMode: false
    };
  } catch (error) {
    console.error('Facebook post error:', error.response?.data || error.message);
    throw new Error(`Facebook posting failed: ${error.response?.data?.error?.message || error.message}`);
  }
};

// Post to LinkedIn
const postToLinkedIn = async (content, imageUrl = null) => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORG_ID;

  if (!accessToken || accessToken === 'your-linkedin-access-token') {
    console.log('💼 LINKEDIN POST (DEV MODE):');
    console.log(content);
    if (imageUrl) console.log(`Image: ${imageUrl}`);
    console.log('---');
    return { success: true, provider: 'linkedin', devMode: true };
  }

  try {
    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const data = {
      author: `urn:li:organization:${orgId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    console.log(`Posted to LinkedIn: ${response.data.id}`);

    return {
      success: true,
      provider: 'linkedin',
      postId: response.data.id,
      devMode: false
    };
  } catch (error) {
    console.error('LinkedIn post error:', error.response?.data || error.message);
    throw new Error(`LinkedIn posting failed: ${error.response?.data?.message || error.message}`);
  }
};

// Post to Twitter/X
const postToTwitter = async (content) => {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!apiKey || apiKey === 'your-twitter-api-key') {
    console.log('🐦 TWITTER POST (DEV MODE):');
    console.log(content);
    console.log('---');
    return { success: true, provider: 'twitter', devMode: true };
  }

  // Twitter API v2 posting would go here
  // This is a simplified version - full implementation would require OAuth 1.0a

  console.log('Twitter posting requires OAuth 1.0a setup. Using dev mode.');
  console.log('🐦 TWITTER POST (DEV MODE):');
  console.log(content);
  console.log('---');

  return { success: true, provider: 'twitter', devMode: true };
};

// Main function to post to social media based on platform
const postToSocialMedia = async (platform, content, imageUrl = null) => {
  switch (platform?.toUpperCase()) {
    case 'FACEBOOK':
      return await postToFacebook(content, imageUrl);

    case 'LINKEDIN':
      return await postToLinkedIn(content, imageUrl);

    case 'TWITTER':
    case 'X':
      return await postToTwitter(content);

    case 'INSTAGRAM':
      // Instagram posting requires Facebook Graph API and is more complex
      console.log('📸 INSTAGRAM POST (DEV MODE):');
      console.log(content);
      if (imageUrl) console.log(`Image: ${imageUrl}`);
      console.log('---');
      return { success: true, provider: 'instagram', devMode: true };

    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};

// Execute social media campaign
const executeSocialMediaCampaign = async (campaign) => {
  try {
    const result = await postToSocialMedia(
      campaign.socialPlatform,
      campaign.socialContent
    );

    return {
      success: true,
      platform: campaign.socialPlatform,
      result
    };
  } catch (error) {
    console.error(`Social media campaign error:`, error);
    throw error;
  }
};

module.exports = {
  postToSocialMedia,
  postToFacebook,
  postToLinkedIn,
  postToTwitter,
  executeSocialMediaCampaign
};
