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

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    console.log(props.dishId)

    this.state = {
      isFormOpen: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleForm() {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
    });
  }
  handleSubmit(values) {
    this.toggleForm();
    this.props.addComment(
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
                  <Label htmlFor="yourname">Your Name</Label>
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

function RenderDish(props) {
  console.log(props.dishId)
  return (
    <div className="col-12 col-md-5 m-1" xs="12">
      <Card key={props.dish.id}>
        <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
        <CardBody>
          <CardTitle>{props.dish.name}</CardTitle>
          <CardText>{props.dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  console.log(dishId)
  if (comments != null) {
    const list = comments.map((comment) => {
      return (
        <li>
          <div key={comment.id}>
            <p>{comment.dishId},{comment.comment}</p>
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
        <div>
        <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
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
    const dishDetail = props.dish.map((dish) => {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderDish dish={dish}/>

            <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
          </div>
        </div>
      );
    });

    return <div className="container">{dishDetail}</div>;
  } else {
    <div></div>;
  }
};

export default DishDetail;
