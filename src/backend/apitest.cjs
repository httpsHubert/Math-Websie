const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDeIqrqYniMp3Z3H-DnbI5ky_exR_pV7VA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Od tego momentu mów po polsku, jesteś profesorem matematyki stosowanej, chcę abyś mi podał: dziedzinę, zbiór wartości, minima, maxima funkcji x^2 + 2x - 5. Jedyne co chcę abyś wygenerował to odpowiedź, powinna ona wyglądać: `R\ odpowiedziedz` ";

const generateResponse = async () => {
  const result = await model.generateContent(prompt);
  return result.response.text()
}

(async () => {
  console.log(await generateResponse());
})();