import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { TbBrandAppgallery } from "react-icons/tb";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const MaterialDetails = () => {
    const { id } = useParams();
    const [selectedRow, setSelectedRow] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data for ID:', id);
                const response = await axios.get(`https://devapi.getstartbuild.com/auth/materialRequest/${id}`);
                console.log('API response:', response);
                setSelectedRow(response.data.result);
            } catch (err) {
                setError('Error fetching the data: ' + err.message);
                console.error('Error fetching the data', err);
            }
        };

        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (error) return <div>{error}</div>;
    if (!selectedRow) return 'Loading...';

    return (
        <>
            <div>
                <div className='p-5'>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-danger'>{selectedRow?.project.name}</h1>
                    </div>
                    <div className='d-Block mt-4'>
                        <div className='d-lg-flex'>
                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-primary ms-2 mt-2'>
                                <div>
                                    <h3 className='d-flex flex-column align-items-center'>Site Location</h3>
                                    <div className='d-flex ms-5 mt-2'>
                                        <h5><FaLocationDot /></h5>
                                        <div className='ms-2'>
                                            <p>{selectedRow?.project.location.officeName}</p>
                                            <p>{selectedRow?.project.location.district} - {selectedRow?.project.location.pincode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-warning ms-2 mt-2'>
                                <div>
                                    <h3 className='d-flex flex-column align-items-center'>Site Supervisor</h3>
                                    <div className='d-flex ms-4 mt-2'>
                                        <div className='ms-2'>
                                            <div className='d-flex'>
                                                <h5><MdOutlineSupervisorAccount /></h5>
                                                <p className='ms-2'>{selectedRow?.siteSupervisor.name}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <h5><IoIosMail /></h5>
                                                <p className='ms-2'>{selectedRow?.siteSupervisor.email}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <h5><FaMobileAlt /></h5>
                                                <p className='ms-2'>{selectedRow?.siteSupervisor.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-success ms-2 mt-2'>
                                <div>
                                    <h3 className='d-flex flex-column align-items-center'>Purchase Manager</h3>
                                    <div className='d-fle ms-4 mt-2'>
                                        <div className='ms-2'>
                                            <div className='d-flex'>
                                                <h5><MdOutlineSupervisorAccount /></h5>
                                                <p className='ms-2'>{selectedRow?.purchaseManager.name}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <h5><IoIosMail /></h5>
                                                <p className='ms-2'>{selectedRow?.purchaseManager.email}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <h5><FaMobileAlt /></h5>
                                                <p className='ms-2'>{selectedRow?.purchaseManager.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-secondary ms-2 mt-2'>
                                <div>
                                    <h3 className='d-flex flex-column align-items-center'>Work Type</h3>
                                    <div className='d-flex ms-4 mt-2'>
                                        {selectedRow?.task ? (
                                            <div className='ms-2'>
                                                <div className='d-flex'>
                                                    <h5><MdConstruction /></h5>
                                                    <p className='ms-2'>{selectedRow.task.scopeOfWork.name}</p>
                                                </div>
                                                <div className='d-flex'>
                                                    <h5><MdDescription /></h5>
                                                    <div style={{ width: '100px', height: 'auto' }}>
                                                        <p className='d-flex ms-2'>Description</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='d-flex'>
                                                        <h5><BsCalendarDateFill /></h5>
                                                        <p className='ms-2'>{formatDate(selectedRow.task.startDate)}</p>
                                                    </div>
                                                    <div className='d-flex ms-2'>
                                                        <h5><MdDateRange /></h5>
                                                        <p className='ms-2'>{formatDate(selectedRow.task.endDate)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>No Work details available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='d-flex flex-column align-items-center'>
                                <h2>Materials</h2>
                            </div>
                            <div className='d-flex flex-wrap'>
                                {selectedRow?.materials.map(material => (
                                    <div key={material._id}>
                                        <div style={{ width: '260px', border: '1px solid black', borderRadius: '10px' }} className='col-3 align-item-center ms-2 mt-3'>
                                            <div className='d-block'>
                                                <div className='d-flex flex-column align-items-center'>
                                                    <h5>{material.materialCategory.name}</h5>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='text-center'>
                                                        <img className='round-img' style={{ marginLeft: '30px', border: '1px solid black' }} width={70} height={50} src={material.materialCategory.img_url} alt='material img' />
                                                    </div>
                                                    <div className='d-block ms-3'>
                                                        <div className='d-flex'>
                                                            <h5><TbBrandAppgallery /></h5>
                                                            <p className='ms-2'>{material.brand.name}</p>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <h5><MdProductionQuantityLimits /></h5>
                                                            <p className='ms-2'>{material.quantity} - {material.unit.name}</p>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <h5><MdOutlinePriorityHigh /></h5>
                                                            <p className='ms-2'>{material.priority}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-column align-items-center'>
                                                    <div className='d-flex'>
                                                        <h6>Status : </h6>
                                                        <p style={{ marginTop: '-2px' }} className='ms-2'>{material.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MaterialDetails;








// import axios from 'axios';
// import React from 'react';
// import { useState } from 'react'
// import { useQuery } from 'react-query';
// import { MdOutlineSupervisorAccount } from "react-icons/md";
// import { IoIosMail } from "react-icons/io";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdConstruction } from "react-icons/md";
// import { MdDescription } from "react-icons/md";
// import { BsCalendarDateFill } from "react-icons/bs";
// import { MdDateRange } from "react-icons/md";
// import { TbBrandAppgallery } from "react-icons/tb";
// import { MdOutlinePriorityHigh } from "react-icons/md";
// import { MdProductionQuantityLimits } from "react-icons/md";
// import { FaLocationDot } from "react-icons/md";
// import { useParams } from 'react-router-dom';

// const RowView = () => {
//     const { id } = useParams()

//     const [selectedMaterialId, setSelectedMaterialId] = useState();
//     const [selectedRow, setselectedRow] = useState(null);

//     const { data: Material = [], refetch: getMaterial } = useQuery('materials', async () => {
//         if (!selectedMaterialId) return [];
//         const response = await axios.get(`https://devapi.getstartbuild.com/auth/materialRequest/material/${selectedMaterialId}`);
//         return response.data.result.rows;
//     });

//     const { data: SingleGet = [], refetch: getSingleGet } = useQuery('singleget', async () => {
//         if (!id) return [];
//         const response = await axios.get(`https://devapi.getstartbuild.com/auth/materialRequest/${id}`);
//         return response.data.result.rows;
//     });

//     const handleMaterialClick = async (materialId) => {
//         setSelectedMaterialId(materialId);
//         await getMaterial();
//         // toggle();
//     };

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     return (
//         <div>
//             {SingleGet ? (
//                 <div>
//                     <div className='p-3'>
//                         <div className='d-flex flex-column align-items-center'>
//                             <h1 className='text-danger'>{selectedRow?.project.name}</h1>
//                         </div>
//                         <div className='d-Block mt-4'>
//                             <div className='d-lg-flex'>
//                                 <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-primary'>
//                                     <div>
//                                         <h3 className='d-flex flex-column align-items-center'>Site Location</h3>
//                                         <div className='d-flex ms-5 mt-2'>
//                                             <h5><FaLocationDot /></h5>
//                                             <div className='ms-2'>
//                                                 <p>{selectedRow?.project.location.officeName}</p>
//                                                 <p>{selectedRow?.project.location.district} - {selectedRow?.project.location.pincode}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div style={{ width: '250px', borderRadius: '10px' }} className='col-lg-3 bg-warning ms-2'>
//                                     <div>
//                                         <h3 className='d-flex flex-column align-items-center'>Site Supervisor</h3>
//                                         <div className='d-flex ms-4 mt-2'>

//                                             <div className='ms-2'>
//                                                 <div className='d-flex'>
//                                                     <h5><MdOutlineSupervisorAccount /></h5>
//                                                     <p className='ms-2'>{selectedRow?.siteSupervisor.name}</p>
//                                                 </div>
//                                                 <div className='d-flex'>
//                                                     <h5><IoIosMail /></h5>
//                                                     <p className='ms-2'>{selectedRow?.siteSupervisor.email}</p>
//                                                 </div>
//                                                 <div className='d-flex'>
//                                                     <h5><FaMobileAlt /></h5>
//                                                     <p className='ms-2'>{selectedRow?.siteSupervisor.mobile}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-success ms-2'>
//                                     <div>
//                                         <h3 className='d-flex flex-column align-items-center'>Purchase Manager</h3>
//                                         <div className='d-fle ms-4 mt-2'>

//                                             <div className='ms-2'>
//                                                 <div className='d-flex'>
//                                                     <h5><MdOutlineSupervisorAccount /></h5>
//                                                     <p className='ms-2'>{selectedRow?.purchaseManager.name}</p>
//                                                 </div>
//                                                 <div className='d-flex'>
//                                                     <h5><IoIosMail /></h5>
//                                                     <p className='ms-2'>{selectedRow?.purchaseManager.email}</p>
//                                                 </div>
//                                                 <div className='d-flex'>
//                                                     <h5><FaMobileAlt /></h5>
//                                                     <p className='ms-2'>{selectedRow?.purchaseManager.mobile}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-secondary ms-2'>
//                                     <div>
//                                         <h3 className='d-flex flex-column align-items-center'>Work Type</h3>
//                                         <div className='d-flex ms-4 mt-2'>
//                                             {selectedRow?.task ? (
//                                                 <div className='ms-2'>
//                                                     <div className='d-flex'>
//                                                         <h5><MdConstruction /></h5>
//                                                         <p className='ms-2'>{selectedRow.task.scopeOfWork.name}</p>
//                                                     </div>
//                                                     <div className='d-flex'>
//                                                         <h5><MdDescription /></h5>
//                                                         <div style={{ width: '100px', height: 'auto' }}>
//                                                             <p className='d-flex ms-2'>Description</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className='d-flex'>
//                                                         <div className='d-flex'>
//                                                             <h5><BsCalendarDateFill /></h5>
//                                                             <p className='ms-2'>{formatDate(selectedRow.task.startDate)}</p>
//                                                         </div>
//                                                         <div className='d-flex ms-2'>
//                                                             <h5><MdDateRange /></h5>
//                                                             <p className='ms-2'>{formatDate(selectedRow.task.endDate)}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 <div>
//                                                     <p>No Work details available</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='mt-4'>
//                                 <div className='d-flex flex-column align-items-center'>
//                                     <h2>Materials</h2>
//                                 </div>
//                                 <div className='d-flex flex-wrap'>
//                                     {selectedRow?.materials.map(material => (
//                                         <div key={material._id}>
//                                             <div style={{ width: '260px', border: '1px solid black', borderRadius: '10px' }} className='col-3 align-item-center ms-2 mt-3'>
//                                                 <div className='d-block'>
//                                                     <div className='d-flex flex-column align-items-center'>
//                                                         <h5>{material.materialCategory.name}</h5>
//                                                     </div>
//                                                     <div className='d-flex'>
//                                                         <div className='text-center'>
//                                                             <img className='round-img' style={{ marginLeft: '30px', border: '1px solid black' }} width={70} height={50} src={material.materialCategory.img_url} alt='material img' />
//                                                         </div>
//                                                         <div className='d-block ms-3'>
//                                                             <div className='d-flex'>
//                                                                 <h5><TbBrandAppgallery /></h5>
//                                                                 <p className='ms-2'>{material.brand.name}</p>
//                                                             </div>
//                                                             <div className='d-flex'>
//                                                                 <h5><MdProductionQuantityLimits /></h5>
//                                                                 <p className='ms-2'>{material.quantity} - {material.unit.name}</p>
//                                                             </div>
//                                                             <div className='d-flex'>
//                                                                 <h5><MdOutlinePriorityHigh /></h5>
//                                                                 <p className='ms-2'>{material.priority}</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='d-flex flex-column align-items-center'>
//                                                         <div className='d-flex'>
//                                                             <h6>Status : </h6>
//                                                             <p style={{ marginTop: '-2px' }} className='ms-2'>{material.status}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     )
// }

// export default RowView