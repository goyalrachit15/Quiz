import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  const handleRetakeQuiz = () => {
    navigate('/');
  };

  return (
    <Card variant="outlined" style={{ margin: '20px auto', maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Quiz Finished!
        </Typography>
        <Typography variant="h5">
          Your Score: {score} / {total}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRetakeQuiz}
          style={{ marginTop: 20 }}
        >
          Retake Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default Result;
