import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';



function ValidatePage() {
    const navigate = useNavigate()

    const [username, setUserName] = useState('');
    const [authenticationCode, setAuthenticationCode] = useState('');

    const handleRegisterConfirmation = async () => {
        try {
            console.log('handleRegisterConfirmation')
            console.log(username);
            console.log(authenticationCode);

            await Auth.confirmSignUp(username, authenticationCode)
            navigate('/login')
        } catch (err) { console.log(err) }
    }

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Validate</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name"
                                onChange={evt => setUserName(evt.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Authentication Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Authentication Code"
                                onChange={evt => setAuthenticationCode(evt.target.value)} />
                        </Form.Group>

                        <Button variant="destructive" type="button"
                            onClick={handleRegisterConfirmation}>Validate &gt;&gt;</Button>
                        &nbsp;&nbsp;
                        <Link
                            to='/'>
                            <Button variant="destructive">Cancel</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ValidatePage;