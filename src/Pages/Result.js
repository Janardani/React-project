import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { gethtml, getanswer, updateanswer } from "../Redux/Features/postslice"

const Result = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { html, answer } = useSelector((state) => ({ ...state.app }))
  const [content, setcontent] = useState(" ")
  const [finalpercentage, setfinalpercentage] = useState(0)
  const [count, setcount] = useState(0)
  const [totalqust, settotalqust] = useState(0)
  var valuetotal = 0;
  var valuecount = 0;
  useEffect(() => {
    dispatch(gethtml())
    dispatch(getanswer())
  }, [])
  useEffect(() => {

    if (html.length == answer.length) {
      html.forEach((originalanswer, keyone) => {
        answer.forEach((item, keytwo) => {
          if (keyone == keytwo) {
            valuetotal = valuetotal + 1;
            settotalqust(valuetotal);
            if (originalanswer.answer == item.useranswer) {
              valuecount = valuecount + 1;
              setcount(valuecount)
            }
          }
        })
      })
    }

    if (count && totalqust) {
      var total = (Math.round(parseInt(count)) / parseInt(totalqust)) * 100;
      setfinalpercentage(total);
      if (finalpercentage) {
        if (parseInt(finalpercentage) < 35) {
          setcontent("your result is poor, you need more knowledge")

        }
        else if (parseInt(finalpercentage) < 50) {
          setcontent("your result is average,you need some knowledge")
        }
        else if (parseInt(finalpercentage) < 80) {
          setcontent("your result is Good")
        }
        else {
          setcontent("your result is excellent")
        }
      }
    }
  }, [html, answer])

  const handlebacktoonline = () => {
    if (answer) {
      answer.forEach(itemone => {
        dispatch(updateanswer({ id: itemone.id, useranswer: "" }))
      })
    }
    navigate("/")
  }

  return (
    <div className='result'>
      <div className='inner-result'>
        <strong>your Result</strong>
        <p className='result-para'>correct answer ({count} / {totalqust} )</p>
        <div className="progress-main">
          <div className="progress-div" style={{ width: `${finalpercentage}%` }}></div>
        </div>
        <p className='result-content' >{content}</p>
        <button className='btn cancel-btn' onClick={handlebacktoonline}>back to login</button>
      </div>

    </div>
  )
}

export default Result