import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { gethtml, updateanswer, getanswer } from "../Redux/Features/postslice"
import { useNavigate } from "react-router-dom";

const Html = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { html, answer } = useSelector((state) => ({ ...state.app }))
  const [initial, setinitial] = useState(0)

  useEffect(() => {
    dispatch(gethtml());
    dispatch(getanswer());

  }, [])

  const handleprev = (key) => {
    if (initial != 0) {
      dispatch(getanswer())
      setinitial(key - 1)
    }
  }
  const handlenext = (key) => {
    if ((key + 1) < (html.length)) {
      dispatch(getanswer())

      let value = key + 1;
      setinitial(value)
    }
  }
  const handleuserresult = (id, value, event) => {
    if (dispatch(updateanswer({ id: id, useranswer: value }))) {
      dispatch(getanswer())
    }
  }
  const handlesubmit = () => {
    navigate("/result")
  }
  return (
    <div className='quiz-main'>
      <div className=' quiz-inner'>
        {html ? html.map((value, key) => {
          if (initial == key) {

            return (<div key={key}>
              <div>
                <h1 className='qust'>{value.question}</h1>
                {(answer.length > 0) ? answer.map((ans, index) => {
                  if (key == index) {
                    return (
                      <div className='row' key={index}>
                        <div className={((ans.useranswer) == (value.optionA)) ? "exist col-6 option" : "col-6 option"} name="one" onClick={(e) => handleuserresult(value.id, value.optionA, e)}>

                          <input name="one" type="radio" className="form-check-input" id="one" />
                          <label htmlFor="one" className='label-held'>{value.optionA}</label>
                        </div>
                        <div className={((ans.useranswer) == (value.optionB)) ? "exist col-6 option" : "col-6 option"} name="two" onClick={(e) => handleuserresult(value.id, value.optionB, e)}>
                          <input name="one" type="radio" className="form-check-input" id="two" />
                          <label htmlFor="two" className='label-held'>{value.optionB}</label>
                        </div>
                        <div className={((ans.useranswer) == (value.optionC)) ? "exist col-6 option" : "col-6 option"} name="three" onClick={(e) => handleuserresult(value.id, value.optionC, e)}>
                          <input name="one" type="radio" className="form-check-input" id="three" />
                          <label htmlFor="three" className='label-held'>{value.optionC}</label></div>
                        <div className={((ans.useranswer) == (value.optionD)) ? "exist col-6 option" : "col-6 option"} name="four" onClick={(e) => handleuserresult(value.id, value.optionD, e)}>
                          <input name="one" type="radio" className="form-check-input" id="four" />
                          <label htmlFor="four" className='label-held'>{value.optionD}</label>
                        </div>
                      </div>
                    )
                  }

                }) : <>
                  <div className='row'>
                    <div className={"col-6 option"} name="one" onClick={(e) => handleuserresult(value.id, value.optionA, e)}>
                      <input name="one" type="radio" className="form-check-input" id="one" />
                      <label htmlFor="one" className='label-held'>{value.optionA}</label>
                    </div>
                    <div className={"col-6 option"} name="two" onClick={(e) => handleuserresult(value.id, value.optionB, e)}>
                      <input name="one" type="radio" className="form-check-input" id="two" />
                      <label htmlFor="two" className='label-held'>{value.optionB}</label>
                    </div>
                    <div className={"col-6 option"} name="three" onClick={(e) => handleuserresult(value.id, value.optionC, e)}>
                      <input name="one" type="radio" className="form-check-input" id="three" />
                      <label htmlFor="three" className='label-held'>{value.optionC}</label></div>
                    <div className={"col-6 option"} name="four" onClick={(e) => handleuserresult(value.id, value.optionD, e)}>
                      <input name="one" type="radio" className="form-check-input" id="four" />
                      <label htmlFor="four" className='label-held'>{value.optionD}</label>
                    </div>
                  </div>

                </>
                }


              </div>
              <div className='row'>
                <div className='col-6'>  </div>
                <div className='col-6 d-flex justify-content-end'>
                  <button onClick={() => handleprev(key)} className="btn prev-btn"> prev</button><button onClick={() => handlenext(key)} className="btn prev-btn nxt-btn">next</button></div>
              </div>

            </div>

            )
          }


        }) : null}
        <button onClick={handlesubmit} className="btn submit">submit test</button>
      </div>
    </div>


  )
}

export default Html