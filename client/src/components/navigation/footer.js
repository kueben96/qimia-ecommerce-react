import React from 'react';
import ContactsIcon from '@material-ui/icons/Contacts'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import logo from 'images/Logo.png'
import {useSelector} from 'react-redux'

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
            <div class="logo">
                        <img
                            src={logo}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span>Pizza</span>
                    </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <ContactsIcon className="orange"/>
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Some street 222</div>
                                </div>
                            </div>
                            <div className="tag">
                                <TimelapseIcon className="orange"/>
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>27287912323</div>
                                </div>
                            </div>
                            <div className="tag">
                                <PhoneIcon className="orange"/>
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>always closed</div>
                                </div>
                            </div>
                            <div className="tag">
                                <EmailIcon className="orange"/>
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>waves@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;