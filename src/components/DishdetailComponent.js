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
  Input,
  Label,
  Col,
} from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export class CommentForm extends Component {
  constructor(props) {
    super(props);

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
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
                  model=".yourname"
                  id="yourname"
                  name="yourname"
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
                    model=".yourname"
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
                  <Button type="submit" color="primary">Submit</Button>
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

function RenderDish({ dish }) {
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
        <li>
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
        <div>
          <CommentForm />
        </div>
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
            <RenderDish dish={dish} />

            <RenderComments comments={props.comments} />
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
