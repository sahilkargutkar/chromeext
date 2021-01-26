console.log('from background')

chrome.tabs.onActivated.addListener(tab =>{
   chrome.tabs.get(tab.tabId,current_tab_info =>{
       if(/^https:\/\/mail\.google/.test(current_tab_info.url)){

        chrome.tabs.executeScript(null,{file:'./foreground.js'},()=>console.log("i injected"))

       }

       chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'mail.google.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
   })
})
