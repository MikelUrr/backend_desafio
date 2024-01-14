import emotionModel from "../../models/emotionModel.js";
/// get day -1 entrada, salida y total



  

  const getallEmotions = async () => {
    try {
      const emotions = await emotionModel.find().exec();
  
      return emotions;
    } catch (e) {
      console.error(e);
      return false;
    }
  };


///sacar diferencia entre emociones entrada salida.

//sacar la emocion mas frecuente por dia y semana


//happy index , agregado por mes


//register emotion  
const registerEmotion = async (userId, emotionType, registerTime) => {
  try {
    const emotion = new emotionModel({ userId, emotionType, registerTime });
    const emotionSaved = await emotion.save();
    return emotionSaved;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default { getallEmotions};