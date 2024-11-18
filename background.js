const apiKey = "xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC";  // Replace with your actual NASA API key

// Alarm once a day
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyPicture", { periodInMinutes: 1440 }); // 1440 minutes = 24 hours
});

// Fetches the NASA APOD and sends a notification
async function fetchAPODAndNotify() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Show a notification with the title and an image
    chrome.notifications.create({
      type: "basic",
      iconUrl: data.url,
      title: "NASA Astronomy Picture of the Day",
      message: data.title,
      contextMessage: "Click to view more details",
      requireInteraction: true
    });

    // Open the image in a new tab when the notification is clicked
    chrome.notifications.onClicked.addListener(() => {
      chrome.tabs.create({ url: data.url });
    });
  } catch (error) {
    console.error("Error fetching APOD:", error);
  }
}

// Listen for the daily alarm and show the notification
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyPicture") {
    fetchAPODAndNotify();
  }
});

// Test the notification
// chrome.alarms.create("testNotification", { delayInMinutes: 1 });
