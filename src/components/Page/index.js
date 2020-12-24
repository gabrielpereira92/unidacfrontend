import React from 'react';
import {
  Container,
  Card, CardHeader, CardTitle, CardBody,
} from 'reactstrap';

export default function index({ children, title }) {
  return (
    <Container className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>
          {children}
        </CardBody>
      </Card>
    </Container>
  );
}