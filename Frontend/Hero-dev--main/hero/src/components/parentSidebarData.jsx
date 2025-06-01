import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import NotificationIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import ProfileIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


export const PsidebarData = [
    {
        title: "Overview",
        icon: <HomeIcon />,
        link: "/pOverview" 
    },
    {
        title: "Friend and Requests",
        icon: <NotificationIcon />,
        link: "/pFriendRequest"
    },
    {
        title: "Messages",
        icon: <MessageIcon />,  // FIXED: Capitalized
        link: "/pMessage"
    },
    {
        title: "Event and Clubs",
        icon: <GroupIcon />,  // FIXED: Capitalized
        link: "/pEventsClubs"
    },
     {
        title: "Logout",
        icon: <LogoutIcon />,  // FIXED: Capitalized
        link: "/"
    }
];
