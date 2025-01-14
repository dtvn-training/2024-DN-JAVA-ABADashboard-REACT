export const activeUserStats = {
    data: [
        {dateEventOccurred: new Date(), title: 1, value: 0 },
        { dateEventOccurred: new Date(),title: 2, value: 0 },
        { dateEventOccurred: new Date(),title: 3, value: 5 },
        { dateEventOccurred: new Date(),title: 4, value: 10 },
    ],
    header: "Active User Statistics",
    categories: [
        "Date the event occurred",
        "Day N",
        "Number of Active Users"
    ]
}

export const eventStats = {
    data: [
        { dateEventOccurred: new Date(),title: "PAGE_VIEW", value: 25 },
        { dateEventOccurred: new Date(),title: "SCROLL", value: 21 },
        { dateEventOccurred: new Date(),title: "FIRST_VISIT", value: 21 },
        { dateEventOccurred: new Date(),title: "SESSION_START", value: 10 },
    ],
    header: "Event Statistics",
    categories: [
        "Date the event occurred",
        "Event Name",
        "Number of Events"
    ]
}

export const countryStats = {
    data:[
        { dateEventOccurred: new Date(),title: "RU", value: 5 },
        { dateEventOccurred: new Date(),title: "SC", value: 4 },
        { dateEventOccurred: new Date(),title: "VN", value: 2 },
        { dateEventOccurred: new Date(),title: "DE", value: 1 },
    ],
    header: "Statistics of Users from Countries",
    categories: [
        "Date the event occurred",
        "Country",
        "Active Users"
    ]
}

export const referralStats = {
    data: [
        { dateEventOccurred: new Date(),title: "DIRECT", value: 25 },
        { dateEventOccurred: new Date(),title: "REFERRAL", value: 21 },
    ],
    header: "Where Do Your New Users Come From",
    categories: [
        "Date the event occurred",
        "Session Primary Channel Group",
        "Number of Events"
    ]
}
