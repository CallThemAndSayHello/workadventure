import type { BaseTranslation } from "../i18n-types";

const en_US: BaseTranslation = {
    users: "Users",
    userList: {
        disconnected: "Disconnected",
        isHere: "Is on this map",
        inAnotherMap: "In another map",
        in: "In ",
        teleport: "Teleport",
        search: "Just look it up!",
        walkTo: "Walk to",
        teleporting: "Teleporting ...",
        businessCard: "Business Card",
    },
    connecting: "Connection to presence server ...",
    waitingInit: "Waiting for server initialization ...",
    waitingData: "Waiting user data ...",
    search: "Search for user, message, channel, etc.",
    role: {
        admin: "Administrator",
        member: "Member",
        visitor: "Visitor",
    },
    status: {
        online: "Online",
        away: "Away",
        unavailable: "Unavailable",
    },
    logIn: "Log in",
    signIn: "Register or log in to enjoy all the features of the chat !",
    invite: "Invite",
    roomEmpty: "This room is empty, invite a colleague or friend to join you!",
    userOnline: "user online",
    usersOnline: "users online",
    open: "Open",
    me: "Me",
    you: "You",
    ban: {
        title: "Ban",
        content: "Ban user {userName} from the running world. This can be cancelled from the administration.",
        ban: "Ban this user",
    },
    loading: "Loading",
    loadingUsers: "Loading the users ...",
    load: "Load",
    rankUp: "Promote",
    rankDown: "Retrograde",
    reinit: "Re initialize",
    enterText: "Enter a message ...",
    timeLine: {
        title: "Your Timeline",
        open: "Open your time line history!",
        description: "Messages and events history",
        incoming: " join the discussion",
        outcoming: " quit the discussion",
    },
    form: {
        placeholder: "Enter your message...",
        typing: " typing...",
    },
    notification: {
        discussion: "wants to discuss with you",
        message: "sends a message",
        forum: "on the forum",
    },
    see: "See",
    show: "Show",
    less: "less",
    more: "more",
    sendBack: "Send back",
    delete: "Delete",
    messageDeleted: "This message has been deleted by ",
    emoji: {
        icon: "Icon to open or close emoji selected popup",
        search: "Search emojis...",
        categories: {
            recents: "Recent Emojis",
            smileys: "Smileys & Emotion",
            people: "People & Body",
            animals: "Animals & Nature",
            food: "Food & Drink",
            activities: "Activities",
            travel: "Travel & Places",
            objects: "Objects",
            symbols: "Symbols",
            flags: "Flags",
            custom: "Custom",
        },
        notFound: "No emojis found",
    },
    said: "said :",
    reply: "Reply",
    react: "React",
    copy: "Copy",
    copied: "Copied !",
    file: {
        fileContentNoEmbed: "Content unavailable for viewing. Please download it",
        download: "download",
        openCoWebsite: "Open in co-website",
        copy: "copy the link",
        tooBig: "{fileName} is too big {maxFileSize}.",
        notLogged: "You need to be logged in to upload a file.",
    },
    needRefresh: "Your connection has expired, you need to refresh the page to reconnect to the chat.",
    refresh: "Refresh",
    upgrade: "Upgrade",
    upgradeToSeeMore: "Upgrade to see more messages",
    disabled: "This feature is disabled.",
    disabledByAdmin: "This feature is disabled by the administrator.",
};

export default en_US;
