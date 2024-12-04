import React, { useState } from 'react'
import AdminHead from '../../components/layout/AdminHead'
import Header from '../../components/layout/Header'
import Bot from '../../components/chatbot/Bot'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import Logo from '../../components/layout/Logo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

    const [userEmail, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [res, setRes] = useState('');
    const [cls, setCls] = useState('block');
    const [code, setCode] = useState(0);
    const [userInput, setUserInput] = useState('');
    let navigate = useNavigate();
    

    const handleSendEmail = async () => {
        setStatus('');
        setError(''); 

        if (!userEmail.trim()) {
            setError('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/send-code', {
                userEmail, // Send the email field as JSON
            });
            setCls('none');
            setRes(response.status);
            setCode(response.data);
            setStatus('Recovery code sent successfully! Please check your email.');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setCls('none');
                setError('Invalid email address. Please check and try again.');
            } else if (err.response && err.response.status === 500) {
                setCls('none');
                setError('Server error occurred. Please try again later.');
            } else {
                setCls('none');
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleUserEnterode = () => {
        if (String(code) === String(userInput)) {
            navigate(`/recover/${userEmail}`);
        }
        else{
            setStatus('');
            setError("Your entered code is incorrect..!");
        }
    }


  return (
    <div>
        <AdminHead />
        <Header/>

        <div className="center-container">
            <div className="white-back">
                <div className="col-two">
                    <Logo/>
                    <h3 className='mt-2'>Can't memorize the password..?</h3>
                    <span>Don't warry. Lets recover it..</span><br />
                    <div className={cls}>
                        <div className='btnfield'>
                            <div className='reviveryicon'><i class="fa-regular fa-envelope"></i></div>
                            <input type="text" placeholder='Enter your email here..' value={userEmail} onChange={(e) => setEmail(e.target.value)}/>
                            <button onClick={handleSendEmail}>Send <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                        </div>

                        <div className='warning-msg'>
                            <div><i class="fa-solid fa-triangle-exclamation"></i> Warning</div>
                            <span>Make your to enter the email you used when register to this system and then click on send button. We will send an recovery email to you. Please find it to be continued.</span>
                            <br />
                        </div>
                    </div>

                    {status && (
                        <div>
                            <div className="status-msg">
                                <span className="d-flex">
                                    <div className="success-message"><span className='mx-1'>{res}:</span>{status}</div>
                                </span>
                            </div>
                            <div className='recovery-area'>
                                <input type="text" placeholder='Enter recovery code here' name='userinput' value={userInput} onChange={(e) => setUserInput(e.target.value)}/><br />
                                <button className='submit-btn' onClick={handleUserEnterode}>Submit</button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="error-msg-1">
                            <span className="d-flex">
                                <div className="error-message"><span className='mx-1'></span>{error}</div>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <Bot/>
        <Footer/>
        <FooterRest/>
    </div>
  )
}
