export const activeUserStats = {
    data: [
        { title: 1, value: 0 },
        { title: 2, value: 0 },
        { title: 3, value: 5 },
        { title: 4, value: 10 },
    ],
    header: "Active User Statistics",
    categories: [
        "Day N",
        "Number of Active Users"
    ]
}

export const eventStats = {
    data: [
        { title: "PAGE_VIEW", value: 25 },
        { title: "SCROLL", value: 21 },
        { title: "FIRST_VISIT", value: 21 },
        { title: "SESSION_START", value: 10 },
    ],
    header: "Event Statistics",
    categories: [
        "Event Name",
        "Number of Events"
    ]
}

export const countryStats = {
    data:[
        { title: "RU", value: 5 },
        { title: "SC", value: 4 },
        { title: "VN", value: 2 },
        { title: "DE", value: 1 },
    ],
    header: "Statistics of Users from Countries",
    categories: [
        "Country",
        "Active Users"
    ]
}

export const referralStats = {
    data: [
        { title: "DIRECT", value: 25 },
        { title: "REFERRAL", value: 21 },
    ],
    header: "Where Do Your New Users Come From",
    categories: [
        "Session Primary Channel Group",
        "Number of Events"
    ]
}
