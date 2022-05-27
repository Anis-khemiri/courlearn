import React, { Component } from "react";
import moment from "moment";
import { Card, CardBody, CardImg, CardTitle, CardText, Row } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.dish);
    console.log(this.props.dish.name);
  }
  componentDidMount(){
    console.log('dishdetail componentDidMount invoke')
  }
  componentDidUpdate(){
    console.log('dishDetail update')
  }
  render() {
    console.log('dishdetail invoke')
    const comm = this.props.dish.map((x) => {
      return (
        <div className="container">
          <Row className="col-12 col-md-12 m-1" xs="12">
            
              <Card key={x.id} className="col-12 col-md-5" xs="12">
                <CardImg width="100%" src={x.image} alt={x.name} />
                <CardBody>
                  <CardTitle>{x.name}</CardTitle>
                  <CardText>{x.description}</CardText>
                </CardBody>
              </Card>
            
            <div className="col-12 col-md-5 m-1" xs="12">
              <h4>Comments</h4>
              <div>
                {x.comments.map((z) => {
                  return (
                    <ul key={z.id} className="list-unstyled">
                      <li>{z.comment}</li>
                      <li>{`-- ${z.author},${moment(z.date).format("LL")}`}</li>
                      {/* <li>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(z.date)))}</li> */}
                    </ul>
                  );
                })}
              </div>
              
            </div>
          </Row>
        </div>
      );
    });
    // const commentDetail = this.props.dish.map((y) => {

    //       return (

    //         <ul key={y.id} className="list-unstyled">
    //           <li>{y.comment}</li>
    //           <li>{`-- ${y.author},${moment(y.date).format('LL')}`}</li>

    //         </ul>
    //       );
    //     });
    return (
      <div >
        {comm}

       
      </div>
    );
  }
}

export default DishDetail;
