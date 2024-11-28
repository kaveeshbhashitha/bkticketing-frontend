import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../components/layout/Logo'
import AdminHead from '../../components/layout/AdminHead'
import Header from '../../components/layout/Header'
import Bot from '../../components/chatbot/Bot'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import { useNavigate, useParams } from 'react-router-dom';

export default function RecoverPassword() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState('');
    let {userEmail} = useParams();
    let navigate = useNavigate();

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        // Reset status and error messages
        setStatus('');
        setError('');

        // Basic validation
        if (!newPassword || !confirmPassword) {
            setError('Both fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Call the backend API
            const response = await axios.post('http://localhost:8080/user/update-password', null, {
                params: {
                    userEmail,
                    newPassword,
                },
            });
            setData(response.data);
            console.log(data);
            setStatus('Password updated successfully! You can now log in with your new password.');
            setNewPassword('');
            setConfirmPassword('');
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('Failed to update password. Please try again later.');
            }
        }
    };


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
                    <div >
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="recoveryfield">
                                <label>Enter New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                />
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                />

                                <button type="submit" className="submit-btn">
                                    Change Password
                                </button>
                            </div>
                        </form>
                        {status && <div className="status-msg success-message">{status}</div>}
                        {error && <div className="error-msg error-message">{error}</div>}
                    </div>
                </div>
            </div>
        </div>

        <Bot/>
        <Footer/>
        <FooterRest/>
    </div>
  )
}
