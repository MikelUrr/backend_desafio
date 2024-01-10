import emotionController from "./emotionController.js";

const getDayEmotions = async (req, res) => {
    try {
        
        const emotions = await emotionController.getallEmotions();
        if (!emotions) {
            res.status(404).json("Emotions not found");
            return;
        }else{
            const yesterdayEmotions = filteryesterday(emotions);
          const {  entradaSalidaTotals, totalTotals } = calculateEmotionTotals(yesterdayEmotions);
          
            res.status(200).json({ entradaSalidaTotals, totalTotals}); 
        }
     
        
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting emotions");
    }
}


const getallEmotions = async (req, res) => {
    try {
        const emotions = await emotionController.getallEmotions();
        if (!emotions) {
            res.status(404).json("Emotions not found");
            return;
        }
        res.status(200).json(emotions);
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting emotions");
    }
}
const filteryesterday = (emotions) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];
    const yesterdayEmotions = emotions.filter(
      (emotion) => emotion.date.toISOString().split("T")[0] === yesterdayString
    );
    return yesterdayEmotions;
  }
const calculateEmotionTotals = (emotions) => {
   const entradaSalidaTotals = {};
    const totalTotals = {};
  
    emotions.forEach((emotion) => {
      const { emotionType, registerTime } = emotion;
  
      if (!entradaSalidaTotals[registerTime]) {
        entradaSalidaTotals[registerTime] = {};
      }
  
      if (!entradaSalidaTotals[registerTime][emotionType]) {
        entradaSalidaTotals[registerTime][emotionType] = 1;
      } else {
        entradaSalidaTotals[registerTime][emotionType]++;
      }
  
      if (!totalTotals[emotionType]) {
        totalTotals[emotionType] = 1;
      } else {
        totalTotals[emotionType]++;
      }
    });
    return { entradaSalidaTotals, totalTotals };
  };
  
  
  
    export default { getDayEmotions, getallEmotions  };