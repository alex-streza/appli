console.log("Content script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.from === "popup" && message.subject === "getSelection") {
		const selection = window.getSelection().toString();
		sendResponse(selection);
	}
});
