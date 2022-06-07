import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Managecontact/Managecontact.css";
import axios from 'axios';
import Dashboard from '../../Common/Dashboard'
import exportFromJSON from 'export-from-json'

function Report() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const [filtername, setfiltername] = useState('');
  const [filterlocation, setfilterlocation] = useState('');
  useEffect(() => {
    localStorage.setItem("dashboard page", 3);
    if (sessionStorage.getItem("sesemail")) {
      navigate('/Report');
    }
    else {
      navigate('/Login')
    }
    const result = async () => { axios.get(" http://localhost:8001/reports").then(res => setuserdata(res.data)); }
    result();
  }, [])
const clickdashboard = () => {
    navigate('/');
}

//    pagination
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const indexofLastValue = currentPage * itemsPerPage;
const indexofFirstValue = indexofLastValue - itemsPerPage;
const shownItems = userdata.slice(indexofFirstValue, indexofLastValue);
  const pages = [];
    for (let i = 1; i <= Math.ceil(userdata.length / itemsPerPage); i++) {
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
    var title ="Manage Contact"


    // download
    var title = "Manage Contact";
    const data = userdata;
    const fileName = 'download'
    const exportType = 'xls'
    const ExportToExcel = () => {
        exportFromJSON({ data, fileName, exportType })
    }

  return (
    <Dashboard title={title}>
        <div className='d-flex justify-content-between'>
        <h3 className='contactdetail'>List of Reports</h3>
  
     
        <select class="form-select export-xls" aria-label="Default select example" onClick={ExportToExcel}>
        <option style={{background: "#000000"}}>   Export As</option>
           <option style={{background: "#000000"}}>xls</option>
           <option style={{background: "#000000"}}>pdf</option>
       </select>
      
      
        </div>
    
      <div className='filter-div filter-report justify-content-start'>
        <p className='filter-para'>Filter</p>
        <input type="text" className='filter-btn ' placeholder="Search by User Name..." value={filtername} onChange={(e) => setfiltername(e.target.value)} />
        <input type="text" className='filter-btn ' placeholder="Search by Geo location" value={filterlocation} onChange={(e) => setfilterlocation(e.target.value)} />
      </div>
      <table className='table manage-contact-table' id="table-to-xls">
                            <thead>
                                <tr className='managecontact-tr'>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Number of Saves</th>
                                    <th>Number of Overall Taps</th>
                                    <th>Number of Overall Taps</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shownItems.filter(val =>
                                    val.name.toLowerCase().includes(filtername.toLowerCase()) && val.Geo.toLowerCase().includes(filterlocation.toLowerCase())).map((filteredName,key) => {
                                    
                                    return (filteredName)
                                }).map((value,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{value.id}</td>
                                            <td><a className='con-name' onClick={() => clickdashboard(value.id)}>{value.name}</a></td>
                                            <td>{value.saves}</td>
                                            <td>{value.taps}</td>
                                            <td>{value.Geo}</td>
                                        </tr>
                                    )
                                   
                                }
                                
                                )
                                }
                            </tbody>
                        </table>

                        
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


    </Dashboard>
  )
}

export default Report