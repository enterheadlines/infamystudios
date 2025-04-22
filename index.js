
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es,fr,de,zh-CN,ja,ru,it,pt,nl,ko,ar,hi,sv,da,fi,pl,th,cs,ro,hu,tr,vi,he,id,ms,ta,ml,tl,el,uk,sk,bg,hr,sl,lt,lv,et,af,sw,sw-KE,sw-TZ,zu,xh,st,tn,so,am,ne,pa,gu,te,kn,ml,or,si,km,lo,mi,cy,ga,yi,ku,hy,ka,be,tk,tk-TM,pl,iw,eo,ky,ba,nep,fil,la,sq,gl,be,sc,ht,eu,bs,hsb,cy,km,mr,sr,hy,hi,uz,tk,lo,la,zh-TW,lao,oc,bn,te,or,mn,my,si,lao,pa,ps,gl,be,bs,ht,hy,km,ur,zu,xh,tl,sw,af,eo,eo-CL,qu',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
    // this will call save and apply after the google widget is loaded.
    waitForGoogleTranslateWidget();
}


// Load Google Translate script dynamically
(function() {
    var gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
})();

// Save selected language in localStorage
function saveSelectedLanguage() {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.addEventListener('change', function() {
            const selectedLanguage = select.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
        });
    }
}

// Apply saved language on page load
function applySavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = savedLanguage;
            select.dispatchEvent(new Event('change')); // Trigger translation
        }
    }
}

// Wait for the Google Translate widget to load using MutationObserver
function waitForGoogleTranslateWidget() {
    const targetNode = document.body; // Observe changes in the body
    const config = { childList: true, subtree: true }; // Observe added/removed child nodes

    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if the Google Translate widget is present
                if (document.querySelector('.goog-te-combo')) {
                    // Widget is loaded, run our functions
                    saveSelectedLanguage();
                    applySavedLanguage();
                    observer.disconnect(); // Stop observing changes
                    return;
                }
            }
        }
    });
    observer.observe(targetNode, config); // Start observing changes
}
