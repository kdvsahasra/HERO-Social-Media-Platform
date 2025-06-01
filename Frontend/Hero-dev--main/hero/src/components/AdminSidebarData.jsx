import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import NotificationIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import ProfileIcon from '@mui/icons-material/Person';

export const AdminSidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/adminDahsboard"
    },
    {
        title: "Teacher",
        icon: <NotificationIcon />,
        link: "/addTeacher"
    },
    {
        title: "Students ",
        icon: <GroupIcon />,
        link: "/addStudent"
    },
    
    {
        title: "Events",
        icon: <ProfileIcon />,  // FIXED: Capitalized
        link: "/"
    },
    {
        title: "Settings",
        icon: <ProfileIcon />,  // FIXED: Capitalized
        link: "/"
    }
];
