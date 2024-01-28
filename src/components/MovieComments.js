import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './MovieComments.css';

const MovieComments = ({ filmTitle, filmImage }) => {
  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleToggleSpoiler = () => {
    setIsSpoiler(!isSpoiler);
  };

  const handleToggleSpoilerContent = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isSpoilerContentVisible = !updatedComments[index].isSpoilerContentVisible;
    setComments(updatedComments);
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        username: 'exampleUser',
        content: comment,
        isSpoiler: isSpoiler,
        isSpoilerContentVisible: false, // Varsayılan olarak gizli
        rating: rating,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setComment('');
      setIsSpoiler(false);
      setRating(0);
    }
  };

  return (
    <Card className="movie-comments">
      <Card.Body>
        <Row>
          <Col md={3}>
            <img src={`${process.env.PUBLIC_URL}/images/${filmImage}`} alt={filmTitle} className="movie-image" />
          </Col>
          <Col md={9}>
            <div className="movie-details">
              <h2>{filmTitle} Yorumları</h2>
              <ul className="comment-list">
                {comments.map((c, index) => (
                  <li key={index} className={`comment-item ${c.isSpoiler ? 'spoiler' : ''}`}>
                    <div className="comment-header">
                      <strong>{c.username}</strong> <span className="timestamp">{c.timestamp}</span>
                    </div>
                    <div className="comment-content">
                      {c.isSpoiler && (
                        <span>
                          {c.isSpoilerContentVisible ? (
                            <span>
                              {c.content}
                              <Button
                                variant="link"
                                size="sm"
                                className="toggle-spoiler-button"
                                onClick={() => handleToggleSpoilerContent(index)}
                              >
                                Spoiler Gizle
                              </Button>
                            </span>
                          ) : (
                            <span>
                              Spoiler içeriği gizlendi.{' '}
                              <Button
                                variant="link"
                                size="sm"
                                className="toggle-spoiler-button"
                                onClick={() => handleToggleSpoilerContent(index)}
                              >
                                Spoiler Göster
                              </Button>
                            </span>
                          )}
                        </span>
                      )}
                      {!c.isSpoiler && c.content}
                    </div>
                    <div className="comment-rating">
                      {c.rating > 0 && (
                        <span>
                          {Array.from({ length: c.rating }).map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />
                          ))}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        <div className="interaction-options">
          <Form.Group controlId="commentTextArea">
            <Form.Control
              as="textarea"
              rows="2"
              placeholder={`Yorumunuzu ${filmTitle} için buraya yazın...`}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="spoilerCheckbox"
            label="Spoiler"
            checked={isSpoiler}
            onChange={handleToggleSpoiler}
          />
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

export default MovieComments;
