import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import teacherService from "../../services/teacher.service";
import adminService from "../../services/admin.service";

function AddTeachers() {
   const[teachers,setTeachers]=useState([]);
    const navigate = useNavigate();

      const levelMap = {
        1: "Primary Teacher",
        2: "Secondary Teachers (grade6-11)",
        3: "Advance level Teacher",
      };

    useEffect(() =>{
    const fetchStudents = async () =>{
      try {
        const fetchTeachers = await adminService.getAllTeachers();

        const fetchUploadedTeachers = fetchTeachers.map((teacher) =>({
          fullName:teacher.fullName,
          username:teacher.username,
          level:levelMap[teacher.level],
          subject:teacher.subject,
          email:teacher.email,
          gender:teacher.gender
        }));
        setTeachers(fetchUploadedTeachers);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchStudents();
  },[]);
    const handleAddTeacher = () => {
        navigate("/addingTeachers"); // Make sure this route exists in your Router
    };
    return (
        <div>
             <div className=" flex justify-end  mb-6">
                <button
                    className="btn btn-primary btn-sm"
                    style={{
                        backgroundColor: "#2D88D4",
                        borderColor: "#2D88D4",
                        color: "white",
                        width: 100
                    }}
                    onClick={handleAddTeacher}
                >
                    Add Teachers
                </button>
            </div>
            <div className="mb-2">
                            <input
                                type="text"
                                id="search"
                                placeholder="search"
                                className=" mt-4 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 w-75"
                            />
                        </div>
          <div className="teachersList mt-4">
          <table class="table">
            {/* Table start here */}
  <thead>
    <tr>
    <th scope="col">Id</th>
      <th scope="col">FullName</th>
       <th scope="col">Username</th>
      <th scope="col">Class</th>
      <th scope="col">Email</th>
      <th scope="col">Gender</th>
    </tr>
  </thead>
  <tbody>
     {teachers.map((student, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{student.fullName}</td>
      <td>{student.username}</td>
      <td>{student.level || "N/A"}</td>
      <td>{student.email || "N/A"}</td>
      <td>{student.gender || "N/A"}</td>
    </tr>
  ))}
   
  </tbody>
</table>
          </div>
        </div>
    )
}

export default AddTeachers;