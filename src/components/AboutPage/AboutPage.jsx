import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ReactShowMoreText from 'react-show-more-text';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

let cardWidth;

function AboutPage() {
  const [cardWidth, setCardWidth] = useState('18rem');
  const [negWidth, setNegWidth] = useState('0rem');
  const history = useHistory();

  useEffect(() => {
    const updateWindowDimensions = () => {
      if (window.innerWidth >= 800) {
        setCardWidth('40rem');
        setNegWidth('-15rem');
      }
      else {
        setCardWidth('18rem');
        setNegWidth('-5rem');
      }
    }
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

    /**
   * Handle Nav Click
   * Pass in a path as a string to navigate
   */
     const handleNavClick = (path) => {
      history.push(path);
    }

  return (
    <div className="container">
      <Row>
        <center>
          <Card style={{ width: cardWidth}}>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/full.png'} />
            <Card.Body style={{ marginTop: negWidth }}>
              <Card.Title>What is FreeGo: HFT</Card.Title>
              <ReactShowMoreText
                more="Read More"
                less="Read Less"
                expanded={false}
                truncatedEndingComponent={"..."}
              >
              <Card.Text>
              FreeGo: Hazard Free Travel is an innovative software 
              application three (3) current WSU Computer Science majors 
              are developing and considering for possible commercialization. 
              The solution is a personal safety tool where a user gains an understanding of the 
              personal safety risks in a specific location or geographic area. 
              Enter an address, and the application will map out key safety 
              incidents and create a personal threat profile for that location and 
              area based on criminal incidents, weather/natural disasters, and 
              other factors relevant to personal safety. Additionally, users will 
              be able to enter actual experience data to enhance the quality and 
              accuracy of the data FreeGo compiles/processes from various data sources.
              </Card.Text>
              <Card.Title>How to Use FreeGo: HFT</Card.Title>
              <Card.Text>
              This is a Proof of Concept. Please begin by pressing the button below. 
              This button will take you to the maps page 
              where you will have the opportunity to view 
              the maps page. The maps page is where you 
              will see all hazards around your area. For 
              the purposses of this demo, you will only be 
              given Minneapolis data.
              
              After you have finished with your experience, we would 
              hightly appreciate your feedback <a target="_blank" href="https://forms.gle/tUcDEJyB1w2fzmxu5">here</a> or 
              you can also click on "Please Take Survey" in the navigation
              bar.
              <div>
                <button className="btn btn-primary" type="button" onClick={() => handleNavClick('/map')}>
                  Begin Experience
                </button>
              </div>
              </Card.Text>
              </ReactShowMoreText>
            </Card.Body>
          </Card>
        </center>
      </Row>
      <center>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/Bada.jpg'} />
              <Card.Body>
                <Card.Title>Introduction - Sulaiman Bada</Card.Title>
                <Card.Text>
                  Sulaiman Bada is the co-founder and 
                  CEO of Caut!on Tech, LLC. He decided to 
                  start the company because he believes in 
                  safety, community, information, and the power 
                  of technology. He envisions Caut!on Tech, LLC 
                  being the gateway between information and safety 
                  around the world. 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/fahad.jpg'} />
              <Card.Body>
                <Card.Title>Introduction - Sheikh Fahad</Card.Title>
                <Card.Text>
                Sheikh Fahad is the co-founder and 
                CFO of Caut!on Tech, LLC. He saw value in the 
                company as safety was an important factor from 
                where he came. He believes "you should not be 
                lucky to be safe." He also believes in what 
                information technology and data can bring to 
                not only the realm of safety but to the people 
                in their communities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/ash.jpg'} />
              <Card.Body>
                <Card.Title>Introduction - Ashton Schultz</Card.Title>
                <Card.Text>
                Ashton Schultz is the co-founder and 
                CTO of Caut!on Tech, LLC. He joined the 
                mission because he sees the value in creating 
                resources to allow others to feel more 
                comfortable in their day-to-day life. 
                He is an avid believer in transparent, 
                effective presentation to the people that 
                he reaches.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </center>
    </div>
  );
}

export default AboutPage;
