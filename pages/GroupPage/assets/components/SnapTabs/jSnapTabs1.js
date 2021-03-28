// jSnapTabs1.js 

// Web Tabs (snap tabs) scripts
// https://web.dev/building-a-tabs-component/

// Import function removed as contents of below link copied into scroll-timeline.js.
//import 'https://argyleink.github.io/scroll-timeline/dist/scroll-timeline.js'

console.log("jSnapTabs1.js loaded");

const { matches: motionOK } = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
)

// Grab and stash elements
const tabgroup = document.querySelector('snap-tabs')
const tabsection = tabgroup.querySelector(':scope > section')
const tabnav = tabgroup.querySelector(':scope nav')
const tabnavitems = tabnav.querySelectorAll(':scope a')
const tabindicator = tabgroup.querySelector(':scope .snap-indicator')

// Shared timeline for .indicator and nav > a colors */
const sectionScrollTimeline = new ScrollTimeline({
    scrollSource: tabsection,
    orientation: 'inline',
    fill: 'both',
})

/*
  For each nav link:
  - Animate color based on the scroll timeline
  - Color is active when its the current index
*/
tabnavitems.forEach(navitem => {
    console.log("SnapTabs1:1 - tabnavitems.forEach(navitem)");
    navitem.animate({
        color: [...tabnavitems].map(item =>
            item === navitem
                ? `var(--text-active-color)`
                : `var(--text-color)`)
    }, {
        duration: 1000,
        fill: 'both',
        timeline: sectionScrollTimeline,
    }
    )
})

if (motionOK) {
    console.log("SnapTabs1:2 - if (motionOK)");
    tabindicator.animate({
        transform: [...tabnavitems].map(({ offsetLeft }) =>
            `translateX(${offsetLeft}px)`),
        width: [...tabnavitems].map(({ offsetWidth }) =>
            `${offsetWidth}px`)
    }, {
        duration: 1000,
        fill: 'both',
        timeline: sectionScrollTimeline,
    }
    )
}

const setActiveTab = tabbtn => {
    tabnav
        .querySelector(':scope a[active]')
        .removeAttribute('active')

    tabbtn.setAttribute('active', '')
    tabbtn.scrollIntoView()
}

const determineActiveTabSection = () => {
    const i = tabsection.scrollLeft / tabsection.clientWidth
    const matchingNavItem = tabnavitems[i]

    matchingNavItem && setActiveTab(matchingNavItem)
}

tabnav.addEventListener('click', e => {
    console.log("SnapTabs1:3 - tabnav.addEventListener('click')");
    if (e.target.nodeName !== "A") return
    setActiveTab(e.target)
})

tabsection.addEventListener('scroll', () => {
    console.log("SnapTabs1:4 - tabsection.addEventListener('scroll')");
    clearTimeout(tabsection.scrollEndTimer)
    tabsection.scrollEndTimer = setTimeout(
        determineActiveTabSection
        , 100)
})

window.onload = () => {
    console.log("SnapTabs1:5 - window.onload");
    if (location.hash)
        tabsection.scrollLeft = document
            .querySelector(location.hash)
            .offsetLeft

    determineActiveTabSection()
}