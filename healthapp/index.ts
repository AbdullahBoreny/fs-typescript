import express from 'express';
import calculateBmi from './bmiCalculator.ts';
const app = express();

app.get('/bmi', (req, res) => {

  if (!req.query.height || !req.query.weight) {
    return res.status(404).json("missing parameters");
  }
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ badinput: "bad input" });
  }
  const bmiMessage = calculateBmi(Number(height), Number(weight));
  res.json({ height: height, weight: weight, bmi: bmiMessage });
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port http//localhost:${PORT}`);
});