import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StudentLoging from "./pages/auth/logingStudent";
import StudentSignup from "./pages/auth/teacher/signupStudents"
import TeacherLoging from "./pages/auth/teacher/teacherLogin"; 
import TeacherSignup from "./pages/auth/teacher/signupTeacher"
import ParentLogin from "./pages/auth/parents/parentLogin";
import ParetnSignup from "./pages/auth/parents/parentSignup";
import ParentEmail from "./pages/auth/parents/parentEmail";
import EmailConfirm from "./pages/auth/parents/parentCofirmCode";
import EConfirm from "./pages/auth/parents/parentForgotPassword";
import ResetPassword from "./pages/auth/parents/parentUpdatePassword";
import Perfomance from "./pages/student/perfomance";
import CreateEvent from "./pages/teacher/createNewEvent"
import CreateGroup from "./pages/teacher/createGroup"





import StudentHome from "./pages/student/home"
import Layout from "./layouts/layout"
import StudentNotification from "./pages/student/notification"
import Sprofile from "./pages/student/profile"
import Message from "./pages/student/message"
import Sgroup from "./pages/student/studentsGroup"
import MedalsPoints from "./pages/student/medalsPoints"
import StudentsEvent from "./pages/student/events"
import SgroupDetetails from "./pages/student/sGroupDetails"
import Event from "./pages/student/eventDetail"

import Tlayout from "./layouts/teacherLayout"
import Teacherprofile from "./pages/teacher/teacherProfile"
import Teachernoti from "./pages/teacher/teacherNotification"
import TeacherMessage from "./pages/teacher/teacherMessager"
import TeacherGroup from "./pages/teacher/teacherGroup"
import Teacherevent from "./pages/teacher/teacherEnvent"
import THome from "./pages/teacher/teacherHome"


import Playout from "./layouts/parentLayout"
import PclubsEvent from "./pages/parents/parentEventClubs"
import Poverview from "./pages/parents/parentOverview"
import PfR from "./pages/parents/parentFrequrst"

import Friends from "./pages/parents/parentFrequrst"
import Pfreinds from "./pages/parents/friend"
import PRequest from "./pages/parents/friendRequest"
import PMessage from "./pages/parents/pMessage"

import AdminLayout from "./layouts/adminLayout"
import AdminLog from './pages/admin/loging';
import AdminDashboard from './pages/admin/dashboard';
import AddTeachers from './pages/admin/addTeacher';
import AddStudent from './pages/admin/adminStudent';
import AddingTeacher from './pages/admin/admintTeachers';
import AddingStudent from './pages/admin/addStudent';

function App() {
  return (
    <Router>
     
      <Routes>
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/" element={<StudentLoging />} />
        <Route path='signupStudent' element={<StudentSignup />}/>
        <Route path="loginTeachers" element={<TeacherLoging />} />
        <Route path='signupTeacher' element={<TeacherSignup />}/>
        <Route path="loginParent" element={<ParentLogin />} />
        <Route path="signupParent" element={<ParetnSignup />} />
        <Route path="parentsEmail" element={<ParentEmail />} />
        <Route path="emailConfirm" element={<EmailConfirm />} />
        <Route path="confirm" element={<EConfirm />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        {/* <Route path="logoBar" element={<LogoBar />} />
        <Route path="sideBar" element={<SideBar />} /> */}
        <Route path ="/" element={<Layout />}>
        <Route path="studentHome" element={<StudentHome />} />
        <Route path="studentNotification" element={<StudentNotification/>} />
        <Route path="studentProfile" element={<Sprofile/>} />
        <Route path="message" element={<Message />} />
        <Route path="studentGroup" element={<Sgroup />} />
        <Route path="meadlPoints" element={<MedalsPoints />}/>
        <Route path="studentsEvent" element={<StudentsEvent />}/>
        <Route path="stduentGDetails" element={<SgroupDetetails/>} />
        <Route path="sEvent" element={<Event />}/>
        
      </Route>
      <Route path ="/" element={<Tlayout />}>
      <Route path="teacherProfile" element={<Teacherprofile />} />
      <Route path="teacherNotification" element={<Teachernoti />} />
      <Route  path="teacherMessage" element={<TeacherMessage />} />
      <Route path="teacherGroup" element={<TeacherGroup />} />
      <Route path="teacherEvent" element={<Teacherevent />} />
      <Route path="createEvent" element={<CreateEvent />}/>
      <Route path="createGroup" element={<CreateGroup />}/> 
      <Route path='tHome' element={<THome />} />
      

      </Route>
        <Route path="perfomance" element={<performance />} />

        <Route path ="/" element={<Playout />}>
        
        <Route path="pEventsClubs" element={<PclubsEvent />}/>
        <Route path="pOverview" element={<Poverview />}/>
        <Route path="pFriendRequest" element={<PfR />} />
        <Route path="pMessage" element={<PMessage />}/>


      </Route>

      
        <Route path="/" element={<AdminLayout />}> 
        <Route path="/adminlog" element={<AdminLog/>}/>
        <Route path='/adminDahsboard' element={<AdminDashboard/>}/>
        <Route path='/addTeacher' element={<AddTeachers />}/>
        <Route path='/addStudent' element={<AddStudent/>}/>
        <Route path='/addingTeachers' element={<AddingTeacher />}/>
        <Route path='/addingStudnet' element={<AddingStudent/>}/>
       
      </Route>
      {/* <Route>
      <Route path="/" element={<Friends />}/>
      <Route path="pFrend" element={<Pfreinds/>}/>
      </Route> */}

        <Route path="/pFrend" element={<Pfreinds />} />
        <Route path="/pReuest" element={<PRequest />}/>
        <Route path="adminLog" element={<AdminLog />}/>
       
      </Routes>
    </Router>
  );
}

export default App;
