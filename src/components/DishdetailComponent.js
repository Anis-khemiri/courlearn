import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Label,
  Col,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    console.log(props.dishId)



    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {
      isNavOpen: false,
      isFormOpen: false
    };
  
  }

  toggleForm() {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
    });
  }
  handleSubmit(values) {
    this.toggleForm();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.toggleForm()} outline>
          <span className="fa fa-pencil m-1"> </span>
          Submit Comment
        </Button>
        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
          <Modal isOpen={this.state.isFormOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleForm}>Submit Comment</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Col>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="author">Your Name</Label>
                  <Col>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Col>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </LocalForm>
      </div>
    );
  }
}

function RenderDish({dish}) {
  
  
  return (
    <div className="col-12 col-md-5 m-1" xs="12">
  
  <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>      
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  
  if (comments != null) {
    return(
    <div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
			<ul className="list-unstyled">
      <Stagger in>
    {comments.map((comment) => {
        return (
          <Fade in>
            <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
            </Fade>
          
        );
    })}
  
  </Stagger>
   </ul>
      
        <CommentForm 
                    comments={comments} 
                    dishId={dishId} 
                    postComment={postComment} />
        </div>
     
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  const dish = props.dish;
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
  
 else if (props.dish !== null) {
    
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish}/>

            <RenderComments comments={props.comments}
        postComment={props.postComment}
        dishId={props.dish.id}
      />
          </div>
        </div>
      );
   ;

  } else {
    return(
    <div></div>
    );
  }
};

export default DishDetail;
