import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useQuery } from 'react-query';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';

const UserTable = () => {

    const { data: User = [], refetch: getUser } = useQuery('users', async () => {
        const response = await axios.get("http://192.168.1.2:1818/user");
        return response.data.res;
    });

    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [userEdit, setUserEdit] = useState(null);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.1.2:1818/user/${id}`);
            getUser();
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: "User Name",
            selector: (row) => row?.name,
            sortable: true,
        },
        {
            name: "User Email",
            selector: (row) => row?.email,
        },
        {
            name: "User Age",
            selector: (row) => row?.age,
        },
        {
            name: "User Mobile Number",
            selector: (row) => row?.mobile,
        },
        {
            name: "User Qualification",
            selector: (row) =>
                <div className='d-flex'>
                    <p>{row?.qualification?.degree?.name}</p>
                    <p className='ms-2'>{row?.qualification?.course?.name}</p>
                </div>
            ,
        },
        {
            name: "User Role",
            selector: (row) => row?.role?.name,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className='d-flex align-items-center '>
                    {/* edit button ----------------------------*/}
                    <Button color='primary' onClick={() => {
                        setUserEdit(row)
                        setModalEdit(true)
                    }
                    }><FaUserEdit /></Button>
                    {/* delete button-------------------------- */}
                    <Button color='danger' className='ms-2' onClick={() => handleDelete(row?._id)}><MdDeleteForever /></Button>
                </div >
            )
        }

    ];

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <div className='clearfix'>
                <div className='d-flex'>
                    <h4>User Table</h4>
                    <div className='float-end'>
                        <Button className="ms-3" color="danger" onClick={toggle}>
                            Create User
                        </Button>
                    </div>
                </div>
            </div>
            <DataTable
                title="User List"
                columns={columns}
                data={User}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
            />
            <UserAdd modal={modal} toggle={toggle} getUser={getUser} />
            <UserEdit modalEdit={modalEdit} toggleEdit={toggleEdit} getUser={getUser} getUpdates={userEdit} />
        </div >
    )
}

export default UserTable;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from 'reactstrap';
// import DataTable from 'react-data-table-component';
// import { FaUserEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import UserAdd from './UserAdd';
// import UserEdit from './UserEdit';

// const UserTable = () => {

//     const [User, setUser] = useState([]);
//     const [modal, setModal] = useState(false)
//     const [modalEdit, setModalEdit] = useState(false);
//     const [userEdit, setUserEdit] = useState([]);

//     const toggle = () => setModal(!modal);
//     const toggleEdit = () => setModalEdit(!modalEdit)


//     const getUser = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/user");
//             setUser(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//         console.log(User);
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`http://192.168.1.2:1818/user/${id}`);
//             getUser();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const columns = [
//         {
//             name: "User Name",
//             selector: (row) => row?.name,
//             sortable: true,
//         },
//         {
//             name: "User Email",
//             selector: (row) => row?.email,
//         },
//         {
//             name: "User Age",
//             selector: (row) => row?.age,
//         },
//         {
//             name: "User Mobile Number",
//             selector: (row) => row?.mobile,
//         },
//         {
//             name: "User Qualification",
//             selector: (row) =>
//                 <div className='d-flex'>
//                     <p>{row?.qualification?.degree?.name}</p>
//                     <p className='ms-2'>{row?.qualification?.course?.name}</p>
//                 </div>
//             ,
//         },
//         {
//             name: "User Role",
//             selector: (row) => row?.role?.name,
//         },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <div className='d-flex align-items-center '>
//                     {/* edit button ----------------------------*/}
//                     <Button color='primary' onClick={() => {
//                         setUserEdit(row)
//                         setModalEdit(true)
//                     }
//                     }><FaUserEdit /></Button>
//                     {/* delete button-------------------------- */}
//                     <Button color='danger' className='ms-2' onClick={() => handleDelete(row?._id)}><MdDeleteForever /></Button>
//                 </div >
//             )
//         }

//     ];
//     useEffect(() => {
//         getUser();
//     }, [])

//     return (
//         <div>
//             <div className='clearfix'>
//                 <div className='d-flex'>
//                     <h4>User Table</h4>
//                     <div className='float-end'>
//                         <Button className="ms-3" color="danger" onClick={toggle}>
//                             Create User
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <DataTable
//                 title="User List"
//                 columns={columns}
//                 data={User}
//                 pagination
//                 fixedHeader
//                 fixedHeaderScrollHeight="450px"
//                 selectableRows
//                 selectableRowsHighlight
//                 highlightOnHover
//                 subHeader
//             />
//             <UserAdd modal={modal} toggle={toggle} getUser={getUser} />
//             <UserEdit modalEdit={modalEdit} toggleEdit={toggleEdit} getUser={getUser} getUpdates={userEdit} />
//         </div >
//     )
// }

// export default UserTable