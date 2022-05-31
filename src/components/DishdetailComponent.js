import React from "react";

import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({dish}) {
  return (
    <div className="col-12 col-md-5 m-1" xs="12">
      <Card key={dish.id}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    const list = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <div>
            <p>{comment.comment}</p>
            <p>
              --{comment.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{list}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish !== null) {
    const dishDetail = props.dish.map((dish) => {
      return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            
                <RenderDish dish={dish} />
            
            
                <RenderComments comments={props.comments} />
            
        </div>
        </div>
    );
    });
  
  
  
  return <div className="container">{dishDetail}</div>;
  }else{
    <div></div>
  }
};

export default DishDetail;
