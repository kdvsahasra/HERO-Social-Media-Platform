import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import NotificationIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import ProfileIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


export const SidebarData = [
    
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/studentHome"
    },
    {
        title: "Notification",
        icon: <NotificationIcon />,
        link: "/studentNotification"
    },
    {
        title: "Medals & points ",
        icon: <GroupIcon />,
        link: "/meadlPoints"
    },
    {
        title: "Messages",
        icon: <MessageIcon />,  
        link: "/message"
    },
    {
        title: "Groups",
        icon: <GroupIcon />,  
        link: `/studentGroup`
    },
    {
        title: "Events",
        icon: <EventIcon />,  // FIXED: Capitalized
        link: "/studentsEvent"
    },
    {
        title: "My Profile",
        icon: <ProfileIcon />,  // FIXED: Capitalized
        link: "/studentProfile"
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,  // FIXED: Capitalized
        link: "/"
    }
];
