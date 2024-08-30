import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currIdx, setcurrIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty, amount } = location.state || {};

  useEffect(() => {
    if (category && difficulty && amount) {
      axios.post(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
        .then((response) => {
          setQuestions(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error fetching the quiz!', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [category, difficulty, amount]);

  const handleAnswerSelection = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      if (answer === questions[currIdx].correct_answer) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      console.log(score);
      setTimeout(() => {
        if (currIdx + 1 < questions.length) {
          setcurrIdx(currIdx + 1);
        } else {
          navigate('/result', { state: { score, total: questions.length } });
        }
      }, 500); 
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (questions.length === 0) {
    return <Typography>No questions available. Please try again later.</Typography>;
  }

  return (
    <Card variant="outlined" style={{ margin: '20px auto', maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {questions[currIdx].question}
        </Typography>
        <Grid container spacing={2}>
          {questions[currIdx].incorrect_answers.concat(questions[currIdx].correct_answer)
            .map((answer, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  fullWidth
                  variant={selectedAnswer === answer ? "contained" : "outlined"}
                  color={selectedAnswer === answer ? "primary" : "secondary"}
                  onClick={() => handleAnswerSelection(answer)}
                  disabled={!!selectedAnswer}
                >
                  {answer}
                </Button>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
