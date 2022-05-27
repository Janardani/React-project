import React, { useEffect, useState } from 'react'
import './Addcontact.css';
import axios from 'axios';

const Addcontact = () => {
    const [userdata, setuserdata] = useState([]);
    const len = 10;
    const [contactdata, setcontactdata] = useState([{"one":"hello"}])
    var items ={"two":"hai"}
    useEffect(() => {
        const result = async () => { axios.get("http://localhost:8001/managecontact/01").then(res => setuserdata([res.data])); }
        result();
      
    }, []);
    console.log(userdata)
    contactdata.push(items)
   
    console.log(contactdata)
    return (
        <>
            <h3 className='contactdetail'>Contact Form</h3>
            <div className='add-contact'>
                <div className='d-flex justify-content-between add-contact-add'>
                    <p className='add-edit'>Add/Edit Form</p>
                    <button className='btn add-field'>Add Field</button>
                </div>
                <div className='apex'></div>
                <div className='basic-information'>
                    <p className='basic-info add-edit add-contact-add'>Basic Information</p>
                    <div className='info-input-main row'>
                        {userdata.map((value) => {
                            return (
                                <>{value.label.map((e, key) => {
                                    return (
                                        <div key={key} className='info-input d-flex flex-column col-lg-4'>
                                            <label>{e}</label>
                                            <input type='text' placeholder={`Enter ${e}`} name={key} />
                                        </div>
                                    )
                                })}</>

                            )
                        })}

                    </div>



                </div>
            </div>
        </>
    )
}

export default Addcontact