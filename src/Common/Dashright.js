import React, { useEffect, useState } from 'react'
import DonutChart from "react-donut-chart";
import lock from '../Assets/images/lock.png';
import contact from '../Assets/images/contact.png';
import axios from 'axios';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';

function Dashright() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([{label:"",value:""}]);
  const [reportdata, setreportdata] = useState([]);
  const [filtername, setfiltername] = useState("");

  useEffect(()=>
  {
    localStorage.setItem("dashboard page", 1);
  const fetchData=()=>{
    axios.get("http://localhost:8001/reports").then(res => setreportdata(res.data));
  }
  fetchData();
   

  },[])
  var length = reportdata.length
  var Array = [];
  for(var i=0;i<length;i++)
  { 
    Array.push(reportdata[i].Geo);
  }
var uniqueArray = [];
for(var i=0;i<length;i++)
{
  if(uniqueArray.indexOf(Array[i]) === -1) {
    userdata.push({label:"",value:''})
    uniqueArray.push(Array[i]);
}
}
var values =[];
var totaltaps = 0;
for(var i=0;i<uniqueArray.length;i++)
{
  var num = 0;
  for(var j=0;j<Array.length;j++)
  {
    if(uniqueArray[i] == Array[j])
    {
        num = num + reportdata[j].taps;
        
    }
  }
  values.push(num);
  totaltaps = totaltaps + num ;
}
for(var i=0;i<uniqueArray.length;i++)
{
   userdata[i].label = uniqueArray[i];
    userdata[i].value =  values[i];
}
userdata.splice(uniqueArray.length)
  const reactDonutChartBackgroundColor = [
    "#CA9C31",
    "#854095",
    "#E37E06",
    "#1170CB",
    "#D9B648"
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  let reactDonutChartStrokeColor = "#000";
var title = "Dashboard";
// filter

const filterchange = (e) =>
{
  setfiltername(e.target.value)
}

//    pagination
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const indexofLastValue = currentPage * itemsPerPage;
const indexofFirstValue = indexofLastValue - itemsPerPage;
const shownItems = reportdata.slice(indexofFirstValue, indexofLastValue);
  const pages = [];
    for (let i = 1; i <= Math.ceil(reportdata.length / itemsPerPage); i++) {
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
  return (
    <Dashboard title={title}>
      <div className='d-flex justify-content-between'>
        <div className='main-chart'>
          <div className='chart-one d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>  <div className='chart-little-img chart-little-img-one'> <div className='chr-img-div'><img src={lock} alt="something here" /></div></div>
              <p className='chart-para'>Total Number of Taps / Scans</p></div>
            <div><strong className='chart-num'>{totaltaps}</strong></div>
          </div>
          <div className='chart-two'>
            <div className='d-flex justify-content-between align-item-center' >
              <div>
              <p className='num-tap-para'>Number of Taps / Scans by City</p>
              <strong className='chart-num inner-chart-num'>{totaltaps}</strong>
              </div>
           
              <button className='view-port-btn btn' onClick={() => navigate("/Report")}>View Report</button>
            </div>

            <DonutChart
              width={500}
              height={350}
              strokeColor={reactDonutChartStrokeColor}
              data={userdata}
              colors={reactDonutChartBackgroundColor}
              innerRadius={reactDonutChartInnerRadius}
              selectedOffset={reactDonutChartSelectedOffset}
            />
          </div>
        </div>
        <div className='main-chart'>
          <div className='chart-one d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>  <div className='chart-little-img chart-little-img-two'><div className='chr-img-div'> <img src={contact} alt="something here" /></div></div>
              <p className='chart-para'>Total Number of Contacts Saved</p></div>
            <div>
              <strong className='chart-num'>{length}</strong>
            </div>
          </div>
          <div className='chart-two'>
            <div className='d-flex justify-content-between align-items-center' >
              <p className='num-tap-para'>Number of Contacts Saved By User</p>
             
            </div>
            <div className='search-div d-flex align-items-baseline'>
              <p className='search-para'>Search</p>
              <div className="form-group">
                <input type="email" className="form-control search-inp" aria-describedby="emailHelp" placeholder="Search By User Name..." value={filtername} onChange={filterchange} />
              </div>
            </div>
            <table className='table num-of-contact'>
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Saved Contacts</th>
                </tr>
              </thead>
              <tbody>
               {
                 reportdata.length?(shownItems.filter(val=>{
                  if(filtername == " ")
                  {
                    return val;
                  }
                  else if(val.name.toLowerCase().includes(filtername.toLowerCase()))
                  {
                    return val;
                  }
                }).map((data,key) =>{
                  return(
                    <tr key={key}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.saves}</td>
                  </tr>
                  )
                }
               
                )
                ):(null)
               }
              </tbody>
            </table>
            <div className='pagination-main dash-pagination d-flex justify-content-between align-items-center'>
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
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Dashright