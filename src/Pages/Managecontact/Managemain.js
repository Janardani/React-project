import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Managecontact.css";
import greeneye from '../../Assets/images/greeneye.png';
import pen from '../../Assets/images/pen.png';
import trash from '../../Assets/images/trash.png';
import axios from 'axios';
import Dashboard from '../../Common/Dashboard';
import exportFromJSON from 'export-from-json'
import * as xlsx from 'xlsx';


function Managemain() {
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);
    const [filtername, setfiltername] = useState('');
    const [filterjob, setfilterjob] = useState('');
    const [filternum, setfilternum] = useState('');
    const [filteremail, setfilteremail] = useState('');
var arrayone =[];
var arraytwo=[];

    useEffect(() => {
        localStorage.setItem("dashboard page", 2);
        if (sessionStorage.getItem("sesemail")) {
            navigate('/Managecontact');
        }
        else {
            navigate('/Login')
        }
        const result = async () => { axios.get("http://localhost:8001/managecontact").then(res => setuserdata(res.data)); }
        result();
       
    }, []);

    userdata.map((eas,key)=>
        {
           
            // console.log("userdata",eas);
            eas.map((value,item) =>{
            if(item == 0)
            {
               arrayone.push(value)
                console.log("one",arrayone);
            
        }
    else if (item==1){
                arraytwo.push(value.values);
                // console.log("two",arraytwo);
            }
            })
        })

     console.log("one",arrayone);


    const viewcontact = (val) => {
        localStorage.setItem("view contact", val);
        navigate('/Contactinformation');
    }
    const editcontact = (val) => {
        localStorage.setItem("edit contact", val);
        navigate('/Editcontact');
    }
    const deletecontact = (val) => {
        axios.delete(`http://localhost:8001/managecontact/${val}`);
        window.location.reload(false)

    }
    const clickdashboard = () => {
        navigate('/');
    }

    //    pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexofLastValue = currentPage * itemsPerPage;
    const indexofFirstValue = indexofLastValue - itemsPerPage;
    const shownItems = arrayone.slice(indexofFirstValue, indexofLastValue);
    // console.log(shownItems);
    const pages = [];
    for (let i = 1; i <= Math.ceil(arrayone.length / itemsPerPage); i++) {
        pages.push(i)
    }
    const handlePage = (pageId) => {
        setCurrentPage(pageId + 1)
    }
    const handlePageSize = (e) => {
        setItemsPerPage(e.target.value);
    }


    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % limit == 0) {
            setmaxlimitNumber(maxlimitNumber - limit);
            setminlimitNumber(minlimitNumber - limit);
        }
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if ((currentPage + 1) > maxlimitNumber) {
            setmaxlimitNumber(maxlimitNumber + limit)
            setminlimitNumber(minlimitNumber + limit)
        }
    }

    const limit = 3;
    const [minlimitNumber, setminlimitNumber] = useState(1);
    const [maxlimitNumber, setmaxlimitNumber] = useState(3);

    let incrementDots = null;
    if (pages.length > maxlimitNumber) {
        incrementDots = <li onClick={handleNext}>...</li>
    }



// download
    var title = "Manage Contact";
    const data = [{
        Name: "",
        JobTitle: "",
        MobileNumber: "",
        Emailid: "",
        org: "",
        website: "",
        fb: "",
        insta: "",
        linkedin: "",
        ecnum: ""
    }]
    const fileName = 'download'
    const exportType = 'xls'



    
    const ExportToExcel = () => {
        exportFromJSON({ data, fileName, exportType })
    }

// upload

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "object" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                json.forEach(data =>{
                  
                         axios.post(`http://localhost:8001/managecontact`, data);
                })
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
     
    }
  

    return (
        <Dashboard title={title}>
            <>
                <div>
                    <h3 className='contactdetail'>Contact Detail</h3>
                    <div className='manage-main-div'>
                        <div className='row'>
                            <div className='col-lg-5'>
                                <p className='list-contact'>List of Contacts</p>
                            </div>
                            <div className='col-lg-7 d-flex justify-content-end'>
                                <span className='sample-doc sample-btn'>
                                    <button type="button" onClick={ExportToExcel}>Export To Excel</button>
                                </span>
                                <span className=' bulk-up sample-btn upload-bulk-btn'>
                                <input type="file" name='upload' className="form-control change-" onChange={readUploadFile}   id="upload" />
                            <label htmlFor="upload"><span className='btn'>Bulk Upload Contact</span></label>
                                </span>
                                <button onClick={() => { navigate("/Addcontact") }} className='btn add-con sample-btn'>Add Contact</button>
                            </div>
                            <div className='filter-div'>
                                <p className='filter-para'>Filter</p>
                                <input type="text" className='filter-btn ' placeholder="Search by User Name..." value={filtername} onChange={(e) => setfiltername(e.target.value)} />
                                <input type="text" className='filter-btn ' placeholder="Search by Job title" value={filterjob} onChange={(e) => setfilterjob(e.target.value)} />
                                <input type="text" className='filter-btn ' placeholder="+1 651-319-4767" value={filternum} onChange={(e) => setfilternum(e.target.value)} />
                                <input type="text" className='filter-btn' placeholder="Search by Email Id" value={filteremail} onChange={(e) => setfilteremail(e.target.value)} />
                            </div>
                            <table className='table manage-contact-table' id="table-to-xls">
                                <thead>
                                    <tr className='managecontact-tr'>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Job title</th>
                                        <th>Mobile Number</th>
                                        <th>Email Id</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {shownItems.filter(val =>{
                                        if((filtername=='') && (filterjob=='')&&(filteremail==''))
                                        {
                                            return val;
                                        }
                                      else if ( (val.Name).toLowerCase().includes(filtername.toLowerCase()) && (val.JobTitle).toLowerCase().includes(filterjob.toLowerCase())  && (val.Emailid).toLowerCase().includes(filteremail.toLowerCase()))
                                      {
                                          return (val);
                                      }
                                     }).map((value, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key+1}</td>
                                                <td><a className='con-name' onClick={() => clickdashboard(value.id)}>{value.Name}</a></td>
                                                <td>{value.JobTitle}</td>
                                                <td>{value.MobileNumber}</td>
                                                <td>{value.Emailid}</td>
                                                <td>
                                                    <div className='icon-div d-flex'>
                                                        <div> <img src={greeneye} alt="logo here" onClick={() => viewcontact(key+1)} /></div>
                                                        <div><img src={pen} alt="logo here" onClick={() => editcontact(value.id)} /></div>
                                                        <div><img src={trash} alt="logo here" onClick={() => deletecontact(value.id)} /></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    }

                                    )
                                    }
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
                <div className='pagination-main d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <p className='page-show'>Show</p>
                        <select onChange={handlePageSize} value={itemsPerPage} className="form-select page-sel">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <ul className='page-ul'>
                        <li><button onClick={handlePrev} disabled={currentPage == pages[0] ? true : false} className="btn prevbtn">Prev</button></li>
                        {
                            pages.map((e, index) => {

                                if ((e <= maxlimitNumber) && (e >= minlimitNumber)) {
                                    return (
                                        <>
                                            <li key={index}  ><button id={e} onClick={() => { handlePage(index) }} className={currentPage == e ? "btn num-btn active-btn" : "btn num-btn"} >{e}</button></li>
                                        </>

                                    )
                                }

                            })
                        }
                        {incrementDots}
                        <li><button onClick={handleNext} disabled={currentPage == pages.length ? true : false} className="btn prevbtn nextbtn">Next</button></li>
                    </ul>
                </div>

            </>

        </Dashboard>
    )
}

export default Managemain