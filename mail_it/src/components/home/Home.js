import React from 'react'
import "./Home.css"
import Pricing from '../pricing/Pricing';
import {SocialMediaIconsReact} from 'social-media-icons-react';

function Home() {
    return (
        <div className="yo">
            <div  className="main">
                <img className="image" src={require("./glenn-carstens-peters-P1qyEf1g0HU-unsplash.jpg")} alt="" />
                <div className="text">
                    <span className="tit">Mail It!!</span><br/>
                    <span className="below">Bulk Mails?   Deleivered.</span>
                </div>

                <div className="content">
                    <p className="content1">Have a lots of mails to send and don't know what to do? 
                        Don't worry we will handel it all.Mail It !! provides you the 
                        features to send lots of mails at ones.Weather the number is 
                        50 or 5000 we will send it all.Check out our plans and choose 
                        the one you are comfortable with...</p>
                    <p className="content2">Powerful features, without any hassle</p>
                    <p className="content3">Our Pricings</p>

                    <div className="container1">
                        <Pricing id={1} tot={3} tag="Free" price={0} mail={50} avil="unavilable" rem="not removable" no="No"/>
                        <Pricing id={2} tot={3} tag="Platinum" price={500} mail={500} avil="unavilable" rem="removable" no="No"/>
                        <Pricing id={3} tot={3} tag="Premium" price={1000} mail="Unlimited" avil="avilable" rem="removable" />
                    </div>

                    <p className="content4">How it works?</p>

                    <div className="container2">
                        
                        <div className="comnt">
                            <img src={require("./1.ico")} alt=""/>
                            
                            <div className="textt">
                            <p>- Download our template xlsx file from <a href="http://res.cloudinary.com/raghu097/raw/upload/v1598812885/mail_it/eddx5u2caphzefdjlqu0.xlsx">here</a></p>                            <p >- Add recipient's emails under Email field</p>
                            <p>- Do not make any change in Email heading or sheet name</p>
                            </div>

                        </div>

                        <div className="comnt1">
                            
                            <div className="textt">
                                <p>- While filling up the from upload the same xlsx file with recipient's emails </p>
                                <p>- Wait that's not it</p>
                                <p>- If you want the body text to be dynamic, add more fields next to Email and use the same field name in body text to change it dynamically.</p>
                                <p>- Submit the form to add it to your projects</p>
                                <p>- Navigate to View Projects tab</p>
                                <p>- Click on send and boom!! you are done.</p>
                            </div>
                            <img className="acrob" src={require("./2.jpg")} alt=""/>
                        </div>
                    </div>
                    <p className="content3">About {'\u003C'} dev {'\u003E'}</p>
                    
                    <div className="ava">
                        <img src={require("../img/pp.jfif")} alt="" className="image1"/>
                    </div>

                    <div className="me">
                        <p><strong>{'\u003C'} Ujjwal Raghuvanshi {'\u003E'}</strong></p>
                        <p>{'\u003C'} Full Stack dev {'\u003E'}</p>
                    </div>
                    
                    <div className="me_">
                        <p>{'\u003C'} This is my first Full Stack project.I am still learning this tech and have designed this website as my college porject.There are many more to come.{'\u003E'}</p><br/>
                        
                        <div className="findme">
                            <p>Find me on:</p>
                            <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,146,223,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="56" />
                            <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="instagram" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(223,28,144,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="56" />
                            <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,186,223,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="56" />
                        </div>
                        
                    </div>
                </div>
                <p className="copy">Copyright © 2020 Mail It!!. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Home
