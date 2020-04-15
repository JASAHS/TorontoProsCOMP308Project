import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
function ShowUser(props) {
    const [data, setData] = useState({});
    const [sign,setSign]=useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/users/" + props.match.params.id;
    const apiUrl2 = "http://localhost:3000/signses/" + props.match.params.id;
    const apiUrl3 = "http://localhost:3000/signsess";
    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            console.log(result.data);
            const result2=await axios(apiUrl2);
            setSign(result2.data);
            console.log(result2)
           
        };

        fetchData();
    }, []);

    const deleteSigns = async (id) => {
        setShowLoading(true);

        const mainUrl=apiUrl3 + id;
        axios.delete(mainUrl)
          .then((result) => {
            setShowLoading(false);
            
          }).catch((error) => setShowLoading(false));
          const result2=await axios(apiUrl2);
        setSign(result2.data);
      };

    const enterSigns = (id) => {
        props.history.push({
            pathname: '/enterSigns/' + id
        });
    };

    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <Jumbotron>
                <h1>Name: {data.firstName}, {data.lastName}</h1>
                <p>Email: {data.email}</p>
                <p>
                    <Button type="button" variant="primary" onClick={() => { enterSigns(data._id) }}>Enter Vital Signs</Button>&nbsp;

                </p>
                <ListGroup>
                {sign.map((item, idx) => (
                <ListGroup.Item key={idx} >Body Temperature: {item.bodyTemp}    Heart Rate:  {item.heartRate}      Blood Pressure:   {item.bloodPressure}        Respiratory Rate:{item.respiratoryRate} 
                &nbsp;&nbsp;&nbsp;<Button type="button" variant="danger" onClick={() => { deleteSigns(item._id) }}>Delete</Button></ListGroup.Item>
                ))}
                </ListGroup>
    <p></p>
            </Jumbotron>
        </div>
    );
}

export default withRouter(ShowUser);
