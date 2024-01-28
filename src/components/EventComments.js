import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './EventComments.css';

const EventComments = ({ eventTitle, eventImage }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        username: 'exampleUser',
        content: comment,
        rating: rating,
        timestamp: new Date().toLocaleString(),
      };
      console.log('Yeni yorum:', newComment);
      setComment('');
      setRating(0);
    }
  };

  return (
    <Card className="event-comments">
      <Card.Body>
        <Row>
          <Col md={3}>
            <img src={`${process.env.PUBLIC_URL}/images/${eventImage}`} alt={eventTitle} className="event-image" />
          </Col>
          <Col md={9}>
            <div className="event-details">
              <h2>{eventTitle}</h2>
              <ul className="comment-list">
                <li className="comment-item">
                  <div className="comment-header">
                    <strong>exampleUser</strong> <span className="timestamp">27.02.2024 14:30</span>
                  </div>
                  <div className="comment-content">
                    Mega Yorumluyor ilk kitap ve film oturumunu gerçekleştirdi.
                  </div>
                  <div className="comment-rating">
                    {rating > 0 && (
                      <span>
                        {Array.from({ length: rating }).map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="interaction-options">
          <Form.Group controlId="commentTextArea">
            <Form.Control
              as="textarea"
              rows="2"
              placeholder={`Haber ve sohbetlere yorum yapın...`}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <div className="rating-options">
            <span>Yıldızlama:</span>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Form.Check
                  key={index}
                  inline
                  type="radio"
                  label={<FontAwesomeIcon icon={faStar} color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'} />}
                  checked={ratingValue === rating}
                  onChange={() => setRating(ratingValue)}
                />
              );
            })}
          </div>
          <Button variant="primary" onClick={handleSubmitComment}>
            Yorum Yap
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventComments;
