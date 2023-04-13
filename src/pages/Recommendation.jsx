import React,{useEffect,useState} from 'react';
import { Configuration, OpenAIApi } from "openai";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config/config";

const Recommendation = async () => {
    const [performance, setPerformance] = useState([]);
    const user = useSelector((state) => state?.user.user);
    useEffect(() => {
        const handleFetch = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/performance`, {
              headers: { authorization: `Bearer ${user.token}` },
            });
            setPerformance(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        handleFetch();
      }, [user.token]);
     let recommendationText;
      const fetchRecommendations = async () => {
        const configuration = new Configuration({
            organization: "org-p9VnXVzsADpxQUZB9XDL6cbs",
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.listEngines();
        const unitsWithD = performance.filter((unit) => unit.grade === "D").map((unit) => unit.unitName);
      const recommendations = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `My performance in the following units is poor: ${unitsWithD.join(", ")}. What can I do to improve my grades?`,
        maxTokens: 100,
        temperature: 0.5,
        n: 1,
        stop: ["\n"]
      });
       recommendationText = recommendations.choices[0].text.trim();
       console.log(response);
      }
  fetchRecommendations();
      
      
      
      
      

  return (
    
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Recommendations</h2>
          {recommendationText && (
            <p className="text-gray-700">{recommendationText}</p>
          )}
        </div>
  )
}

export default Recommendation