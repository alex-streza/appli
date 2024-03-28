// let us know we're running
console.log("Background service worker has loaded via Manifest V3.");

// const origin = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://appli-dev.vercel.app";
// const origin = "https://appli-dev.vercel.app";
const origin = "http://localhost:3000";

const LS = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async (key) => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
  removeItems: (keys) => chrome.storage.local.remove(keys),
};

const cleanHTML = (html) => {
  // Define regex patterns
  const patterns = [
    /<!--.*?-->/gs, // Remove comments
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Remove script tags
    /style\s*=\s*(['"])[^'"]*\1/g, // Remove inline styles
    /<div(?:\s[^>]*)?><\/div>/g, // Remove empty divs
    /<([a-z][a-z0-9]*)\s+((?!(href\s*=\s*"[^"]*"))[a-z0-9\-]+(\s*=\s*("[^"]*"|'[^']*'))\s*)*(\/?)>/g, // Remove all attributes from each element
  ];

  // Apply each regex pattern sequentially
  const cleanedHtml = patterns.reduce((accHtml, pattern) => {
    return accHtml.replace(pattern, "");
  }, html);

  return cleanedHtml;
};

// clear, add, and listen to new context menu
const initialiseContextMenus = () => {
  // don't try to duplicate this menu item
  chrome.contextMenus.removeAll();

  // create a menu
  chrome.contextMenus.create({
    title: "Save job",
    id: "create",
    // show the menu over everything
    contexts: ["all"],
    // IMPORTANT: because we are no longer using a
    // persistent background script we will need to
    // add an event listener outside contextMenus.create.
  });

  // handle interactions
  chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            // grab the body HTML
            const html = document.body.innerHTML;
            return html;
          },
        });

        const html = results[0].result;
        const cleanedHtml = cleanHTML(html);
        const apiKey = LS.getItem("apiKey");

        fetch(`${origin}/api/ext/applications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiKey: "c94d8af3-304a-44ed-ba4b-959b766b1000",
            html: cleanedHtml,
            url: tabs[0].url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Job saved!", data);
          })
          .catch((err) => {
            console.error("Error saving job", err);
          });
      },
    );
  });
};

initialiseContextMenus();

// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // log the message
  console.log("Message received!", request);

  // respond to the message
  if (request.cmd === "saveApiKey") {
    LS.setItem("apiKey", request.apiKey);
    sendResponse({ status: "success" });
  } else {
    LS.getItem("apiKey").then((apiKey) => {
      if (request.cmd === "getApiKey") {
        sendResponse({ apiKey });
      }
    });
  }

  return true;
});
