import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";
import { decode } from "html-entities";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const Questions = () => {
  const [finished, setFinished] = useState([]);
  const { question_category, amount_of_questions } = useSelector(
    (state) => state
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [trueAnswers, setTrueAnswers] = useState([]);
  let apiUrl = `/api.php?amount=${amount_of_questions}&type=multiple`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  const { response, loading } = useAxios({ url: apiUrl });

  useEffect(() => {
    if (response?.results.length) {
      const newArr = [];
      response.results.forEach((element) => {
        newArr.push(element.correct_answer);
      });
      setTrueAnswers(newArr);
      const question = response.results[questionIndex];

      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);
  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  const handleNext = () => {
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    }
    console.log(trueAnswers);
  };
  const handleBack = () => {
    if (questionIndex + 1 > 1) {
      setQuestionIndex(questionIndex - 1);
    }
  };
  const handleSelect = (index) => {
    setQuestionIndex(index);
  };
  const handleCheck = (e) => {
    if (!finished[questionIndex]) {
      const newArr = [...answers];
      newArr[questionIndex] = e.target.textContent;
      setAnswers(newArr);
      console.log(answers);
      console.log(trueAnswers);
    }
  };
  const handleFinish = () => {
    const arr = [...finished];
    arr[questionIndex] = true;
    setFinished(arr);
  };
  const onAllFinish = () => {
    let arr = new Array(response.results.length).fill(true, 0);
    setFinished(arr);
  };
  return (
    <Box border={1} mt={2}>
      {response.results.map((el, index) => (
        <Button
          size="small"
          sx={{ bgcolor: answers[index] ? "text.disabled" : "" }}
          variant={questionIndex === index ? "contained" : ""}
          onClick={(e) => {
            handleSelect(index);
          }}
        >
          {index + 1}
        </Button>
      ))}
      <Typography
        height="50px"
        p={1}
        fontWeight="500"
        style={{ backgroundColor: "#f0f0f0" }}
        align="left"
      >
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box key={id}>
          <Button
            onClick={handleCheck}
            variant={answers[questionIndex] == data ? "contained" : ""}
            style={{
              backgroundColor: finished[questionIndex]
                ? answers[questionIndex] == data
                  ? trueAnswers[questionIndex] == data
                    ? "green"
                    : "red"
                  : trueAnswers[questionIndex] == data && answers[questionIndex]
                  ? "green"
                  : trueAnswers[questionIndex] == data
                  ? "grey"
                  : ""
                : "",
            }}
            fullWidth
          >
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handleBack}
          disabled={questionIndex === 0}
        >
          Back
        </Button>
        <Button variant="outlined" onClick={handleFinish}>
          Submit
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={questionIndex + 1 === response.results.length}
        >
          Next
        </Button>
      </Box>

      <Box mt={5}>
        Question: {questionIndex + 1} / {response.results.length}
        <Button variant="contained" onClick={onAllFinish}>
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default Questions;
